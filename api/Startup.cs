using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CoreJsNoise.Domain;
using CoreJsNoise.Dto;
using CoreJsNoise.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Npgsql;

namespace CoreJsNoise
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var conStr = Configuration.GetConnectionString("DefaultConnection");
            var pgConn = Environment.GetEnvironmentVariable("DATABASE_URL");

            if (!string.IsNullOrWhiteSpace(pgConn))
                conStr = HerokuPGParser.ConnectionHelper.BuildExpectedConnectionString(pgConn);

            //  services.AddEntityFrameworkNpgsql().AddDbContext<PodcastsCtx>(options =>options.UseNpgsql(conStr));

            services.AddDbContext<PodcastsCtx>(options => options.UseNpgsql(conStr));

            services.AddScoped<PodcastsCtx>();
            services.AddScoped<FeedUpdaterService>();
            services.AddScoped<RssReader>();

            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseStatusCodePagesWithRedirects("/");
            app.UseMiddleware<AutoMapperMiddleware>();

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();

            app.UseCors(cfg => cfg.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                if (serviceScope.ServiceProvider.GetService<PodcastsCtx>() != null)
                {
                    var ctx = serviceScope.ServiceProvider.GetService<PodcastsCtx>();
                    new DatabaseFacade(ctx).Migrate();
                }
            }
        }
    }

    public class AutoMapperMiddleware
    {
        private readonly RequestDelegate next;

        public AutoMapperMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context /* other dependencies */)
        {
            try
            {
                AutoMapper.Mapper.Configuration.AssertConfigurationIsValid();
            
                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<Show, ShowParsedDto>();
                    cfg.CreateMap<ShowParsedDto, Show>();
                    cfg.CreateMap<Producer, ProducersController.ProducerDto>();
                    cfg.CreateMap<Show, ShowDto>();
                });


            }
            catch (InvalidOperationException ex)
            {
                //DoNothing since is initialized already
            }

           
            await next(context);
        }
    }
}