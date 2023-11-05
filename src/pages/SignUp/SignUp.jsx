import React, { useState } from "react";
import { account, ID } from "../../appwrite/appwrite";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "tss-react/mui";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4, validate } from "uuid";
import "./SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import supabase from "../../supabase/supabaseConfig";

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

function SignUp() {
  const classes = useStyles();
  const navigate = useNavigate();
  const regex =
    /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[0-9]).{8}$/;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);

  const funcDemo = async (e) => {
    e.preventDefault();

    
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
        }
      }
    })

    if(error)
    {
      console.log("Error occured : ", error);
      toast.error(error.message, {
        theme: "colored",
      });
    }
    else
    {
      toast.success("Signed up successfully", {
        theme: "colored",
      });
      navigate("/login");
    }


    // const promise = account.create(
    //   uuidv4(),
    //   userData.email,
    //   userData.password,
    //   userData.name
    // );

    // promise.then(
    //   (res) => {
    //     // console.log(res, "res????");
    //     toast.success("Signed up successfully", {
    //       theme: "colored",
    //     });
    //     navigate("/login");
    //   },
    //   (error) => {
    //     console.log("Error occured : ", error);
    //     toast.error(error.message, {
    //       theme: "colored",
    //     });
    //   }
    // );
  };

  return (
    <div>
      <Header />
      {/* Sign Up form */}
      <div className="signUpForm">
        <div>
          <div>
            <img
              src="https://images.newscientist.com/wp-content/uploads/2021/12/14112035/PRI_214918718.jpg"
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
            <h3>Sign Up</h3>
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
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              style={{
                marginTop: "20px",
              }}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  name: e.target.value,
                });
              }}
            />
            <Button
              style={{
                marginTop: "60px",
                backgroundColor: "DodgerBlue",
                color: "white",
                padding: "5px 20px",
              }}
              onClick={(e) => {
                if (err) {
                  toast.error("Please put a valid details", {
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
                navigate("/login");
              }}
            >
              Already have account ? Log in
            </div>
          </FormControl>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
