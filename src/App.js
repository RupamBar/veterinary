import React, {useState, useEffect} from 'react';
import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import ManageCustomers from "./pages/AdminPages/ManageCustomers/ManageCustomers";
import ManageDoctors from "./pages/AdminPages/ManageDoctors/ManageDoctors";
import ManageEmployees from "./pages/AdminPages/ManageEmployees/ManageEmployees";
import ManageAnimals from "./pages/AdminPages/ManageAnimals/ManageAnimals";
import ManageFoods from "./pages/AdminPages/ManageFoods/ManageFoods";
import ManageAssets from "./pages/AdminPages/ManageAssets/ManageAssets";
import ManageMedicines from "./pages/AdminPages/ManageMedicines/ManageMedicines";

import SignUpAsDoctor from "./pages/SignUpAsDoctor/SignUpAsDoctor";
import LoginAsDoctor from "./pages/LoginAsDoctor/LoginAsDoctor";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";

import ManagePrescriptions from "./pages/AdminPages/ManagePrescriptions/ManagePrescriptions";

import EmployeeService from './pages/EmployeeService/EmployeeService';

import { ToastContainer, toast } from 'react-toastify';
import "../node_modules/react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom';

function App() {
  // const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');
  const getLoggedInUserData = async() => {
    try
    {
      // const resp = await axios.get(`${config.backend_URL}/getLoggedInUser`);
      const tokenData = JSON.parse(localStorage.getItem('token'));
      console.log(JSON.parse(localStorage.getItem('token')), "user");
      setLoggedInUser(tokenData || '');
    }
    catch(err)
    {
      console.log("Error==", err);
    }
  };

  useEffect(() => {
    getLoggedInUserData()
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="manage-customers" element={<ManageCustomers />} />
          <Route path="manage-doctors" element={<ManageDoctors />} />
          <Route path="manage-employees" element={<ManageEmployees />} />
          <Route path="manage-animals" element={< ManageAnimals />} />
          <Route path="manage-foods" element={< ManageFoods />} />
          <Route path="manage-assets" element={< ManageAssets />} />
          <Route path="manage-medicines" element={< ManageMedicines />} />
          <Route path="manage-prescriptions" element={< ManagePrescriptions />} />

          <Route path="sign-up-as-doctor" element={<SignUpAsDoctor  />} />
          <Route path="login-as-doctor" element={<LoginAsDoctor  />} />
          <Route path="doctorProfile" element={<DoctorProfile  />} />

          <Route path="employee-service" element={<EmployeeService  />} />
          
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
