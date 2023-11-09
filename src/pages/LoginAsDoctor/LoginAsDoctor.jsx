import React, { useState, useEffect } from "react";
// import { account, ID } from "../../appwrite/appwrite";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "tss-react/mui";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4, validate } from "uuid";
import "./LoginAsDoctor.css";
import { ToastContainer, toast } from "react-toastify";
// import supabase from "../../supabase/supabaseConfig";
import axios from "axios";
import config from "../../config.json";

const useStyles = makeStyles()({
  formControlStyle: {
    width: "20vw",
  },
  textFieldStyle: {
    marginTop: "20px",
  },
  formBtn: {
    marginTop: "60px",
    backgroundColor: "DodgerBlue",
    color: "white",
    padding: "5px 20px",
  },
});

function LoginAsDoctor() {
  const classes = useStyles();
  const navigate = useNavigate();
  const regex =
    /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[0-9]).{8}$/;
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);

  // getting Token
  const [loggedInUser, setLoggedInUser] = useState('');
  const getLoggedInUserData = async() => {
    try
    {
      const tokenData = JSON.parse(localStorage.getItem('token'));
      // console.log(JSON.parse(localStorage.getItem('token')), "user");
      if(tokenData.userType === 'doctor')
      {
        navigate('/doctorProfile');
      }
      else
      {
        navigate('/profile');
      }
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

  // setting token while login
  const funcDemo = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: userData.email,
        password: userData.password,
      };
      const resp = await axios.post(`${config.backend_URL}/doctorLogin`, payload);
      console.log(resp.data.data[0], "resp.data.data[0]");
      const resData = resp.data.data[0];
      if(resData)
      {
        resData.userType = 'doctor';
        localStorage.setItem('token', JSON.stringify(resData));
        toast.success("Logged in as doctor successfully", {
          theme: "colored",
        });
        navigate("/doctorProfile");
      }
      else
      {
        toast.error("Invalid email or password", {
          theme: "colored",
        });
      }
    } catch (err) {
      console.log("Error==", err);
      toast.error(err?.message, {
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <Header />
      {/* Sign Up form */}
      <div className="signUpForm">
        <div>
          <div>
            <img
              src="https://img.freepik.com/free-photo/veterinarian-checking-dog-medium-shot_23-2149143871.jpg"
              alt=""
              width="700px"
            />
          </div>
        </div>
        <div className="form">
          <FormControl
            style={{
              width: "20vw",
            }}
          >
            <h3>Login as A Doctor</h3>
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              style={{
                marginTop: "20px",
              }}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  email: e.target.value,
                });
              }}
            />
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              variant="standard"
              style={{
                marginTop: "20px",
              }}
              onChange={(e) => {
                if (!regex.test(e.target.value)) {
                  setErr(
                    "Please put atleast 8 characters with special, uppercase, lowercase characters and number"
                  );
                } else {
                  setErr(false);
                }
                setUserData({
                  ...userData,
                  password: e.target.value,
                });
              }}
            />
            {err ? <div className="errMsg">{err}</div> : null}
            <Button
              style={{
                marginTop: "60px",
                backgroundColor: "DodgerBlue",
                color: "white",
                padding: "5px 20px",
              }}
              onClick={(e) => {
                if (err) {
                  toast.error("Please put valid credentials", {
                    theme: "colored",
                  });
                } else {
                  funcDemo(e);
                }
              }}
            >
              Submit
            </Button>
            <div
              className="loginLink"
              onClick={(e) => {
                navigate("/sign-up-as-doctor");
              }}
            >
              New here? Sign up as a Doctor
            </div>
          </FormControl>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginAsDoctor;
