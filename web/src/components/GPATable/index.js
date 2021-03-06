import React from "react";
import { navigate } from "@reach/router";

const handleClick = e => {
  const studentId = e.currentTarget.dataset.studentId;
  navigate(`/students/${studentId}`);
};

const GPATable = ({ students }) => {
  return (
    <table className="academic-index-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Índice Académico</th>
          <th>Mención de Honores</th>
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
          students.map(student => (
            <tr
              key={student.id}
              onClick={handleClick}
              data-student-id={student.studentId}
            >
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>
                <strong>{student.gradePointAverage}</strong>
              </td>
              <td>{student.honorableMention}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">
              <em>No hay Estudiantes creados</em>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default GPATable;
