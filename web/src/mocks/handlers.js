import { rest } from "msw";

export const handlers = [
  rest.get(
    `${process.env.REACT_APP_API_URL}/students/by-academic-index`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: "001",
            studentId: "1089290",
            name: "Alam Sierra",
            gradePointAverage: 4,
            honorableMention: "Summa Cum Laude",
          },
        ])
      );
    }
  ),

  rest.get(`${process.env.REACT_APP_API_URL}/students/`, (_req, res, ctx) => {
    return res.once(
      ctx.status(200),
      ctx.json([
        {
          id: "001",
          studentId: "1089290",
          name: "Alam Sierra",
          gradePointAverage: 4,
        },
      ])
    );
  }),

  rest.get(`${process.env.REACT_APP_API_URL}/students/`, (_req, res, ctx) => {
    return res.once(
      ctx.status(200),
      ctx.json([
        {
          id: "001",
          studentId: "1089290",
          name: "Alam Sierra",
          gradePointAverage: 4,
          degree: "IDS",
        },
        {
          id: "002",
          studentId: "1089090",
          name: "John Rodriguez",
          gradePointAverage: 0,
          degree: "LIF",
        },
      ])
    );
  }),

  rest.post(`${process.env.REACT_APP_API_URL}/students/`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: "002",
        studentId: "1089090",
        name: "John Rodriguez",
        gradePointAverage: 0,
        degree: "LIF",
      })
    );
  }),

  rest.get(`${process.env.REACT_APP_API_URL}/teachers`, (_req, res, ctx) => {
    return res.once(
      ctx.status(200),
      ctx.json([{ id: "0001", name: "Francia Mejia" }])
    );
  }),

  rest.get(`${process.env.REACT_APP_API_URL}/teachers`, (_req, res, ctx) => {
    return res.once(
      ctx.status(200),
      ctx.json([
        { id: "0001", name: "Francia Mejia" },
        { id: "0002", name: "Renato Gonzalez" },
      ])
    );
  }),

  rest.get(
    `${process.env.REACT_APP_API_URL}/teachers/0001`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ teacher: { id: "0001", name: "Francia Mejia" } })
      );
    }
  ),

  rest.post(
    `${process.env.REACT_APP_API_URL}/teachers/0002`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ teacher: { id: "0002", name: "Renato Gonzalez" } })
      );
    }
  ),

  rest.get(`${process.env.REACT_APP_API_URL}/subjects`, (_req, res, ctx) => {
    return res.once(
      ctx.status(200),
      ctx.json([
        {
          id: "1234",
          code: "IDS-340",
          name: "Proceso de Software",
          credit: 4,
          teacher: {
            name: "Francia Mejia",
          },
        },
      ])
    );
  }),

  rest.get(`${process.env.REACT_APP_API_URL}/subjects`, (_req, res, ctx) => {
    return res.once(
      ctx.status(200),
      ctx.json([
        {
          id: "1234",
          code: "IDS-340",
          name: "Proceso de Software",
          credit: 4,
          teacher: {
            name: "Francia Mejia",
          },
        },
        {
          id: "4321",
          code: "IDS-350",
          name: "Aseguramiento de Calidad",
          credit: 5,
          teacher: {
            name: "Renato Gonzalez",
          },
        },
      ])
    );
  }),
  rest.post(`${process.env.REACT_APP_API_URL}/subjects`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: "4321",
        code: "IDS-350",
        name: "Aseguramiento de Calidad",
        teacher: {
          name: "Renato Gonzalez",
        },
      })
    );
  }),
];
