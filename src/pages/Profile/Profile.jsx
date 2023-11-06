import React, {useState, useEffect} from 'react';
import "./Profile.css";
import Button from '@mui/material/Button';
// import { account, ID, databases } from "../../appwrite/appwrite";
import { makeStyles } from 'tss-react/mui';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthorizedHeader from '../../components/Header/AuthorizedHeader';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';
import CustomerProfile from '../../components/CustomerProfile/CustomerProfile';
// import supabase from "../../supabase/supabaseConfig";
import axios from "axios";
import config from "../../config.json";

const useStyles = makeStyles()({
  logoutBtn : {
    backgroundColor : 'red',
    color : 'white'
  },
  formBtn : {
    marginTop : "60px",
    backgroundColor: "DodgerBlue",
    color: "white",
    padding: "5px 20px",
  },
});

function Profile() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const getUserData = async() => {
    try
    {
      const resp = await axios.get(`${config.backend_URL}/getLoggedInUser`);
      setUser(resp?.data?.data);
    }
    catch(err)
    {
      console.log("Error==", err);
    }
  };



  useEffect(() => {
    getUserData()
  }, []);

  return (
        user ? 
        <>
          {/* create a separate component for admin and user profile */}
          <AuthorizedHeader user={user}/>
          {user?.email === "admin@gmail.com" ? <AdminDashboard user={user}/> : <CustomerProfile user={user}/>}
        </>
        :
        <>
          <div>401 : You are not authorized to view this page</div>
          <div>
            <Button onClick={(e) => {navigate("/login")}} className={classes.formBtn}>
              Login
            </Button>
          </div>
        </>
  )
}

export default Profile