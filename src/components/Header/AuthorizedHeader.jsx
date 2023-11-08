import React, { useState } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import "./Header.css";
import { makeStyles } from 'tss-react/mui';
import Logo from "./VTSLogo.png"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import config from "../../config.json";

const useStyles = makeStyles()((theme) => ({
  // Define your styles here
  menuStyle: {
    position: "absolute",
    top: "25px",
  },
  menuTexts : {
    fontFamily: "'Manrope', sans-serif",
    fontWeight: '700',
  },
  loginBox : {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    fontFamily: "'Manrope', sans-serif",
    fontWeight: '700',
  },
  callBox : {
    fontFamily: "'Manrope', sans-serif",
    fontWeight: '700',
  },
}));

function AuthorizedHeader({user}) {
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

  const handleLogout = async() => {
    // try
    // {
      try
      {
        const resp = await axios.get(`${config.backend_URL}/signOutUser`);
        toast.success("Logged out successfully", {
          theme: "colored",
        })
        navigate("/");
      }
      catch(err)
      {
        console.log("Error==", err);
        toast.error(err?.response?.data?.message, {
          theme: "colored",
        });
      }
  };

  const handleClick = (event, str) => {
    if(str === 'animalFoods')
      setAnimalFoods(event.currentTarget);
    else if(str === 'animals')
      setAnchorElAnimals(event.currentTarget);
    else if(str === 'medicines')
    setAnchorElMedicines(event.currentTarget);
    else if(str === 'assets')
    setAnchorElAssets(event.currentTarget);
    else if(str === 'grooming')
    setAnchorElGrooming(event.currentTarget);
    else if(str === 'checkUp')
    setAnchorElCheckUp(event.currentTarget);
    else if(str === 'logout')
    setAnchorElLogout(event.currentTarget);
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

  return (
    <div>
      <div className="navbar">
        <div className="logoDiv" onClick={(e) => {navigate("/profile")}}>
          <img
            src={Logo}
            alt="Logo"
            width="150px"
          />
        </div>
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
              onClick={(e) => handleClick(e, 'animalFoods')}
            >
              Animal Foods
              {!animalFood ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </Button>
            <Menu
              anchorEl={animalFood}
              keepMounted
              open={Boolean(animalFood)}
              onClose={handleClose}
              // style={{
              //   position: "absolute",
              //   top: "30px",
              // }}
            >
              <MenuItem onClick={handleClose}>Dog Food</MenuItem>
              <MenuItem onClick={handleClose}>Cat Food</MenuItem>
              <MenuItem onClick={handleClose}>Fish Food</MenuItem>
              <MenuItem onClick={handleClose}>Bird Food</MenuItem>
              <MenuItem onClick={handleClose}>Small Animal Food</MenuItem>
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
              onClick={(e) => handleClick(e, 'animals')}
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
              <MenuItem onClick={handleClose}>Dog</MenuItem>
              <MenuItem onClick={handleClose}>Cat</MenuItem>
              <MenuItem onClick={handleClose}>Fish</MenuItem>
              <MenuItem onClick={handleClose}>Bird</MenuItem>
              <MenuItem onClick={handleClose}>Small Animal</MenuItem>
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
              onClick={(e) => handleClick(e, 'medicines')}
            >
              Medicines
              {!anchorElMedicines ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </Button>
            <Menu
              anchorEl={anchorElMedicines}
              keepMounted
              open={Boolean(anchorElMedicines)}
              onClose={handleClose}
              // style={{
              //   position: "absolute",
              //   top: "30px",
              // }}
            >
              <MenuItem onClick={handleClose}>Option 1</MenuItem>
              <MenuItem onClick={handleClose}>Option 2</MenuItem>
              <MenuItem onClick={handleClose}>Option 3</MenuItem>
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
              onClick={(e) => handleClick(e, 'assets')}
            >
              Assets
              {!anchorElAssets ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </Button>
            <Menu
              anchorEl={anchorElAssets}
              keepMounted
              open={Boolean(anchorElAssets)}
              onClose={handleClose}
              // style={{
              //   position: "absolute",
              //   top: "30px",
              // }}
            >
              <MenuItem onClick={handleClose}>House</MenuItem>
              <MenuItem onClick={handleClose}>Toys</MenuItem>
              <MenuItem onClick={handleClose}>Bathing</MenuItem>
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
              onClick={(e) => handleClick(e, 'grooming')}
            >
              Grooming
              {!anchorElGrooming ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </Button>
            <Menu
              anchorEl={anchorElGrooming}
              keepMounted
              open={Boolean(anchorElGrooming)}
              onClose={handleClose}
              // style={{
              //   position: "absolute",
              //   top: "30px",
              // }}
            >
              <MenuItem onClick={handleClose}>Hair Cut</MenuItem>
              <MenuItem onClick={handleClose}>Bath</MenuItem>
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
              onClick={(e) => handleClick(e, 'checkUp')}
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
              <MenuItem onClick={handleClose}>Doctor Consultancy</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="loginDiv">
          <Button style={{
              color: "black",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: "700",
            }}>
            <CallOutlinedIcon/>
            <div>Call</div>
          </Button>
          <Button className={classes.loginBox} onClick={(e) => handleClick(e, 'logout')}>
            <AccountCircleOutlinedIcon />
            <div style={{margin:'0px 5px'}}>{`  Hi ${userData?.user_metadata?.name}  `}</div>
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
              <MenuItem onClick={(e) => {
                handleClose();
                handleLogout();
              }}>Logout</MenuItem>
            </Menu>
        </div>
      </div>
    </div>
  );
}

export default AuthorizedHeader;
