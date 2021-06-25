import React from "react";
import { Router } from "@reach/router";

import Layout from "./components/Layout";

import HomePage from "./pages/Home";

import StudentDashboardPage from "./pages/StudentDashboard";
import SingleStudentPage from "./pages/StudentDashboard/SingleStudentPage";
import ArchivedStudentsPage from "./pages/StudentDashboard/ArchivedStudentsPage";

import TeacherDashboardPage from "./pages/TeacherDashboard";
import SingleTeacherPage from "./pages/TeacherDashboard/SingleTeacherPage";

import SubjectDashboardPage from "./pages/SubjectDashboard";
import SingleSubjectPage from "./pages/SubjectDashboard/SingleSubjectPage";

import "./scss/styles.scss";

const App = () => (
  <Layout>
    <Router>
      <HomePage path="/" />

      <StudentDashboardPage path="/students" />
      <SingleStudentPage path="/students/:studentId" />
      <ArchivedStudentsPage path="/students/archived" />

      <TeacherDashboardPage path="/teachers" />
      <SingleTeacherPage path="/teachers/:teacherId" />

      <SubjectDashboardPage path="/subjects" />
      <SingleSubjectPage path="/subjects/:subjectCode" />
    </Router>
  </Layout>
);

export default App;
