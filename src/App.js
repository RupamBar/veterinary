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
import ManageGrooming from './pages/AdminPages/ManageGrooming/ManageGrooming';
import ManageReceipts from './pages/AdminPages/ManageReceipts/ManageReceipts';
import CheckupSlots from './pages/AdminPages/CheckupSlots/CheckupSlots';
import ManagePets from './pages/AdminPages/ManagePets/ManagePets';
import ManageSoldAssets from './pages/AdminPages/ManageSoldAssets/ManageSoldAssets';
import ManageSoldMedicines from './pages/AdminPages/ManageSoldMedicines/ManageSoldMedicines';

import EmployeeService from './pages/EmployeeService/EmployeeService';

import AnimalFoods from './pages/AnimalFoods/AnimalFoods';
import Dogs from './pages/Dogs/Dogs';
import Cats from './pages/Cats/Cats';
import Birds from './pages/Birds/Birds';
import Medicines from './pages/Medicines/Medicines';
import Assets from './pages/Assets/Assets';

import AddToCart from './pages/AddToCart/AddToCart';
import BookSlots from './pages/BookSlots/BookSlots';
import BookGroomSlot from './pages/BookGroomSlot/BookGroomSlot';

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
          <Route path="manage-grooming" element={< ManageGrooming />} />
          <Route path="food-receipts" element={< ManageReceipts />} />
          <Route path="checkup-slots" element={< CheckupSlots />} />
          <Route path="view-pets" element={< ManagePets />} />
          <Route path="view-sold-assets" element={< ManageSoldAssets />} />
          <Route path="view-sold-medicines" element={< ManageSoldMedicines />} />

          <Route path="sign-up-as-doctor" element={<SignUpAsDoctor  />} />
          <Route path="login-as-doctor" element={<LoginAsDoctor  />} />
          <Route path="doctorProfile" element={<DoctorProfile  />} />

          <Route path="employee-service" element={<EmployeeService  />} />

          <Route path="animal-foods" element={<AnimalFoods  />} />
          <Route path="dogs" element={<Dogs  />} />
          <Route path="cats" element={<Cats  />} /> 
          <Route path="birds" element={<Birds  />} />
          <Route path="medicines" element={<Medicines  />} />
          <Route path="assets" element={<Assets  />} />

          <Route path="add-to-cart" element={<AddToCart  />} />
          <Route path="appointment-booking" element={<BookSlots  />} />
          <Route path="groom-slot-booking" element={<BookGroomSlot  />} />
          
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
