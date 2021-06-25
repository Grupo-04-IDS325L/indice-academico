import React from "react";
import { navigate } from "@reach/router";

const handleClick = e => {
  const teacherId = e.currentTarget.dataset.teacherId;
  navigate(`/teachers/${teacherId}`);
};

const TeachersTable = ({ teachers }) => {
  const renderTeachers = () =>
    teachers.map(teacher => (
      <tr key={teacher.id} onClick={handleClick} data-teacher-id={teacher.id}>
        <td>{teacher.name}</td>
      </tr>
    ));

  return (
    <table className="teachers-table">
      <thead>
        <tr>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {teachers.length > 0 ? (
          renderTeachers()
        ) : (
          <tr>
            <td colSpan="4">
              <em>No hay Profesores disponibles</em>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TeachersTable;
