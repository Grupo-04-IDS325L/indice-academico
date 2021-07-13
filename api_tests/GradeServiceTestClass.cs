using NUnit.Framework;
using asp_api.Models;
using asp_api.Services;
using System.Collections.Generic;

namespace api_tests
{
    
    public class GradeServiceTestClass
    {
        [Test]
        public void Test_Removing_Student_Grade()
        {
            var config = new AcademicSystemDatabaseSettings{
                StudentsCollectionName = "Students",
                TeachersCollectionName = "Teachers",
                SubjectsCollectionName = "Subjects",
                GradesCollectionName = "Grades",
                ConnectionString = "mongodb+srv://storedb-admin:mcPj8KHTKm2xW8cP@cluster0.hccog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
                DatabaseName = "AcademicSystemDb"
            };
            IAcademicSystemDatabaseSettings IConfig = config;
            var studentService = new StudentService(IConfig);
            var student = studentService.GetByStudentId("1080024");
            var gradeService = new GradeService(IConfig);
            var subject = new Subject{Name = "Matematicas", Credit = 5};
            var grade = new Grade{NumericGrade = 91, Subject = subject};
            student.Grades.Add(grade);
            student.Grades.Remove(grade);
            Assert.IsTrue(student.Grades.Count == 0);
        }
    }
}