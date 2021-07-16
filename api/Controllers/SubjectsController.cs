using System.Linq;
using asp_api.Models;
using asp_api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace asp_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SubjectsController : ControllerBase
  {
    private readonly SubjectService _subjectService;
    public SubjectsController(SubjectService subjectService)
    {
      _subjectService = subjectService;
    }

    [HttpGet]
    public ActionResult<List<Subject>> Get() =>
      _subjectService.Get();

    [HttpGet("{subjectCode}", Name = "GetSubject")]
    public ActionResult<Subject> Get(string subjectCode)
    {
      var subject = _subjectService.Get(subjectCode);

      if (subject == null)
      {
        return NotFound();
      }
      return Ok(new
      {
        success = true,
        subject = subject
      });
    }

    [HttpPost]
    public ActionResult<Subject> Create(Subject subject)
    {
      if (subject.Code == "")
      {
        return BadRequest(new
        {
          success = false,
          error = "El Código de la Materia no puede estar vacío"
        });
      }
      if (subject.Name == "")
      {
        return BadRequest(new
        {
          success = false,
          error = "El nombre de la Materia no puede estar vacío"
        });
      }
      if (subject.Credit < 1)
      {
        return BadRequest(new
        {
          success = false,
          error = "Valor de Créditos inválido"
        });
      }
      if (subject.Teacher == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "La Materia debe tener un Profesor asignado"
        });
      }

      var matchedSubject = _subjectService.Get(subject.Code);
      if (matchedSubject == null)
      {
        _subjectService.Create(subject);
        return Ok(new
        {
          success = true,
          subject = subject
        });
      }
      else
      {
        return BadRequest(new
        {
          success = false,
          error = "La materia ya existe"
        });
      }
    }

    [HttpPut("{subjectCode}")]
    public ActionResult<Subject> Update(string subjectCode, Subject subjectIn)
    {
      var subject = _subjectService.Get(subjectCode);

      if (subject == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "La materia no existe"
        });
      }

      subjectIn.Id = subject.Id;
      if (subjectIn.Code == null)
      {
        subjectIn.Code = subject.Code;
      }
      if (subjectIn.Name == null)
      {
        subjectIn.Name = subject.Name;
      }
      if (subjectIn.Credit == 0)
      {
        subjectIn.Credit = subject.Credit;
      }

      _subjectService.Update(subject.Code, subjectIn);
      return Ok(new
      {
        success = true,
        subject = subjectIn
      }); ;
    }

    [HttpDelete("{subjectCode}")]
    public IActionResult Delete(string subjectCode)
    {
      var subject = _subjectService.Get(subjectCode);

      if (subject == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "La Materia no existe"
        });
      }

      _subjectService.Archive(subject.Code);
      return Ok(new
      {
        success = true
      });
    }

    [HttpDelete("{subjectCode}/delete")]
    public IActionResult DeletePermanently(string subjectCode, [FromServices]GradeService _gradeService, [FromServices]StudentService _studentService) {
      var subject = _subjectService.Get(subjectCode);

      if (subject == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "La Materia no existe"
        });
      }

      // find all grades with the subjectCode or subject
      // find all grades inside students with the subjectCode or subject
      // delete all grades

      // delete subject
      // _subjectService.Remove(subjectCode);
      return Ok(new
      {
        success = true
      });
    }

    [HttpPost("{subjectCode}/add-teacher/{teacherId:length(24)}")]
    public IActionResult AddTeacher(string subjectCode, string teacherId, [FromServices]TeacherService _teacherService)
    {
      Subject subject = _subjectService.Get(subjectCode);
      Teacher teacher = _teacherService.Get(teacherId);

      if (subject == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "La Materia no existe"
        });
      }
      if (teacher == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "El Profesor no existe"
        });
      }

      subject.Teacher = teacher;
      _subjectService.Update(subjectCode, subject);
      return Ok(new
      {
        subject,
        teacher
      });
    }
  }

  public class AddTeacherRequestModel
  {
    public string name;
  }
}