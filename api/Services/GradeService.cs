using asp_api.Models;
using MongoDB.Driver;
using System.Collections.Generic;

namespace asp_api.Services
{
  public class GradeService
  {
    private IMongoCollection<Grade> _grades;

    public GradeService(IAcademicSystemDatabaseSettings settings)
    {
      var client = new MongoClient(settings.ConnectionString);
      var database = client.GetDatabase(settings.DatabaseName);

      _grades = database.GetCollection<Grade>(settings.GradesCollectionName);
    }

    public List<Grade> Get() =>
      _grades.Find(grade => !grade.isArchived).ToList();

    public Grade Get(string id) =>
      _grades.Find<Grade>(grade => grade.Id == id).FirstOrDefault();

    public Grade Create(Grade grade)
    {
      _grades.InsertOne(grade);
      return grade;
    }

    public void Update(string id, Grade gradeIn) =>
      _grades.ReplaceOne(grade => grade.Id == id, gradeIn);

    public void Remove(Grade gradeIn) =>
      _grades.DeleteOne(grade => grade.Id == gradeIn.Id);

    public void Remove(string id) =>
      _grades.DeleteOne(grade => grade.Id == id);
    public void DeletePermanently(IEnumerable<string> gradesIdToDelete) {
      var filter = Builders<Grade>.Filter.In(grade => grade.Id, gradesIdToDelete);
      _grades.DeleteMany(filter);
    }
  }
}