using NUnit.Framework;
using asp_api.Models;

namespace api_tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
            Student student = new Student();
        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }
    }
}