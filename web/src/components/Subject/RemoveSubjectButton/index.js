import React, { Component } from "react";
import { navigate } from "@reach/router";

export default class RemoveSubjectButton extends Component {
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
    let apiUrl = `${process.env.REACT_APP_API_URL}/subjects/${this.props.subjectCode}`;
    if (this.props.delete) {
      apiUrl += "/delete";
    }

    const response = await fetch(apiUrl, {
      method: "DELETE"
    });
    const data = await response.json();

    if (data.success) {
      console.log(data);
      // alert("Materia eliminada.");
      // navigate("/subjects");
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
            : `Desea eliminar la materia "${this.props.subjectCode} - ${this.props.subjectName}"?`}
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
            Eliminar{this.props.delete && " permanentemente"}
          </button>
        )}
      </React.Fragment>
    );
  }
}
