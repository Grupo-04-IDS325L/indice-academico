using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace asp_api.Models
{
  public class Subject
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string Code { get; set; }

    [BsonElement("Name")]
    public string Name { get; set; }

    public int Credit { get; set; }

    public bool isArchived { get; set; }

    public Teacher Teacher { get; set; }

    public Subject()
    {
      this.isArchived = false;
    }
  }
}
