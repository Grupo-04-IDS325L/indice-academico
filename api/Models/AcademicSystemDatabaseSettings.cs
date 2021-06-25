namespace asp_api.Models
{
  public class AcademicSystemDatabaseSettings : IAcademicSystemDatabaseSettings
  {
    public string StudentsCollectionName { get; set; }
    public string TeachersCollectionName { get; set; }
    public string SubjectsCollectionName { get; set; }
    public string GradesCollectionName { get; set; }
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
  }

  public interface IAcademicSystemDatabaseSettings
  {
    string StudentsCollectionName { get; set; }
    string TeachersCollectionName { get; set; }
    string SubjectsCollectionName { get; set; }
    string GradesCollectionName { get; set; }
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
  }
}