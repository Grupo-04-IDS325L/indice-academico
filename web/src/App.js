import React from "react";
import { Router } from "@reach/router";

import { useToken } from "./hooks/use-token";

import Layout from "./components/Layout";

import HomePage from "./pages/Home";

import { LoginPage } from "./pages/Login";

import StudentDashboardPage from "./pages/StudentDashboard";
import SingleStudentPage from "./pages/StudentDashboard/SingleStudentPage";
import ArchivedStudentsPage from "./pages/StudentDashboard/ArchivedStudentsPage";

import TeacherDashboardPage from "./pages/TeacherDashboard";
import SingleTeacherPage from "./pages/TeacherDashboard/SingleTeacherPage";

import SubjectDashboardPage from "./pages/SubjectDashboard";
import SingleSubjectPage from "./pages/SubjectDashboard/SingleSubjectPage";

import "./scss/styles.css";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <Layout token={token} setToken={setToken}>
        <LoginPage setToken={setToken} />
      </Layout>
    );
  }

  return (
    <Layout token={token} setToken={setToken}>
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
}

export default App;
