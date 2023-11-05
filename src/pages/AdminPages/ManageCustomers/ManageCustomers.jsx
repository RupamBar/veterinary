import React from 'react';
import AuthorizedHeader from '../../../components/Header/AuthorizedHeader';
import { useLocation } from 'react-router-dom';
import { account, ID, databases } from "../../../appwrite/appwrite";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ManageCustomers() {
    const location = useLocation();
    const navigate = useNavigate();
    const stateData = JSON.parse(location.state);

    const handleLogout = async() => {
        try
        {
          const res = await account.deleteSession("current");
          toast.success("Logged out successfully", {
            theme: "colored",
          })
          navigate("/");
        }
        catch(err)
        {
          console.log("Err", err);
        }
    };
    // console.log(JSON.parse(location.state), "location.state.user");
  return (
    <div>
        <AuthorizedHeader user={stateData.user} handleLogout={handleLogout}/>
        <div className="adminDashboard">
            <h2>Manage Users</h2>
        </div>
    </div>
  )
}

export default ManageCustomers