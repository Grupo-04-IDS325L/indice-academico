import React from "react";
import { navigate } from "@reach/router";

const handleClick = e => {
  const subjectCode = e.currentTarget.dataset.code;
  navigate(`/subjects/${subjectCode}`);
};

const SubjectsTable = ({ subjects }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Materia</th>
          <th>Créditos</th>
          <th>Profesor</th>
        </tr>
      </thead>
      <tbody>
        {subjects.length > 0 ? (
          subjects.map(subject => (
            <tr key={subject.id} onClick={handleClick} data-code={subject.code}>
              <td>{subject.code}</td>
              <td>{subject.name}</td>
              <td>{subject.credit}</td>
              <td>{subject.teacher && subject.teacher.name}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">
              <em>No hay materias disponibles</em>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SubjectsTable;
