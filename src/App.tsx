import React from "react";
import PermanentDrawerLeft from "./components/AppBar/AppBar";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { FC } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import CVsPage from './components/Pages/CVs/CVsPage';
import Users from './components/Pages/Users/UsersPage';
import Projects from './components/Pages/Projects/ProjectsPage';
import Education from './components/Pages/Educations/EducationPage';
import Technologies from './components/Pages/Technologies/TechnologiesPage';
import WorkExperience from './components/Pages/WorkExperience/WorkExperiencePage';
import ProjectIdPage from "./components/Pages/ProjectId/ProjectIdPage";
import UserIdPage from "./components/Pages/UserId/UserIdPage";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <PermanentDrawerLeft />
        <Routes>
          <Route path="/CVs" element={<CVsPage />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Education" element={<Education />} />
          <Route path="/Technologies" element={<Technologies />} />
          <Route path="/WorkExperience" element={<WorkExperience />} />
          <Route path="/projects/:id" element={<ProjectIdPage />} />
          <Route path="/users/:id" element={<UserIdPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
export default App;

