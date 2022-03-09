import React from "react";
import PermanentDrawerLeft from "./components/AppBar";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { FC } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';
import CVsPage from './pages/CVsPage';
import Users from './pages/UsersPage';
import Projects from './pages/ProjectsPage';
import Education from './pages/EducationPage';
import Technologies from './pages/TechnologiesPage';
import WorkExperience from './pages/WorkExperiencePage';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <PermanentDrawerLeft />
        <Routes>
          <Route path="/CVs" element={<CVsPage />}></Route>
          <Route path="/Users" element={<Users />}></Route>
          <Route path="/Projects" element={<Projects />}></Route>
          <Route path="/Education" element={<Education />}></Route>
          <Route path="/Technologies" element={<Technologies />}></Route>
          <Route path="/WorkExperience" element={<WorkExperience />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}
export default App;

