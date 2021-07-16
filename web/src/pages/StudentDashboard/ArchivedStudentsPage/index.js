import React, { Component } from "react";
import StudentsTable from "../../../components/Student/StudentsTable";

export default class ArchivedStudentsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      archivedStudents: []
    };

    this.getArchivedStudents = this.getArchivedStudents.bind(this);
  }

  async getArchivedStudents() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/students/archived`
    );
    const data = await response.json();

    this.setState({
      archivedStudents: data
    });
  }

  async componentDidMount() {
    await this.getArchivedStudents();
  }

  render() {
    return (
      <div className="archived-students-page">
        <h1>Estudiantes Archivados</h1>

        <StudentsTable students={this.state.archivedStudents} />
      </div>
    );
  }
}
