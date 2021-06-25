using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

/* indice academico
Subject.Credit * Grade.NumericGrade

summa cum laude   = 3.8-4.0
magna cum laude   = 3.5-3.7
cum laude         = 3.2-3.4
no honors         = 0-3.1
 */

namespace asp_api.Models
{
  public class Student
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonRequired]
    public string studentId { get; set; }

    [BsonElement("Name")]
    public string Name { get; set; }

    public string Degree { get; set; }

    public bool isArchived { get; set; }

    public List<Grade> Grades { get; set; }

    public double? GradePointAverage
    {
      get
      {
        double? totalHonorPoints = 0.0;
        double totalApprovedCredits = 0.0;
        double? gradePointAverage = 0.0;

        foreach (var grade in this.Grades)
        {
          if (!grade.isWithdrawn) {
            totalHonorPoints += grade.HonorPoints;
            totalApprovedCredits += grade.Subject.Credit;
          }
        }

        if (totalHonorPoints == null) return null;

        if (totalApprovedCredits > 0)
        {
          gradePointAverage = totalHonorPoints / totalApprovedCredits;
        }

        return Math.Round(gradePointAverage.Value, 2);
      }
      set { }
    }

    public string HonorableMention
    {
      get
      {
        if (this.GradePointAverage > 3.7) // 3.8 - 4.0
        {
          return "Summa Cum Laude";
        }
        if (this.GradePointAverage > 3.4) // 3.5 - 3.7
        {
          return "Magna Cum Laude";
        }
        if (this.GradePointAverage > 3.1) // 3.2 - 3.4
        {
          return "Cum Laude";
        }
        return "Sin honor";
      }
      set { }
    }

    public Student()
    {
      this.Grades = new List<Grade>();
      this.isArchived = false;
    }
  }
}
