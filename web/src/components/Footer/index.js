import React from "react";

const Footer = () => {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} &mdash; Emmanuel Cuevas, Fernando
        Gruning, Alam Sierra (Equipo SCRUM). Asistencia, comunicarse al{" "}
        <a href="tel:18293431073">(829) 343-1073</a>
      </p>
    </footer>
  );
};

export default Footer;
