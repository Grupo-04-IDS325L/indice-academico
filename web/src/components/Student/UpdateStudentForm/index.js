import React, { Component } from "react";

import removeEmptyFields from "../../../utils/removeEmptyFields";

import DegreeSelect from "../DegreeSelect";

export default class UpdateStudentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentId: "",
      name: "",
      degree: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSelectChange(e) {
    this.setState({
      degree: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/students/${this.state.studentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...removeEmptyFields(this.state) })
      }
    );
    const data = await response.json();

    console.log(data);
    if (data.success) {
      console.log("updated successfully");
      this.props.postSubmit();
    } else {
      console.error(data.error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.degree === prevState.degree) {
      this.setState({
        degree: this.props.studentCurrentDegree
      });
    }
    if (prevState.studentId === "") {
      this.setState({
        studentId: this.props.studentId
      });
    }
  }

  render() {
    return (
      <form className="update-entity-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Actualizar Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="degree">Actualizar Carrera</label>
          <DegreeSelect
            name="degree"
            value={this.state.degree}
            handleChange={this.handleSelectChange}
          />
        </div>
        <small>
          (Dejar cualquier campo en blanco para mantener la información actual)
        </small>
        <button type="submit" className="button primary">
          Actualizar
        </button>
      </form>
    );
  }
}
