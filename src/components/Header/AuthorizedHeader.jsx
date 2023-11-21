import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import "./Header.css";
import { makeStyles } from "tss-react/mui";
import Logo from "./VTSLogo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import config from "../../config.json";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Autocomplete, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base";

const useStyles = makeStyles()((theme) => ({
  // Define your styles here
  menuStyle: {
    position: "absolute",
    top: "25px",
  },
  menuTexts: {
    fontFamily: "'Manrope', sans-serif",
    fontWeight: "700",
  },
  loginBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    fontFamily: "'Manrope', sans-serif",
    fontWeight: "700",
  },
  callBox: {
    fontFamily: "'Manrope', sans-serif",
    fontWeight: "700",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AuthorizedHeader({ user }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(user);
  const [animalFood, setAnimalFoods] = useState(null);
  const [anchorElAnimals, setAnchorElAnimals] = useState(null);
  const [anchorElMedicines, setAnchorElMedicines] = useState(null);
  const [anchorElAssets, setAnchorElAssets] = useState(null);
  const [anchorElGrooming, setAnchorElGrooming] = useState(null);
  const [anchorElCheckUp, setAnchorElCheckUp] = useState(null);
  const [anchorElLogout, setAnchorElLogout] = useState(null);

  const [fetchedUserData, setFetchedUserData] = useState("");
  const [open, setOpen] = React.useState(false);

  // console.log(fetchedUserData, "fetchedUserData");
  // console.log(userData, "userData>>>");

  // getting token
  const getUserData = () => {
    try {
      // const resp = await axios.get(`${config.backend_URL}/getLoggedInUser`);
      const tokenData = JSON.parse(localStorage.getItem("token"));
      // console.log(JSON.parse(localStorage.getItem("token")), "user");
      setUserData(tokenData || "");
    } catch (err) {
      console.log("Error==", err);
    }
  };

  useEffect(() => {
    setUserData(user);
    getUserData();
  }, []);

  const handleLogout = async () => {
    // try
    // {
    try {
      // const resp = await axios.get(`${config.backend_URL}/signOutUser`);
      localStorage.removeItem("token");
      toast.success("Logged out successfully", {
        theme: "colored",
      });
      navigate("/");
    } catch (err) {
      console.log("Error==", err);
      toast.error(err?.response?.data?.message, {
        theme: "colored",
      });
    }
  };

  const handleClick = (event, str) => {
    if (str === "animalFoods") setAnimalFoods(event.currentTarget);
    else if (str === "animals") setAnchorElAnimals(event.currentTarget);
    else if (str === "medicines") setAnchorElMedicines(event.currentTarget);
    else if (str === "assets") setAnchorElAssets(event.currentTarget);
    else if (str === "grooming") setAnchorElGrooming(event.currentTarget);
    else if (str === "checkUp") setAnchorElCheckUp(event.currentTarget);
    else if (str === "logout") setAnchorElLogout(event.currentTarget);
  };

  const handleClose = () => {
    setAnimalFoods(null);
    setAnchorElAnimals(null);
    setAnchorElMedicines(null);
    setAnchorElAssets(null);
    setAnchorElGrooming(null);
    setAnchorElCheckUp(null);
    setAnchorElLogout(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  // Customer work
  const getCustomerById = async () => {
    try {
      const res = await axios.get(
        `${config.backend_URL}/getCustomerById/${userData?.id}`
      );
      console.log(res.data.data, "res.data.data?>?>?>");
      setFetchedUserData(res.data.data[0] || {});

      handleClickOpen();
    } catch (err) {
      console.log("Error==", err.message);
    }
  };

  // Employee work
  const getEmployeeById = async () => {
    try {
      const resp = await axios.get(
        `${config.backend_URL}/getEmployeeByEmpCode/${userData?.empCode}`
      );

      const res = await axios.get(
        `${config.backend_URL}/getEmployeeById/${resp?.data?.data[0]?.id}`
      );
      // console.log(res.data.data, "res.data.data?>?>?>");
      setFetchedUserData(res.data.data[0] || {});

      handleClickOpen();
    } catch (err) {
      console.log("Error==", err.message);
    }
  };

  // Doctor work
  const getDoctorById = async () => {
    try {
      const res = await axios.get(
        `${config.backend_URL}/getDoctorById/${userData?.id}`
      );
      console.log(res.data.data, "res.data.data?>?>?>");
      setFetchedUserData(res.data.data[0] || {});

      handleClickOpen();
    } catch (err) {
      console.log("Error==", err.message);
    }
  };

  // All update from one function
  const updateProfileData = async (table) => {
    try {
      const res = await axios.put(
        `${config.backend_URL}/updateCustomerProfile/${table}`,
        fetchedUserData
      );
      console.log(res.data.data, "res.data.data");

      let resData = res.data.data[0];
      resData.userType = userData.userType;
      localStorage.setItem("token", JSON.stringify(resData));
      getUserData();

      toast.success("Profile updated successfully", {
        theme: "colored",
      });
      handleCloseDialog();
    } catch (err) {
      console.log("Error ==", err.message);
    }
  };

  return (
    <div>
      <div className="navbar">
        <div
          className="logoDiv"
          onClick={(e) => {
            navigate("/profile");
          }}
        >
          <img src={Logo} alt="Logo" width="150px" />
        </div>
        {userData?.userType === "customer" ? (
          <div className="animalList">
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                style={{
                  color: "black",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: "700",
                }}
                onClick={(e) => navigate("/animal-foods")}
              >
                Animal Foods
              </Button>
            </div>
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                style={{
                  color: "black",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: "700",
                }}
                onClick={(e) => handleClick(e, "animals")}
              >
                Animals
                {!anchorElAnimals ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </Button>
              <Menu
                anchorEl={anchorElAnimals}
                keepMounted
                open={Boolean(anchorElAnimals)}
                onClose={handleClose}
                // style={{
                //   position: "absolute",
                //   top: "30px",
                // }}
              >
                <MenuItem
                  onClick={(e) => {
                    navigate("/dogs");
                    handleClose();
                  }}
                >
                  Dogs
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    navigate("/cats");
                    handleClose();
                  }}
                >
                  Cats
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    navigate("/birds");
                    handleClose();
                  }}
                >
                  Birds
                </MenuItem>
              </Menu>
            </div>
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                style={{
                  color: "black",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: "700",
                }}
                onClick={(e) => navigate("/medicines")}
              >
                Medicines
              </Button>
            </div>
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                style={{
                  color: "black",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: "700",
                }}
                onClick={(e) => navigate("/assets")}
              >
                Assets
              </Button>
            </div>
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                style={{
                  color: "black",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: "700",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(e, "grooming");
                  navigate("/groom-slot-booking");
                }}
              >
                Grooming
              </Button>
            </div>
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                style={{
                  color: "black",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: "700",
                }}
                onClick={(e) => handleClick(e, "checkUp")}
              >
                Check Up
                {!anchorElCheckUp ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </Button>
              <Menu
                anchorEl={anchorElCheckUp}
                keepMounted
                open={Boolean(anchorElCheckUp)}
                onClose={handleClose}
                // style={{
                //   position: "absolute",
                //   top: "30px",
                // }}
              >
                <MenuItem onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                  navigate("/appointment-booking");
                }}>Doctor Consultancy</MenuItem>
              </Menu>
            </div>
          </div>
        ) : null}
        <div className="loginDiv">
          <Button
            style={{
              color: "black",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: "700",
            }}
          >
            <CallOutlinedIcon />
            <div>Call</div>
          </Button>
          <Button
            className={classes.loginBox}
            onClick={(e) => handleClick(e, "logout")}
          >
            <AccountCircleOutlinedIcon />
            <div
              style={{ margin: "0px 5px" }}
            >{`  Hi ${userData?.name}  `}</div>
            {!anchorElLogout ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            {/* <div className={classes.logoutBtn} onClick={handleLogout}>Logout</div> */}
          </Button>
          <Menu
            anchorEl={anchorElLogout}
            keepMounted
            open={Boolean(anchorElLogout)}
            onClose={handleClose}
            // style={{
            //   position: "absolute",
            //   top: "30px",
            // }}
          >
            <MenuItem
              onClick={(e) => {
                handleClose();
                if (userData?.userType === "customer") {
                  getCustomerById();
                } else if (userData?.userType === "employee") {
                  getEmployeeById();
                } else if (userData?.userType === "doctor") {
                  getDoctorById();
                }
              }}
            >
              Edit Profile
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                handleClose();
                handleLogout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>

      <Dialog
        open={open}
        maxWidth="lg"
        fullWidth="true"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Edit Your Profile</DialogTitle>
        <DialogContent>
          <div style={{ color: "red", marginBottom: "10px" }}>
            '*' fields are mandatory
          </div>
          <div className="dialogSections">
            <div className="sectionParts">
              {userData?.userType === "employee" ? (
                <TextField
                  id="outlined-basic"
                  label="Employee Code*"
                  variant="outlined"
                  disabled
                  style={{ width: "100%", margin: "10px 0px" }}
                  value={fetchedUserData.empCode || ""}
                  onChange={(e) => {
                    setFetchedUserData({
                      ...fetchedUserData,
                      empCode: e.target.value,
                    });
                  }}
                />
              ) : null}
              {userData?.userType === "employee" ||
              userData?.userType === "doctor" ||
              userData?.userType === "customer" ? (
                <TextField
                  id="outlined-basic"
                  label="Name*"
                  variant="outlined"
                  style={{ width: "100%", margin: "10px 0px" }}
                  value={fetchedUserData.name || ""}
                  onChange={(e) => {
                    setFetchedUserData({
                      ...fetchedUserData,
                      name: e.target.value,
                    });
                  }}
                />
              ) : null}
              {userData?.userType === "employee" ||
              userData?.userType === "doctor" ||
              userData?.userType === "customer" ? (
                <TextField
                  id="outlined-basic"
                  label="Email*"
                  variant="outlined"
                  style={{ width: "100%", margin: "10px 0px" }}
                  value={fetchedUserData.email || ""}
                  disabled
                  onChange={(e) => {
                    setFetchedUserData({
                      ...fetchedUserData,
                      email: e.target.value,
                    });
                  }}
                />
              ) : null}
              {userData?.userType === "employee" ||
              userData?.userType === "doctor" ||
              userData?.userType === "customer" ? (
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  type="number"
                  style={{ width: "100%", margin: "10px 0px" }}
                  value={fetchedUserData.phone || ""}
                  onChange={(e) => {
                    setFetchedUserData({
                      ...fetchedUserData,
                      phone: e.target.value || null,
                    });
                  }}
                />
              ) : null}
              {userData?.userType === "employee" ||
              userData?.userType === "doctor" ||
              userData?.userType === "customer" ? (
                <>
                  <label>Address</label>
                  <TextareaAutosize
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    style={{
                      width: "100%",
                      height: "20vh",
                      margin: "10px 0px",
                    }}
                    value={fetchedUserData.address || ""}
                    onChange={(e) => {
                      setFetchedUserData({
                        ...fetchedUserData,
                        address: e.target.value,
                      });
                    }}
                  />
                </>
              ) : null}
            </div>
            <div className="sectionParts">
              {userData?.userType === "employee" ||
              userData?.userType === "doctor" ||
              userData?.userType === "customer" ? (
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  style={{ width: "100%", margin: "10px 0px" }}
                  value={fetchedUserData.city || ""}
                  onChange={(e) => {
                    setFetchedUserData({
                      ...fetchedUserData,
                      city: e.target.value,
                    });
                  }}
                />
              ) : null}
              {userData?.userType === "employee" ||
              userData?.userType === "doctor" ||
              userData?.userType === "customer" ? (
                <TextField
                  id="outlined-basic"
                  label="State"
                  variant="outlined"
                  style={{ width: "100%", margin: "10px 0px" }}
                  value={fetchedUserData.state || ""}
                  onChange={(e) => {
                    setFetchedUserData({
                      ...fetchedUserData,
                      state: e.target.value,
                    });
                  }}
                />
              ) : null}
              {userData?.userType === "employee" ||
              userData?.userType === "doctor" ||
              userData?.userType === "customer" ? (
                <TextField
                  id="outlined-basic"
                  label="Pincode"
                  variant="outlined"
                  type="number"
                  style={{ width: "100%", margin: "10px 0px" }}
                  value={fetchedUserData.pincode || ""}
                  onChange={(e) => {
                    setFetchedUserData({
                      ...fetchedUserData,
                      pincode: e.target.value || null,
                    });
                  }}
                />
              ) : null}
              {userData?.userType === "doctor" ? (
                <TextField
                  id="outlined-basic"
                  label="Speciality"
                  variant="outlined"
                  style={{ width: "100%", margin: "10px 0px" }}
                  value={fetchedUserData.speciality || ""}
                  onChange={(e) => {
                    setFetchedUserData({
                      ...fetchedUserData,
                      speciality: e.target.value,
                    });
                  }}
                />
              ) : null}
              {userData?.userType === "employee" ? (
                <TextField
                  id="outlined-basic"
                  label="Department"
                  variant="outlined"
                  style={{ width: "100%", margin: "10px 0px" }}
                  value={fetchedUserData.department || ""}
                  onChange={(e) => {
                    setFetchedUserData({
                      ...fetchedUserData,
                      department: e.target.value,
                    });
                  }}
                />
              ) : null}
              {userData?.userType === "employee" ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={["Male", "Female"]}
                  value={fetchedUserData.gender || ""}
                  onChange={(e, params) => {
                    setFetchedUserData({ ...fetchedUserData, gender: params });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Gender*" />
                  )}
                />
              ) : null}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={(e) => {
              if (!fetchedUserData.name) {
                toast.error("Please fill the name field", {
                  theme: "colored",
                });
              } else {
                updateProfileData(userData?.userType + "s");
              }
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AuthorizedHeader;
