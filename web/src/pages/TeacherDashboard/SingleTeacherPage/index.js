import React, { Component } from "react";

import UpdateTeacherForm from "../../../components/Teacher/UpdateTeacherForm";
import RemoveTeacherButton from "../../../components/Teacher/RemoveTeacherButton";

import SubjectsTable from "../../../components/Subject/SubjectsTable";

export default class SingleTeacherPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      subjects: []
    };

    this.getTeacher = this.getTeacher.bind(this);
  }

  async getTeacher() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/teachers/${this.props.teacherId}`
    );
    if (response.status === 404) {
      // redirect to 404
      return;
    }
    const data = await response.json();
    console.log(data);

    this.setState({
      id: data.teacher.id,
      name: data.teacher.name
    });
  }

  async getTeacherSubjects() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/teachers/${this.props.teacherId}/subjects`
    );
    const data = await response.json();

    this.setState({
      subjects: data
    });
  }

  componentDidMount() {
    this.getTeacher();
    this.getTeacherSubjects();
  }

  render() {
    return (
      <div className="single-entity-page">
        <h1 className="title">Perfil del Profesor</h1>
        <h2 className="subtitle">{this.state.name}</h2>

        <div className="level">
          <div className="left-side">
            <h2>Datos Generales</h2>
            <div className="entity-info">
              <div className="left-side">
                <h4>ID:</h4>
                <p>{this.props.teacherId}</p>

                <h4>Nombre Completo:</h4>
                <p>{this.state.name}</p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <h3>Actualizar Datos</h3>
            <UpdateTeacherForm
              teacherId={this.props.teacherId}
              postSubmit={this.getTeacher}
            />
          </div>
        </div>

        <h2>Materias impartidas</h2>
        <SubjectsTable subjects={this.state.subjects} />

        <h3>Eliminar Profesor</h3>
        <RemoveTeacherButton
          teacherName={this.state.name}
          teacherId={this.props.teacherId}
        />
      </div>
    );
  }
}
