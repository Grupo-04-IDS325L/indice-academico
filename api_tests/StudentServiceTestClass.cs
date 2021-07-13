using NUnit.Framework;
using asp_api.Models;
using asp_api.Services;
using System.Collections.Generic;


namespace api_tests
{
    public class StudentServiceTestClass
    {
        [Test]
        public void Test_Returned_Student_Has_testNoBorrar_By_Name_When_Getted_By_Id()
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
            Assert.IsTrue(student.Name == "testNoBorrar");
        }

        [Test]
        public void Test_Update_Student_Name_From_Juan_To_John()
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
            var student = new Student();
            student.Name = "Juan";
            student = studentService.Create(student);
            student.Name = "John";
            studentService.Update(student.Id, student);
            var updStudent = studentService.Get(student.Id);
            studentService.Remove(updStudent);
            Assert.IsTrue(updStudent.Name == "John");
        }
    }
}