import React, { Component } from "react";

const initialState = {
  name: "",
  success: false,
  error: ""
};

export default class AddTeacherForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

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

    const { success, error, ...dataToPost } = this.state;

    let response = await fetch(`${process.env.REACT_APP_API_URL}/teachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToPost)
    });
    let data = await response.json();

    console.log(data);

    if (data.success) {
      this.setState({ ...initialState, success: true });
      this.props.postSubmit();
    } else {
      console.error(data.error);
      this.setState({ error: data.error });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-teacher-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        </div>

        <button type="submit" className="button primary">
          Crear
        </button>

        {this.state.success && (
          <p className="state-message success-message">Profesor creado</p>
        )}
        {this.state.error && (
          <p className="state-message error-message">{this.state.error}</p>
        )}
      </form>
    );
  }
}
