import React, { Component } from "react";
import { Link } from "@reach/router";

import UpdateSubjectForm from "../../../components/Subject/UpdateSubjectForm";
import RemoveSubjectButton from "../../../components/Subject/RemoveSubjectButton";

export default class SingleSubjectPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      code: "",
      name: "",
      credit: 0,
      teacher: {},
      isArchived: false
    };

    this.getSubject = this.getSubject.bind(this);
  }

  async getSubject() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/subjects/${this.props.subjectCode}`
    );
    if (response.status === 404) {
      // redirect to 404
      return;
    }
    const data = await response.json();

    this.setState({
      id: data.subject.id,
      code: data.subject.code,
      name: data.subject.name,
      credit: data.subject.credit,
      teacher: data.subject.teacher,
      isArchived: data.subject.isArchived
    });
  }

  componentDidMount() {
    this.getSubject();
  }

  render() {
    return (
      <div className="single-entity-page">
        <h1 className="title">Información de la materia</h1>
        <h2 className="subtitle">{this.props.subjectCode}</h2>

        <div className="level">
          <div className="left-side">
            <h2>Datos Generales</h2>

            <div className="entity-info">
              <div className="left-side">
                <h4>Código:</h4>
                <p>{this.props.subjectCode}</p>

                <h4>Nombre de la Materia:</h4>
                <p>{this.state.name}</p>
              </div>
              <div className="right-side">
                <h4>Crédito{this.state.credit > 1 ? "s" : ""}</h4>
                <p>{this.state.credit}</p>

                <h4>Profesor</h4>
                <p>
                  <Link
                    to={`/teachers/${this.state.teacher &&
                      this.state.teacher.id}`}
                  >
                    {this.state.teacher && this.state.teacher.name}
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <h3>Actualizar Datos</h3>
            <UpdateSubjectForm
              teacherId={(this.state.teacher && this.state.teacher.id) || ""}
              code={this.state.code}
              postSubmit={this.getSubject}
            />
          </div>
        </div>

        <h3>Eliminar Materia</h3>
        <RemoveSubjectButton
          subjectCode={this.props.subjectCode}
          subjectName={this.state.name}
          delete={this.state.isArchived}
        />
      </div>
    );
  }
}
