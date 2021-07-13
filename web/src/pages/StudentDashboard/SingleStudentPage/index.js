import React, { Component } from "react";

import UpdateStudentForm from "../../../components/Student/UpdateStudentForm";
import RemoveStudentButton from "../../../components/Student/RemoveStudentButton";
import GradesTable from "../../../components/Student/GradesTable";
import AddGradeForm from "../../../components/Student/AddGradeForm";

class SingleStudentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      studentId: "",
      name: "",
      degree: "",
      grades: [],
      gradePointAverage: 0,
      honorableMention: "",
      isArchived: false
    };

    this.getStudent = this.getStudent.bind(this);
  }

  async getStudent() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/students/${this.props.studentId}`
    );
    if (response.status === 404) {
      window.location.href = "http://localhost:3000";
      return;
    }
    const data = await response.json();

    this.setState({
      ...data.student
    });
  }

  componentDidMount() {
    this.getStudent();
  }

  render() {
    return (
      <div className="single-entity-page">
        <h1 className="title">Perfil del Estudiante</h1>
        <h2 className="subtitle">{this.props.studentId}</h2>

        <div className="level">
          <div className="left-side">
            <h2>Datos Generales</h2>
            <div className="entity-info">
              <div className="left-side">
                <h4>ID:</h4>
                <p>{this.props.studentId}</p>

                <h4>Nombre Completo:</h4>
                <p>{this.state.name}</p>

                <h4>Carrera:</h4>
                <p>{this.state.degree}</p>
              </div>
              <div className="right-side">
                <h4>Créditos Aprobados:</h4>
                <p>
                  {this.state.grades.reduce(function(
                    totalApprovedCredits,
                    currentGrade
                  ) {
                    if (!currentGrade.isWithdrawn) {
                      if (currentGrade.numericGrade > 69) {
                        return (
                          totalApprovedCredits + currentGrade.subject.credit
                        );
                      }
                    }
                    return totalApprovedCredits + 0;
                  },
                  0)}
                </p>

                <h4>Índice Académico:</h4>
                <p>{this.state.gradePointAverage}</p>

                <h4>Mención de Honor:</h4>
                <p>{this.state.honorableMention}</p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <h3>Actualizar Datos</h3>
            <UpdateStudentForm
              studentCurrentDegree={this.state.degree}
              studentId={this.state.studentId}
              postSubmit={this.getStudent}
            />
          </div>
        </div>

        <h2>Calificaciones</h2>
        <div className="level">
          <div className="left-side">
            <GradesTable grades={this.state.grades} />
          </div>
          <div className="right-side">
            <h4>Agregar Calificación</h4>
            <AddGradeForm
              studentId={this.props.studentId}
              postSubmit={this.getStudent}
            />
          </div>
        </div>

        <h3>Eliminar Estudiante</h3>
        <RemoveStudentButton
          studentId={this.props.studentId}
          delete={this.state.isArchived}
        />
      </div>
    );
  }
}

export default SingleStudentPage;
