using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
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
using ZNetCS.AspNetCore.Authentication.Basic;
using ZNetCS.AspNetCore.Authentication.Basic.Events;

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
            
           
               services .AddAuthentication(BasicAuthenticationDefaults.AuthenticationScheme)
                .AddBasicAuthentication(
                    options =>
                    {
                        var userName  =Environment.GetEnvironmentVariable("USER_NAME");
                        if (string.IsNullOrWhiteSpace(userName)) userName = "user";
                        var pass  =Environment.GetEnvironmentVariable("PASSWORD");
                        if (string.IsNullOrWhiteSpace(pass)) pass = "pass";
                        
                        options.Realm = "My Application";
                        options.Events = new BasicAuthenticationEvents
                        {
                            OnValidatePrincipal = context =>
                            {
                                if ((context.UserName == userName) && (context.Password == pass))
                                {
                                    var claims = new List<Claim>
                                    {
                                        new Claim(ClaimTypes.Name, context.UserName, context.Options.ClaimsIssuer)
                                    };

                                    var principal = new ClaimsPrincipal(new ClaimsIdentity(claims, BasicAuthenticationDefaults.AuthenticationScheme));
                                    context.Principal = principal;
                                }
                                else 
                                {
                                    // optional with following default.
                                    // context.AuthenticationFailMessage = "Authentication failed."; 
                                }

                                return Task.CompletedTask;
                            }
                        };
                    });
            
            
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

          //  app.UseStatusCodePagesWithRedirects("/");
            app.UseStatusCodePages( async context =>
            {
                if (context.HttpContext.Response.StatusCode == 404)
                {
                     context.HttpContext.Response.Redirect("/");
//                        `.WriteAsync(
//                        "Status code page, status code: " + 
//                        context.HttpContext.Response.StatusCode);
                }
                

            });
            app.UseMiddleware<AutoMapperMiddleware>();

            
        
            //basic auth
            app.UseAuthentication();

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
    
    public static class RequestAutoMapperMiddleware
    {
        public static IApplicationBuilder UseRequestCulture(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AutoMapperMiddleware>();
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
              
                Mapper.Initialize(cfg =>
                {
                    cfg.CreateMap<Show, ShowParsedDto>();
                    cfg.CreateMap<ShowParsedDto, Show>();
                    cfg.CreateMap<List<ShowParsedDto>, List<Show>>();
                    cfg.CreateMap<Producer, ProducersController.ProducerDto>();
                    cfg.CreateMap<Show, ShowDto>();
                    
                    
                });
              //  AutoMapper.Mapper.Configuration.AssertConfigurationIsValid();


            }
            catch (InvalidOperationException ex)
            {
                //DoNothing since is initialized already
                Console.WriteLine("Automapper error: "+ ex.Message);
            }

           
            await next(context);
        }
    }
}