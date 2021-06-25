import React from "react";
import { Link } from "@reach/router";

import { ReactComponent as Logo } from "./academic-system-logo.svg";

const Header = () => {
  return (
    <header>
      <Link className="header-logo" to="/">
        <Logo />
      </Link>
      <nav>
        <Link className="nav-link" to="/students">
          Estudiantes
        </Link>
        <Link className="nav-link" to="/teachers">
          Profesores
        </Link>
        <Link className="nav-link" to="/subjects">
          Materias
        </Link>
      </nav>
    </header>
  );
};

export default Header;
