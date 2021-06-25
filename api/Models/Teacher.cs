using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace asp_api.Models
{
  public class Teacher
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("Name")]
    public string Name { get; set; }
    public bool isArchived { get; set; }

    public Teacher()
    {
      this.isArchived = false;
    }
  }
}
