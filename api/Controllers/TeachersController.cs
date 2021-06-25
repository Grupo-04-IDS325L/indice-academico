using asp_api.Models;
using asp_api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace asp_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TeachersController : ControllerBase
  {
    private readonly TeacherService _teacherService;
    public TeachersController(TeacherService teacherService)
    {
      _teacherService = teacherService;
    }

    [HttpGet]
    public ActionResult<List<Teacher>> Get() =>
      _teacherService.Get();

    [HttpGet("{teacherId}", Name = "GetTeacher")]
    public ActionResult<Teacher> Get(string teacherId)
    {
      var teacher = _teacherService.Get(teacherId);

      if (teacher == null)
      {
        return NotFound();
      }
      return Ok(new
      {
        success = true,
        teacher = teacher
      });
    }

    [HttpPost]
    public ActionResult<Teacher> Create(Teacher teacher)
    {
      if (teacher.Name == "")
      {
        return BadRequest(new
        {
          success = false,
          error = "El nombre del Profesor no puede estar vacío"
        });
      }

      var matchedTeacher = _teacherService.Get(teacher.Id);
      if (matchedTeacher == null)
      {
        _teacherService.Create(teacher);
        return Ok(new
        {
          success = true,
          teacher = teacher
        });
      }
      else
      {
        return BadRequest(new
        {
          success = false,
          error = "El profesor ya existe"
        });
      }
    }

    [HttpPut("{teacherId}")]
    public IActionResult Update(string teacherId, Teacher teacherIn)
    {
      var teacher = _teacherService.Get(teacherId);

      if (teacher == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "El Profesor no existe"
        });
      }

      teacherIn.Id = teacher.Id;
      if (teacherIn.Id == null)
      {
        teacherIn.Id = teacher.Id;
      }
      if (teacherIn.Name == null)
      {
        teacherIn.Name = teacher.Name;
      }

      _teacherService.Update(teacher.Id, teacherIn);
      return Ok(new
      {
        success = true
      });
    }

    [HttpDelete("{teacherId}")]
    public IActionResult Delete(string teacherId)
    {
      var teacher = _teacherService.Get(teacherId);

      if (teacher == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "El Estudiante no existe"
        });
      }

      _teacherService.Archive(teacher.Id);
      return Ok(new
      {
        success = true
      });
    }

    [HttpGet("{teacherId}/subjects")]
    public ActionResult<List<Subject>> GetTeacherSubjects(string teacherId, [FromServices]SubjectService _subjectService)
    {
      List<Subject> matchingSubjects = _subjectService.GetByTeacher(teacherId);
      return matchingSubjects;
    }
  }
}