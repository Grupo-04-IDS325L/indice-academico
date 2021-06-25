import React, { Component } from "react";
import { Link } from "@reach/router";

import TeachersTable from "../../components/Teacher/TeachersTable/";
import AddTeacherForm from "../../components/Teacher/AddTeacherForm";

export default class TeacherDashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teachers: []
    };

    this.getTeachers = this.getTeachers.bind(this);
  }

  async getTeachers() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/Teachers`);
    const data = await response.json();

    this.setState({
      teachers: data
    });
  }

  async componentDidMount() {
    await this.getTeachers();
  }

  render() {
    return (
      <div className="entity-dashboard-page">
        <h1>Administración de Profesores</h1>

        <div className="flex-wrapper">
          <div className="entity-table-item">
            <h2>Profesores registrados:</h2>
            <TeachersTable teachers={this.state.teachers} />
            <Link to="archived">Ver Profesores eliminados</Link>
          </div>
          <div className="add-entity-item">
            <h2>Nuevo Profesor:</h2>
            <AddTeacherForm postSubmit={this.getTeachers} />
          </div>
        </div>
      </div>
    );
  }
}
