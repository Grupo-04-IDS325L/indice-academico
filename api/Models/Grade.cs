using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace asp_api.Models
{
  public class Grade
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public float NumericGrade { get; set; }

    public bool isWithdrawn { get; set; }

    public string LiteralGrade
    {
      get
      {
        string _literalGrade = "F";

        if (this.isWithdrawn) return "R";

        if (this.NumericGrade > 59)
        {
          _literalGrade = "D";
        }
        if (this.NumericGrade > 69)
        {
          _literalGrade = "C";
        }
        if (this.NumericGrade > 79)
        {
          _literalGrade = "B";
        }
        if (this.NumericGrade > 89)
        {
          _literalGrade = "A";
        }

        return _literalGrade;
      }
      set { }
    }
    public int? GradeValue
    {
      get
      {
        if (this.LiteralGrade == "A") return 4;
        if (this.LiteralGrade == "B") return 3;
        if (this.LiteralGrade == "C") return 2;
        if (this.LiteralGrade == "D") return 1;
        if (this.LiteralGrade == "R") return null;
        return 0; // this.LiteralGrade == "F"
      }
      set { }
    }
    public int? HonorPoints
    {
      get
      {
        if (this.isWithdrawn) return null;
        return this.Subject.Credit * this.GradeValue;
      }
      set { }
    }

    public bool isArchived { get; set; }
    public Subject Subject { get; set; }

    public Grade()
    {
      this.isArchived = false;
      this.isWithdrawn = false;
    }
  }
}
