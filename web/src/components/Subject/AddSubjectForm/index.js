import React, { Component } from "react";

const initialState = {
  code: "",
  name: "",
  credit: 0,
  teachers: [],
  selectedTeacherId: "",
  success: false,
  error: ""
};

export default class AddSubjectForm extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

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
      teachers: data
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSelectChange(e) {
    this.setState({
      selectedTeacherId: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const selectedTeacher = (await this.getTeacher()).teacher;
    const { teachers, teacher, success, error, ...subjectObj } = this.state;
    if (subjectObj.credit === "") {
      subjectObj.credit = 0;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...subjectObj, teacher: selectedTeacher })
    });
    const data = await response.json();

    console.log(data);

    if (data.success) {
      this.setState({ ...initialState, success: true });
      this.props.postSubmit();
    } else {
      console.error(data.error);
      this.setState({ error: data.error });
    }
  }

  componentDidMount() {
    this.getTeachers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.teachers !== prevState.teachers) {
      this.getTeachers();
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="code">Código</label>
          <input
            type="text"
            name="code"
            id="code"
            value={this.state.code}
            className="form-control"
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre de la Materia</label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            className="form-control"
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="credit">Créditos</label>
          <input
            type="number"
            name="credit"
            id="credit"
            value={this.state.credit}
            className="form-control"
            onChange={this.handleChange}
            required
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
            {this.state.teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="button primary">
          Crear
        </button>

        {this.state.success && (
          <p className="state-message success-message">Estudiante creado</p>
        )}
        {this.state.error && (
          <p className="state-message error-message">{this.state.error}</p>
        )}
      </form>
    );
  }
}
