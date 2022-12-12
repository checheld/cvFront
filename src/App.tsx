import React, { useEffect } from 'react';
import PermanentDrawerLeft from "./components/AppBar/AppBar";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CVsPage from './components/Pages/CVs/CVsPage';
import Users from './components/Pages/Users/UsersPage';
import Projects from './components/Pages/Projects/ProjectsPage';
import Education from './components/Pages/Educations/EducationPage';
import Technologies from './components/Pages/Technologies/TechnologiesPage';
import WorkExperience from './components/Pages/WorkExperience/WorkExperiencePage';
import ProjectIdPage from "./components/Pages/ProjectId/ProjectIdPage";
import UserIdPage from "./components/Pages/UserId/UserIdPage";
import ProjectTypesPage from "./components/Pages/ProjectTypes/ProjectTypesPage";
import TopAppBar from "./components/AppBar/TopAppBar";
import HomePage from "./components/Pages/Login/HomePage";
import Callback from "./components/Pages/Login/CallbackAuth";
import './App.css';
import LogoutPage from './components/Pages/Login/LogoutPage';
import SilentRenewComponent from './components/Pages/Login/SilentRenewComponnent';


const App: React.FC = () => {

  const screenWidth = window.screen.width;
  let token = sessionStorage.getItem('oidc.user:https://identity-server-1.herokuapp.com:leviossacv');
  //let token = sessionStorage.getItem('oidc.user:https://localhost:5001:leviossacv');

  const tokenCleaner = () => {
    //window.sessionStorage.removeItem('oidc.user:https://localhost:5001:leviossacv');
    window.sessionStorage.removeItem('oidc.user:https://identity-server-1.herokuapp.com:leviossacv');
  }

  useEffect(() => {
    setInterval(() => tokenCleaner(), 1999000);
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {(screenWidth > 769) ? (
          <PermanentDrawerLeft />
        ) : (
          <TopAppBar />
        )}
        <Routes>
          <Route path="/CVs" element={token ? <CVsPage /> : <HomePage />} />
          <Route path="/Users" element={token ? <Users /> : <HomePage />} />
          <Route path="/Projects" element={token ? <Projects /> : <HomePage />} />
          <Route path="/Education" element={token ? <Education /> : <HomePage />} />
          <Route path="/Technologies" element={token ? <Technologies /> : <HomePage />} />
          <Route path="/WorkExperience" element={token ? <WorkExperience /> : <HomePage />} />
          <Route path="/ProjectType" element={token ? <ProjectTypesPage /> : <HomePage />} />
          <Route path="/projects/:id" element={token ? <ProjectIdPage /> : <HomePage />} />
          <Route path="/users/:id" element={token ? <UserIdPage /> : <HomePage />} />
          <Route path="/login" element={<HomePage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/signin-oidc" element={<Callback />} />
          <Route path="/" element={token ? <CVsPage /> : <HomePage />} />
          <Route path="/silent_renew" element={<SilentRenewComponent />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
export default App;

