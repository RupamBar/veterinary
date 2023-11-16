import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import "./Header.css";
import { makeStyles } from "tss-react/mui";
// import { makeStyles } from '@mui/styles';

import { useNavigate } from "react-router-dom";
import Logo from "./VTSLogo.png";

const useStyles = makeStyles()((theme) => ({
  // Define your styles here
  menuStyle: {
    position: "absolute",
    top: "25px",
  },
  menuTexts: {
    fontFamily: "'Manrope', sans-serif",
    fontWeight: "700",
    color: "black",
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

function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [animalFood, setAnimalFoods] = useState(null);
  const [anchorElAnimals, setAnchorElAnimals] = useState(null);
  const [anchorElMedicines, setAnchorElMedicines] = useState(null);
  const [anchorElAssets, setAnchorElAssets] = useState(null);
  const [anchorElGrooming, setAnchorElGrooming] = useState(null);
  const [anchorElCheckUp, setAnchorElCheckUp] = useState(null);

  const handleClick = (event, str) => {
    if (str === "animalFoods") setAnimalFoods(event.currentTarget);
    else if (str === "animals") setAnchorElAnimals(event.currentTarget);
    else if (str === "medicines") setAnchorElMedicines(event.currentTarget);
    else if (str === "assets") setAnchorElAssets(event.currentTarget);
    else if (str === "grooming") setAnchorElGrooming(event.currentTarget);
    else if (str === "checkUp") setAnchorElCheckUp(event.currentTarget);
  };

  const handleClose = () => {
    setAnimalFoods(null);
    setAnchorElAnimals(null);
    setAnchorElMedicines(null);
    setAnchorElAssets(null);
    setAnchorElGrooming(null);
    setAnchorElCheckUp(null);
  };

  return (
    <div>
      <div className="navbar">
        <div
          className="logoDiv"
          onClick={(e) => {
            navigate("/");
          }}
        >
          <img src={Logo} alt="Logo" width="150px" />
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
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                  navigate("/appointment-booking");
                }}
              >
                Doctor Consultancy
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="loginDiv">
          <Button
            style={{
              color: "black",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: "700",
            }}
            onClick={(e) => {
              navigate("/login-as-doctor");
            }}
          >
            <MedicalServicesIcon />
            <div>Doctor</div>
          </Button>
          <Button
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: "700",
            }}
            onClick={(e) => {
              navigate("/login");
            }}
          >
            <AccountCircleOutlinedIcon
              style={{
                color: "black",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: "700",
              }}
            />
            <div
              style={{
                color: "black",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: "700",
              }}
            >
              Login / Sign Up
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
