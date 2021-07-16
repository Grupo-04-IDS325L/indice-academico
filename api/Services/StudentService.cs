using asp_api.Models;
using MongoDB.Driver;
using System.Collections.Generic;

namespace asp_api.Services
{
  public class StudentService
  {
    private IMongoCollection<Student> _students;

    public StudentService(IAcademicSystemDatabaseSettings settings)
    {
      var client = new MongoClient(settings.ConnectionString);
      var database = client.GetDatabase(settings.DatabaseName);

      _students = database.GetCollection<Student>(settings.StudentsCollectionName);
    }

    public List<Student> Get() =>
      _students.Find(student => !student.isArchived).SortBy(x => x.studentId).ToList();

    public Student Get(string mongoId) =>
      _students.Find<Student>(student => student.Id == mongoId).FirstOrDefault();

    public Student GetByStudentId(string studentId) =>
     _students.Find<Student>(student => student.studentId == studentId).FirstOrDefault();

    public List<Student> GetArchived() =>
      _students.Find(student => student.isArchived).ToList();

    public List<Student> GetByGPA()
    {
      var sorter = Builders<Student>.Sort.Descending("GradePointAverage");
      return _students.Find(student => !student.isArchived).Sort(sorter).ToList();
    }

    public Student Create(Student student)
    {
      long studentCount = _students.CountDocuments(st => true);
      int baseId = 1080000;

      student.studentId = (baseId + (studentCount + 1)).ToString();
      _students.InsertOne(student);
      return student;
    }

    public void Update(string id, Student studentIn) =>
      _students.ReplaceOne(student => student.Id == id, studentIn);

    public void Remove(Student studentIn) =>
      _students.DeleteOne(student => student.Id == studentIn.Id);

    public void DeletePermanently(string id) =>
      _students.DeleteOne(student => student.Id == id);

    public void Archive(string id)
    {
      var studentToArchive = Get(id);
      studentToArchive.isArchived = true;
      _students.ReplaceOne(student => student.Id == studentToArchive.Id, studentToArchive);
    }

    public void AddGrade(string id, Grade grade)
    {
      Student studentToAddGrade = Get(id);
      studentToAddGrade.Grades.Add(grade);
      _students.ReplaceOne(student => student.Id == studentToAddGrade.Id, studentToAddGrade);
    }
  }
}