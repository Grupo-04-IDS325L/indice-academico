import React, { Component } from "react";
import { Link } from "@reach/router";

import GPATable from "../../components/GPATable";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: []
    };

    this.getStudents = this.getStudents.bind(this);
  }

  async getStudents() {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/students/by-academic-index`
    );
    const data = await response.json();

    this.setState({
      students: data
    });
  }

  componentDidMount() {
    this.getStudents();
  }

  render() {
    return (
      <div className="home-page">
        <h1>Sistema Académico INTEC</h1>

        <h2>Tabla de Índice Académico</h2>
        <GPATable students={this.state.students} />

        <nav className="blocks-nav">
          <div className="block">
            <Link to="/students" className="nav-link">
              Ver Estudiantes
            </Link>
          </div>
          <div className="block">
            <Link to="/teachers" className="nav-link">
              Ver Profesores
            </Link>
          </div>
          <div className="block">
            <Link to="/subjects" className="nav-link">
              Ver Materias
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default HomePage;
