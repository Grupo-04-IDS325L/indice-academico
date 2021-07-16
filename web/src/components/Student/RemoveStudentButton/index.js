import React, { Component } from "react";
import { navigate } from "@reach/router";

export default class RemoveStudentButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showConfirm: false
    };

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
  }

  handleRemoveClick() {
    this.setState(prevState => ({
      showConfirm: !prevState.showConfirm
    }));
  }

  async handleConfirmClick() {
    let apiUrl = `${process.env.REACT_APP_API_URL}/students/${this.props.studentId}`;
    if (this.props.delete) {
      apiUrl += "/delete";
    }

    const response = await fetch(apiUrl, {
      method: "DELETE"
    });
    const data = await response.json();

    if (data.success) {
      alert("Estudiante eliminado.");
      navigate("/students");
    } else {
      console.error(data.error);
    }
  }

  render() {
    return (
      <React.Fragment>
        <p>
          {this.state.showConfirm
            ? "Confirmar la eliminación:"
            : `Desea eliminar al estudiante ${this.props.studentId}?`}
        </p>
        {this.state.showConfirm ? (
          <button onClick={this.handleConfirmClick} className="button primary">
            Confirmar
          </button>
        ) : (
          <button
            onClick={this.handleRemoveClick}
            className="button outline-primary"
          >
            Eliminar {this.props.delete && " permanentemente"}
          </button>
        )}
      </React.Fragment>
    );
  }
}
