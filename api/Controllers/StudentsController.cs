using System.Linq;
using asp_api.Models;
using asp_api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace asp_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class StudentsController : ControllerBase
  {
    private readonly StudentService _studentService;
    public StudentsController(StudentService studentService)
    {
      _studentService = studentService;
    }

    [HttpGet]
    public ActionResult<List<Student>> Get() =>
      _studentService.Get();

    [HttpGet("{studentId:length(7)}", Name = "GetStudent")]
    public ActionResult<Student> Get(string studentId)
    {
      var student = _studentService.GetByStudentId(studentId);

      if (student == null)
      {
        return NotFound();
      }
      return Ok(new
      {
        success = true,
        student = student
      });
    }

    [HttpGet("archived")]
    public ActionResult<List<Student>> GetArchived() =>
      _studentService.GetArchived();

    [HttpGet("by-academic-index")]
    public ActionResult<List<Student>> GetStudentsByGPA() =>
      _studentService.GetByGPA();

    [HttpPost]
    public ActionResult<Student> Create(Student student)
    {
      if (student.studentId == "")
      {
        return BadRequest(new
        {
          success = false,
          error = "El ID del Estudiante no puede estar vacío"
        });
      }
      if (student.Name == "")
      {
        return BadRequest(new
        {
          success = false,
          error = "El nombre del Estudiante no puede estar vacío"
        });
      }
      if (student.Degree == "")
      {
        return BadRequest(new
        {
          success = false,
          error = "La carrera del Estudiante no puede estar vacía"
        });
      }

      var matchedStudent = _studentService.GetByStudentId(student.studentId);
      if (matchedStudent == null)
      {
        _studentService.Create(student);
        return Ok(new
        {
          success = true,
          student = student
        });
      }
      else
      {
        return BadRequest(new
        {
          success = false,
          error = "El estudiante ya existe"
        });
      }
    }

    [HttpPut("{studentId:length(7)}")]
    public IActionResult Update(string studentId, Student studentIn)
    {
      var student = _studentService.GetByStudentId(studentId);

      if (student == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "El Estudiante no existe"
        });
      }

      studentIn.Id = student.Id;
      if (studentIn.studentId == null)
      {
        studentIn.studentId = student.studentId;
      }
      if (studentIn.Name == null)
      {
        studentIn.Name = student.Name;
      }
      if (studentIn.Degree == null)
      {
        studentIn.Degree = student.Degree;
      }


      _studentService.Update(student.Id, studentIn);
      return Ok(new
      {
        success = true
      });
    }

    [HttpDelete("{studentId:length(7)}")]
    public IActionResult Delete(string studentId)
    {
      var student = _studentService.GetByStudentId(studentId);

      if (student == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "El Estudiante no existe"
        });
      }

      _studentService.Archive(student.Id);
      return Ok(new
      {
        success = true
      });
    }

    [HttpDelete("{studentId:length(7)}/delete")]
    public IActionResult DeletePermanently(string studentId, [FromServices]GradeService _gradeService) {
      // find student
      var student = _studentService.GetByStudentId(studentId);

      if (student == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "El Estudiante no existe"
        });
      }

      // get all grades inside student & select their IDs
      IEnumerable<string> gradesId = student.Grades.Select(g => g.Id);

      // delete all matching grades
      _gradeService.DeletePermanently(gradesId);
      // delete student
      _studentService.DeletePermanently(student.Id);
      return Ok(new { success = true });
    }

    [HttpPost("add-grade")]
    public ActionResult<Grade> AddGrade(AddGradeRequestModel request, [FromServices]SubjectService _subjectService, [FromServices]GradeService _gradeService)
    {
      if (request.subjectCode == "") return BadRequest(new
      {
        success = false,
        error = "La Calificación debe tener una Materia asignada"
      });

      if (!request.isWithdrawn)
      {
        if (float.IsNaN(request.numericGrade))
        {
          return BadRequest(new
          {
            success = false,
            error = "Valor de la Calificación inválido"
          });
        }
        if (request.numericGrade < 0)
        {
          return BadRequest(new
          {
            success = false,
            error = "El valor de la Calificación no debe ser menor que 0"
          });
        }
        if (request.numericGrade > 100)
        {
          return BadRequest(new
          {
            success = false,
            error = "El valor de la Calificación no debe ser mayor que 100"
          });
        }
      }

      Student student = _studentService.GetByStudentId(request.studentId);
      if (student == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "El Estudiante no existe"
        });
      }
      if (student.Grades.Find(gradeInList => gradeInList.Subject.Code == request.subjectCode) != null)
      {
        return BadRequest(new
        {
          success = false,
          error = "El Estudiante ya tiene una Calificación en esta Materia"
        });
      }

      Subject subject = _subjectService.Get(request.subjectCode);
      if (subject == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "La Materia no existe"
        });
      }

      Grade grade = new Grade()
      {
        NumericGrade = request.numericGrade,
        Subject = subject,
        isWithdrawn = request.isWithdrawn
      };

      _gradeService.Create(grade);
      _studentService.AddGrade(student.Id, grade);

      return Ok(new
      {
        success = true,
        grade
      });
    }
  }

  public class AddGradeRequestModel
  {
    public string studentId;
    public string subjectCode;

    public bool isWithdrawn;
    public float numericGrade;
  }
}