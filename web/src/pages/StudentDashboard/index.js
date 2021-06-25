import React, { Component } from "react";
import { Link } from "@reach/router";

import StudentsTable from "../../components/Student/StudentsTable/";
import AddStudentForm from "../../components/Student/AddStudentForm";

class StudentDashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: []
    };

    this.getStudents = this.getStudents.bind(this);
  }

  async getStudents() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/students`);
    const data = await response.json();

    this.setState({
      students: data
    });
  }

  async componentDidMount() {
    await this.getStudents();
  }

  render() {
    return (
      <div className="entity-dashboard-page">
        <h1>Administración de Estudiantes</h1>

        <div className="flex-wrapper">
          <div className="entity-table-item">
            <h2>Estudiantes registrados:</h2>
            <StudentsTable students={this.state.students} />
            <Link to="archived">Ver Estudiantes eliminados</Link>
          </div>
          <div className="add-entity-item">
            <h2>Nuevo Estudiante:</h2>
            <AddStudentForm postSubmit={this.getStudents} />
          </div>
        </div>
      </div>
    );
  }
}

export default StudentDashboardPage;
