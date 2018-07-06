using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using WebApplication1.Domain;
using Npgsql;
using WebApplication1.Dto;
using WebApplication1.Services;

namespace WebApplication1
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
            
            if (!string.IsNullOrWhiteSpace(pgConn)) conStr = HerokuPGParser.ConnectionHelper.BuildExpectedConnectionString(pgConn);

          //  services.AddEntityFrameworkNpgsql().AddDbContext<PodcastsCtx>(options =>options.UseNpgsql(conStr));
            
            services.AddDbContext<PodcastsCtx>(options =>options.UseNpgsql(conStr));

           services.AddScoped<PodcastsCtx>();
            services.AddScoped<FeedUpdaterService>();
            services.AddScoped<RssReader>();
           
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

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();
            
          
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                if (serviceScope.ServiceProvider.GetService<PodcastsCtx>() != null)
                {
                    var ctx = serviceScope.ServiceProvider.GetService<PodcastsCtx>();
                    new DatabaseFacade(ctx).Migrate();  
                }
            }
            
            
            
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Show, ShowParsedDto>();
                cfg.CreateMap<ShowParsedDto, Show>();
                cfg.CreateMap<Producer, ProducersController.ProducerDto>();
                cfg.CreateMap<Show, ShowDto>();
            });


        }
    }
}