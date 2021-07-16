using asp_api.Models;
using MongoDB.Driver;
using System.Collections.Generic;

namespace asp_api.Services
{
  public class TeacherService
  {
    private IMongoCollection<Teacher> _teachers;

    public TeacherService(IAcademicSystemDatabaseSettings settings)
    {
      var client = new MongoClient(settings.ConnectionString);
      var database = client.GetDatabase(settings.DatabaseName);

      _teachers = database.GetCollection<Teacher>(settings.TeachersCollectionName);
    }

    public List<Teacher> Get() =>
      _teachers.Find(teacher => !teacher.isArchived).ToList();

    public Teacher Get(string id) =>
      _teachers.Find<Teacher>(teacher => teacher.Id == id).FirstOrDefault();

    public Teacher Create(Teacher teacher)
    {
      _teachers.InsertOne(teacher);
      return teacher;
    }

    public void Update(string id, Teacher teacherIn) =>
      _teachers.ReplaceOne(teacher => teacher.Id == id, teacherIn);

    public void Remove(Teacher teacherIn) =>
      _teachers.DeleteOne(teacher => teacher.Id == teacherIn.Id);

    public void Remove(string id) =>
      _teachers.DeleteOne(teacher => teacher.Id == id);

    public void Archive(string id)
    {
      var teacherToArchive = Get(id);
      teacherToArchive.isArchived = true;
      _teachers.ReplaceOne(teacher => teacher.Id == id, teacherToArchive);
    }
  }
}