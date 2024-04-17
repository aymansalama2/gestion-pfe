import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import Home from './components/Home';
import Login from "./authentification/Login"
import SignUp from './authentification/SignUp';
import Admin from './admin/admin';
import Profile from './Client/Profile';
import DemandeClient from './Client/DemandeClient';
import Gestion_des_taches from './admin/gestion_des_taches';
import About from './components/About';
import ATT from './components/AAT';
import GestionDesTaches from './admin/gestion_des_taches';
import Employee from './employee/employee';
import ChangePasswordForm from './authentification/ChangePasswordForm';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/DemandeClient" element={<DemandeClient />} />
        <Route path="/gestion_des_taches/:projectId" element={<Gestion_des_taches />} />
        <Route path="/about" element={<About />}  />
        <Route path="/employee" element={<Employee />}  />
        <Route path="/ChangePasswordForm" element={<ChangePasswordForm />}  />








      </Routes>
    </Router>
  </React.StrictMode>,
);
