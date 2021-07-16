import React, { Component } from "react";

const initialState = {
  studentId: "",
  numericGrade: 0,
  subjectCode: "",
  isWithdrawn: false,
  subjects: [],
  success: false,
  error: ""
};

export default class AddGradeForm extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.getSubjects = this.getSubjects.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getSubjects() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/subjects`);
    const data = await response.json();

    this.setState({
      subjects: data
    });
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { subjects, success, error, ...newGradeObj } = this.state;
    newGradeObj.numericGrade = parseFloat(newGradeObj.numericGrade);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/students/add-grade`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newGradeObj)
      }
    );
    const data = await response.json();
    if (data.success) {
      console.log(data);
      this.setState({
        ...initialState,
        subjects: this.state.subjects,
        success: true
      });
      this.props.postSubmit();
    } else {
      console.error(data.error);
      this.setState({ error: data.error });
    }
  }

  async componentDidMount() {
    await this.getSubjects();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.studentId !== prevState.studentId) {
      this.setState({
        studentId: this.props.studentId
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-entity-form">
        <div className="form-group">
          <label htmlFor="subjectCode">Materia</label>
          <select
            name="subjectCode"
            id="subjectCode"
            className="form-control"
            value={this.state.subjectCode}
            onChange={this.handleChange}
          >
            <option value="">Seleccionar Materia...</option>
            {this.state.subjects.map(subject => (
              <option key={subject.id} value={subject.code}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group with-checkbox">
          <input
            type="checkbox"
            name="isWithdrawn"
            id="isWithdrawn"
            value={this.state.isWithdrawn}
            onChange={this.handleChange}
          />
          <label htmlFor="isWithdrawn">Materia Retirada</label>
        </div>

        <div className="form-group">
          <label htmlFor="numericGrade">Calificación</label>
          <input
            type="number"
            name="numericGrade"
            id="numericGrade"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.numericGrade}
            disabled={this.state.isWithdrawn}
          />
        </div>

        <button type="submit" className="button primary">
          Agregar
        </button>

        {this.state.success && (
          <p className="state-message success-message">Calificación agregada</p>
        )}
        {this.state.error && (
          <p className="state-message error-message">{this.state.error}</p>
        )}
      </form>
    );
  }
}
