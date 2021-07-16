using asp_api.Models;
using asp_api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Cors;

namespace asp_api
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
      // services.AddCors(c =>
      // {
      //   c.AddPolicy("Allow-Origin", options => options.AllowAnyOrigin());
      // });

      services.AddCors(options => {
        options.AddPolicy("AllowAll",
          builder => {
            builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials().Build();
          }
        );
      });

      services.Configure<AcademicSystemDatabaseSettings>(
          Configuration.GetSection(nameof(AcademicSystemDatabaseSettings))
      );

      services.AddSingleton<IAcademicSystemDatabaseSettings>(sp =>
          sp.GetRequiredService<IOptions<AcademicSystemDatabaseSettings>>().Value
      );

      services.AddSingleton<StudentService>();
      services.AddSingleton<GradeService>();
      services.AddSingleton<TeacherService>();
      services.AddSingleton<SubjectService>();

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

      // app.UseCors(options => options
      //   .AllowAnyOrigin()
      //   .AllowAnyMethod()
      //   .AllowAnyHeader()
      //   .AllowCredentials()
      // );
      app.UseCors("AllowAll");

      //   app.UseHttpsRedirection();
      app.UseMvc();
    }
  }
}
