using asp_api.Models;
using MongoDB.Driver;
using System.Collections.Generic;

namespace asp_api.Services
{
  public class SubjectService
  {
    private IMongoCollection<Subject> _subjects;

    public SubjectService(IAcademicSystemDatabaseSettings settings)
    {
      var client = new MongoClient(settings.ConnectionString);
      var database = client.GetDatabase(settings.DatabaseName);

      _subjects = database.GetCollection<Subject>(settings.SubjectsCollectionName);
    }

    public List<Subject> Get() =>
      _subjects.Find(subject => !subject.isArchived).SortBy(x => x.Code).ToList();

    public Subject Get(string code) =>
      _subjects.Find<Subject>(subject => subject.Code == code).FirstOrDefault();

    public List<Subject> GetByTeacher(string teacherId) =>
      _subjects.Find(subject => !subject.isArchived && subject.Teacher.Id == teacherId).SortBy(x => x.Code).ToList();

    public Subject Create(Subject subject)
    {
      _subjects.InsertOne(subject);
      return subject;
    }

    public void Update(string code, Subject subjectIn) =>
      _subjects.ReplaceOne(subject => subject.Code == code, subjectIn);

    public void Remove(Subject subjectIn) =>
      _subjects.DeleteOne(subject => subject.Code == subjectIn.Code);

    public void Remove(string code) =>
      _subjects.DeleteOne(subject => subject.Code == code);

    public void Archive(string code)
    {
      var subjectToArchive = Get(code);
      subjectToArchive.isArchived = true;
      _subjects.ReplaceOne(subject => subject.Code == code, subjectToArchive);
    }

    public void AddTeacher(string code, Teacher teacher)
    {
      Subject subjectToAddStudent = Get(code);
      subjectToAddStudent.Teacher = teacher;
      _subjects.ReplaceOne(subject => subject.Code == code, subjectToAddStudent);
    }
  }
}