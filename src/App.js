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

import ManagePrescriptions from "./pages/AdminPages/ManagePrescriptions/ManagePrescriptions";
import { ToastContainer, toast } from 'react-toastify';
import "../node_modules/react-toastify/dist/ReactToastify.css"

function App() {
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
          <Route path="manage-animals" element={< ManageAnimals/>} />
          <Route path="manage-foods" element={< ManageFoods/>} />
          <Route path="manage-assets" element={< ManageAssets/>} />
          <Route path="manage-medicines" element={< ManageMedicines/>} />
          <Route path="manage-prescriptions" element={< ManagePrescriptions/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
