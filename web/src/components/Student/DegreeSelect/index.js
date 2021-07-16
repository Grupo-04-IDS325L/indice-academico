import React from "react";

const degrees = [
  {
    name: "Economía y Negocios",
    programs: [
      {
        code: "AGN",
        name: "Administración y Gestión de Negocios"
      },
      {
        code: "CCP",
        name: "Comunicación Comercial y Publicidad"
      },
      {
        code: "CAE",
        name: "Contabilidad y Auditoría Empresarial"
      },
      {
        code: "ECO",
        name: "Economía"
      },
      {
        code: "LIC",
        name: "Licenciatura en Ingeniería Comercial"
      },
      {
        code: "LIF",
        name: "Licenciatura en Ingeniería Financiera"
      },
      {
        code: "MNE",
        name: "Mercadeo y Negocios Electrónicos"
      },
      {
        code: "LNI",
        name: "Negocios Internacionales"
      }
    ]
  },
  {
    name: "Ciencias Sociales y Humanidades",
    programs: [
      {
        code: "LSE",
        name:
          "Licenciatura en Ciencias Sociales Orientada a la Educación Secundaria"
      },
      {
        code: "LCC",
        name: "Licenciatura en Cine y Comunicación Audiovisual"
      },
      {
        code: "LMD",
        name: "Licenciatura en Comunicación Social y Medios Digitales"
      },
      {
        code: "PSI",
        name: "Licenciatura en Psicología"
      }
    ]
  },
  {
    name: "Ciencias de la Salud",
    programs: [
      {
        code: "MED",
        name: "Doctor en Medicina"
      },
      {
        code: "ODO",
        name: "Doctor en Odontología"
      }
    ]
  },
  {
    name: "Ciencias Básicas y Ambientales",
    programs: [
      {
        code: "LBE",
        name: "Licenciatura en Biología Orientada a la Educación Secundaria"
      },
      {
        code: "LBT",
        name: "Licenciatura en Biotecnología"
      },
      {
        code: "LFE",
        name: "Licenciatura en Física Orientada a la Educación Secundaria"
      },
      {
        code: "LME",
        name: "Licenciatura en Matemática Orientada a la Educación Secundaria"
      },
      {
        code: "MAT",
        name:
          "Licenciatura en Matemáticas con concentración en Estadísticas y Ciencias Actuariales"
      },
      {
        code: "LQE",
        name: "Licenciatura en Química Orientada a la Educación Secundaria"
      }
    ]
  },
  {
    name: "Ingenierías",
    programs: [
      {
        code: "DIN",
        name: "Diseño Industrial"
      },
      {
        code: "IB",
        name: "Ingeniería Biomédica"
      },
      {
        code: "CIV",
        name: "Ingeniería Civil"
      },
      {
        code: "SIS",
        name: "Ingeniería de Sistemas"
      },
      {
        code: "IDS",
        name: "Ingeniería de Software"
      },
      {
        code: "ELE",
        name: "Ingeniería Eléctrica"
      },
      {
        code: "INL",
        name: "Ingeniería Electrónica y de Comunicaciones"
      },
      {
        code: "ICS",
        name: "Ingeniería en Ciberseguridad"
      },
      {
        code: "ILT",
        name: "Ingeniería en Logística y Transporte"
      },
      {
        code: "IND",
        name: "Ingeniería Industrial"
      },
      {
        code: "MEC",
        name: "Ingeniería Mecánica"
      },
      {
        code: "IMC",
        name: "Ingeniería Mecatrónica"
      }
    ]
  }
];

const DegreeSelect = ({ name, value, handleChange }) => {
  return (
    <select
      className="form-control"
      name={name || "degree-select"}
      id={name || "degree-select"}
      value={value}
      onChange={handleChange}
    >
      <option value="">Seleccionar Carrera</option>
      {degrees.map(academicArea => (
        <optgroup key={academicArea.name} label={academicArea.name}>
          {academicArea.programs.map(degree => (
            <option key={degree.code} value={degree.code}>
              {degree.code} - {degree.name}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export default DegreeSelect;
