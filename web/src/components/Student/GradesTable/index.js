import React from "react";
import { navigate } from "@reach/router";

const handleClick = e => {
  const gradeId = e.currentTarget.dataset.gradeId;
  navigate(`/grades/${gradeId}`);
};

const GradesTable = ({ grades }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Materia</th>
          <th>Créditos</th>
          <th>Calificación Numérica</th>
          <th>Calificación Literal</th>
        </tr>
      </thead>
      <tbody>
        {grades.length > 0 ? (
          grades.map(grade => (
            <tr key={grade.id} onClick={handleClick} data-grade-id={grade.id}>
              <td>{grade.subject.name}</td>
              <td>{grade.subject.credit}</td>
              <td>{grade.numericGrade}</td>
              <td>{grade.literalGrade}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">
              <em>No hay calificaciones disponibles</em>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default GradesTable;
