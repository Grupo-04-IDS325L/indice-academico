using NUnit.Framework;
using asp_api.Models;
using System.Collections.Generic;

namespace api_tests
{
    class StudentTestClass
    {
        [Test]
        public void Test_GPA_And_Honorable_Mention_When_Expected_Is_3_69_And_Magna()
        {
            var subject1 = new Subject{Name = "Matematicas", Credit = 5};
            var subject2 = new Subject{Name = "Programacion", Credit = 4};
            var subject3 = new Subject{Name = "BD", Credit = 4};
            var grade1 = new Grade{NumericGrade = 91, Subject = subject1};
            var grade2 = new Grade{NumericGrade = 97, Subject = subject2};
            var grade3 = new Grade{NumericGrade = 87, Subject = subject3};
            var grades = new List<Grade> {grade1, grade2, grade3};
            var student = new Student{Grades = grades};
            Assert.IsTrue(student.GradePointAverage == 3.69 && student.HonorableMention == "Magna Cum Laude");
        }
        [Test]
        public void Test_GPA_And_Honorable_Mention_When_Expected_Is_2_62_And_Sin_honor()
        {
            var subject1 = new Subject{Name = "Matematicas", Credit = 5};
            var subject2 = new Subject{Name = "Programacion", Credit = 4};
            var subject3 = new Subject{Name = "BD", Credit = 4};
            var grade1 = new Grade{NumericGrade = 79.5f, Subject = subject1};
            var grade2 = new Grade{NumericGrade = 89, Subject = subject2};
            var grade3 = new Grade{NumericGrade = 83, Subject = subject3};
            var grades = new List<Grade> {grade1, grade2, grade3};
            var student = new Student{Grades = grades};
            Assert.IsTrue(student.GradePointAverage == 2.62 && student.HonorableMention == "Sin honor");
        }
    }
}