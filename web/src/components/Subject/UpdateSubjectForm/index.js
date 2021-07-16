import React, { Component } from "react";

import removeEmptyFields from "../../../utils/removeEmptyFields";

export default class UpdateSubjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      name: "",
      credit: "",
      teacher: {},
      teachers: [],
      selectedTeacherId: "",
    };

    this.getTeacher = this.getTeacher.bind(this);
    this.getTeachers = this.getTeachers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getTeacher() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/teachers/${this.state.selectedTeacherId}`
    );
    const data = await response.json();

    return data;
  }

  async getTeachers() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/teachers`);
    const data = await response.json();

    this.setState({
      teachers: data,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSelectChange(e) {
    this.setState({
      selectedTeacherId: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const selectedTeacher = (await this.getTeacher()).teacher;

    const { teachers, teacher, selectedTeacherId, ...subjectObj } = this.state;

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/subjects/${this.state.code}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          removeEmptyFields({ ...subjectObj, teacher: selectedTeacher })
        ),
      }
    );
    const data = await response.json();

    if (data.success && this.state.credit > 0) {
      // console.log("updated successfully");
      const stateMessage = document.getElementById("state-message");
      stateMessage.classList.add("state-message");
      const message = document.createTextNode(
        "Materia actualizado exitosamente"
      );
      stateMessage.appendChild(message);
      this.props.postSubmit();
    } else {
      alert("La cantidad de créditos no puede ser un número negativo");
      console.error(data.error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.code !== prevProps.code) {
      this.setState({
        code: this.props.code,
      });
    }
    if (this.props.teacherId !== prevProps.teacherId) {
      this.setState({
        selectedTeacherId: this.props.teacherId,
      });
    }
  }

  componentDidMount() {
    this.getTeachers();
  }

  render() {
    return (
      <form className="update-entity-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre de la Materia</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="credit">Créditos</label>
          <input
            type="number"
            name="credit"
            id="credit"
            className="form-control"
            value={this.state.credit}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="teacher">Profesor</label>
          <select
            name="teacher"
            id="teacher"
            className="form-control"
            value={this.state.selectedTeacherId}
            onChange={this.handleSelectChange}
          >
            <option value="">Seleccionar Profesor...</option>
            {this.state.teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <small>
          (Dejar cualquier campo en blanco para mantener la información actual)
        </small>
        <button type="submit" className="button primary">
          Actualizar
        </button>
        <p id="state-message" class="success-message"></p>
      </form>
    );
  }
}
