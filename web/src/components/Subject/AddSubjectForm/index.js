import React, { useState, useEffect } from "react";

export default function AddSubjectForm() {
  const [code, setCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [credit, setCredit] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const selectedTeacher = teachers.find(
      (teacher) => teacher.id === selectedTeacherId
    );

    const response = await fetch(`${process.env.REACT_APP_API_URL}/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credit: credit === "" ? 0 : credit,
        code,
        name: subjectName,
        teacher: selectedTeacher,
      }),
    });
    const data = await response.json();

    setSuccess(data.success);
    setErrors(data.error || null);
  }

  useEffect(() => {
    async function getTeachers() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/teachers`);
      const data = await response.json();

      setTeachers(data);
    }
    getTeachers();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="code">Código</label>
        <input
          type="text"
          name="code"
          id="code"
          value={code}
          className="form-control"
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Nombre de la Materia</label>
        <input
          type="text"
          name="name"
          id="name"
          value={subjectName}
          className="form-control"
          onChange={(e) => setSubjectName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="credit">Créditos</label>
        <input
          type="text"
          name="credit"
          id="credit"
          value={credit}
          className="form-control"
          onChange={(e) => setCredit(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="teacher">Profesor</label>
        <select
          name="teacher"
          id="teacher"
          className="form-control"
          value={selectedTeacherId}
          onChange={(e) => setSelectedTeacherId(e.target.value)}
        >
          <option value="">Seleccionar Profesor...</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="button primary">
        Crear
      </button>

      {success && (
        <p className="state-message success-message">Estudiante creado</p>
      )}
      {errors && <p className="state-message error-message">{errors}</p>}
    </form>
  );
}
