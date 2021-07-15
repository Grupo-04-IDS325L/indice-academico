import React, { Component } from "react";

import SubjectsTable from "../../components/Subject/SubjectsTable";
import AddSubjectForm from "../../components/Subject/AddSubjectForm";

export default class SubjectDashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
    };

    this.getSubjects = this.getSubjects.bind(this);
  }

  async getSubjects() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/subjects`);
    const data = await response.json();

    this.setState({
      subjects: data,
    });
  }

  async componentDidMount() {
    await this.getSubjects();
  }

  render() {
    return (
      <div className="entity-dashboard-page">
        <h1>Administración de Materias</h1>

        <div className="flex-wrapper">
          <div className="entity-table-item">
            <SubjectsTable subjects={this.state.subjects} />
          </div>
          <div className="add-entity-item">
            <h2>Nueva Materia:</h2>
            <AddSubjectForm postSubmit={this.getSubjects} />
          </div>
        </div>
      </div>
    );
  }
}
