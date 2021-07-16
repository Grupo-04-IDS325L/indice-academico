using System;
using asp_api.Models;
using asp_api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace asp_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class GradesController : ControllerBase
  {
    private readonly GradeService _gradeService;
    public GradesController(GradeService gradeService)
    {
      _gradeService = gradeService;
    }

    [HttpGet]
    public ActionResult<List<Grade>> Get() =>
      _gradeService.Get();

    [HttpGet("{gradeId}", Name = "GetGrade")]
    public ActionResult<Grade> Get(string gradeId)
    {
      var grade = _gradeService.Get(gradeId);

      if (grade == null)
      {
        return NotFound();
      }
      return grade;
    }

    [HttpPost]
    public ActionResult<Grade> Create(Grade grade)
    {
      if (grade.Subject == null)
      {
        return BadRequest(new
        {
          success = false,
          error = "La Calificación debe tener una Materia asignada"
        });
      }
      if (float.IsNaN(grade.NumericGrade))
      {
        return BadRequest(new
        {
          success = false,
          error = "Valor de la Calificación inválido"
        });
      }
      if (grade.NumericGrade < 0)
      {
        return BadRequest(new
        {
          success = false,
          error = "El valor de la Calificación no debe ser menor que 0"
        });
      }
      if (grade.NumericGrade > 100)
      {
        return BadRequest(new
        {
          success = false,
          error = "El valor de la Calificación no debe ser mayor que 1000"
        });
      }

      var matchedGrade = _gradeService.Get(grade.Id);
      if (matchedGrade == null)
      {
        _gradeService.Create(grade);
        return grade;
      }
      else
      {
        return NotFound();
      }
    }

    [HttpPut("{gradeId}")]
    public ActionResult<Grade> Update(string gradeId, Grade gradeIn)
    {
      var grade = _gradeService.Get(gradeId);

      if (grade == null)
      {
        return NotFound();
      }

      gradeIn.Id = grade.Id;
      if (gradeIn.Id == null)
      {
        gradeIn.Id = grade.Id;
      }

      // TO-DO: do a check if gradeIn has a NumericGrade
      // if (gradeIn.NumericGrade == 0)
      // {
      //   gradeIn.NumericGrade = grade.NumericGrade;
      // }

      // if (gradeIn.Subject == null)
      // {
      //   gradeIn.Subject = grade.Subject;
      // }


      _gradeService.Update(grade.Id, gradeIn);
      return Get(grade.Id);
    }

    [HttpDelete("{gradeId}")]
    public IActionResult Delete(string gradeId)
    {
      var grade = _gradeService.Get(gradeId);

      if (grade == null)
      {
        return NotFound();
      }

      _gradeService.Remove(grade.Id);
      return NoContent();
    }
  }
}