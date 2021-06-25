import React, { Component } from "react";
import { navigate } from "@reach/router";

export default class RemoveTeacherButton extends Component {
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
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/teachers/${this.props.teacherId}`,
      {
        method: "DELETE"
      }
    );
    const data = await response.json();

    if (data.success) {
      alert("Profesor eliminado.");
      navigate("/teachers");
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
            : `Desea eliminar al profesor ${this.props.teacherName}?`}
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
            Eliminar
          </button>
        )}
      </React.Fragment>
    );
  }
}
