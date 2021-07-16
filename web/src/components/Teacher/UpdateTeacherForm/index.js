import React, { Component } from "react";

import removeEmptyFields from "../../../utils/removeEmptyFields";

export default class UpdateTeacherForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherId: "",
      name: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/teachers/${this.state.teacherId}`,
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
    if (this.props.teacherId !== prevState.teacherId) {
      this.setState({
        teacherId: this.props.teacherId
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
