import React, { useState, useEffect } from "react";
import AuthorizedHeader from "../../../components/Header/AuthorizedHeader";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import config from "../../../config.json";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./ManageAnimals.css";
import defaultImage from "../../../resources/defaultView.png"

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

function ManageAnimals() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = JSON.parse(location.state);
  const regex =
    /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[0-9]).{8}$/;
  const [open, setOpen] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [err, setErr] = useState(false);
  const [newUser, setNewUser] = useState({
    name: null,
    sex: null,
    age: null,
    count: null,
    animalType: null,
    picURL: null,
    price : null,
  });
  const [flagToCallUpdateAPI, setFlagToCallUpdateAPI] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setErr(false);
    setFlagToCallUpdateAPI(false);
    setNewUser({
      name: null,
      sex: null,
      age: null,
      count: null,
      animalType: null,
      picURL: null,
      price : null,
    });
  };

  const getAllAnimals = async () => {
    try {
      const res = await axios.get(`${config.backend_URL}/getAllAnimals`);
      setDoctorList(res?.data?.data);
    } catch (err) {
      console.log("Error==", err.message);
      toast.error(err?.response?.data?.message, {
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    getAllAnimals();
  }, []);

  // ***for updating user
  const startEditAnimal = async (data) => {
    try {
      // console.log(data.id, "dATA");
      const res = await axios.get(
        `${config.backend_URL}/getAnimalById/${data.id}`
      );
      // console.log(res.data.data, "res.data.data");
      setNewUser(res?.data?.data[0]);
      setFlagToCallUpdateAPI(true);
      handleClickOpen();
    } catch (err) {
      console.log("Error ==", err);
    }
  };

  // ***update employee
  const updateAnimal = async () => {
    try {
      const resp = await axios.put(
        `${config.backend_URL}/updateAnimal`,
        newUser
      );
      toast.success("Animal is added successfully", {
        theme: "colored",
      });
      getAllAnimals();
    } catch (err) {
      console.log("Error==", err);
      toast.error(err?.response?.data?.message, {
        theme: "colored",
      });
    }
    handleClose();
  };

  // ***for creating user
  const createAnimal = async () => {
    try {
        // console.log(newUser, "newUser");
      const res = await axios.post(
        `${config.backend_URL}/getAnimalByN_A_S`, newUser
      );
      if (res.data.data.length === 0) {
        const resp = await axios.post(
          `${config.backend_URL}/addAnimal`,
          newUser
        );
        toast.success("Animal is added successfully", {
          theme: "colored",
        });
        handleClose();
        getAllAnimals();
      } else {
        toast.error("This animal specification already exists", {
          theme: "colored",
        });
      }
      // console.log(res.data.data, "res.data.data");
    } catch (err) {
      console.log("Error==", err.message);
      toast.error(err?.response?.data?.message, {
        theme: "colored",
      });
    }
  };

  // ***for deleting employee
  const startDeleteAnimal = async (data) => {
    const ans = window.prompt(
      `Do you want to delete the animal '${data.name}', '${data.age} months', '${data.sex}' ? If yes then put 'YES' here and click OK`
    );
    // console.log(ans, "ans");
    // console.log(stateData.user, "stateData.user");
    try {
      if (ans === "YES") {
        const res = await axios.delete(
          `${config.backend_URL}/deleteAnimal/${data.id}`
        );
        // const response = await axios.delete(`${config.backend_URL}/removeAuthCustomer/${stateData.user.id}`);
        getAllAnimals();
        toast.success("Animal is deleted successfully", {
          theme: "colored",
        });
      }
    } catch (err) {
      console.log("Error==", err.message);
    }
  };

  const columns = [
    {
      field: "Actions",
      headerName: "Actions",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.name}`,
      renderCell: (params) => {
        // console.log(params, "params");
        return (
          <>
            <Button
              style={{
                backgroundColor: "Tomato",
                color: "white",
                marginRight: "5px",
              }}
              onClick={(e) => {
                // console.log(params.row, "row");
                startEditAnimal(params.row);
              }}
            >
              Update
            </Button>
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
                marginRight: "5px",
              }}
              onClick={(e) => {
                startDeleteAnimal(params.row);
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "sex",
      headerName: "Sex",
      width: 200,
    },
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price in Rupees",
      width: 200,
    },
    {
      field: "count",
      headerName: "Count",
      width: 150,
    },
    {
      field: "animalType",
      headerName: "Animal Type",
      width: 200,
    },
    {
    //   field: "picURL",
      headerName: "Picture",
      width: 250,
      renderCell: (params) => {
        // console.log(params, "params");
        return (
            <img src={params.row.picURL} width='150px'/>
        )
    }
    },
  ];

  return (
    <div>
      <AuthorizedHeader user={stateData.user} />
      <div className="adminPageBg">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <ArrowBackIcon
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                navigate("/profile");
              }}
            />
          </div>
          <div className="adminPageHeading">Manage Animals</div>
        </div>
        <div className="addBtnContainer">
          <Button
            style={{
              backgroundColor: "DodgerBlue",
              color: "white",
              borderRadius: "8px",
            }}
            onClick={handleClickOpen}
          >
            Add Animal
          </Button>
        </div>
        <div className="tableContainer">
          <Box sx={{ height: 450, width: "100%" }}>
            <DataGrid
              rows={doctorList}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              // checkboxSelection
              disableRowSelectionOnClick
              slots={{ toolbar: GridToolbar }}
            />
          </Box>
        </div>
      </div>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {flagToCallUpdateAPI ? "Update Animal" : "Add Animal"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div style={{ color: "red", marginBottom: "10px" }}>
            '*' fields are mandatory
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Name*"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.name || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, name: e.target.value });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['Male', 'Female']}
            // sx={{ width: 1000 }}
            value={newUser.sex || ''}
            onChange={(e, params) => {
                // console.log(params);
                setNewUser({ ...newUser, sex: params });
              }}
            renderInput={(params) => <TextField {...params} label="Sex*" />}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Age* (months)"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.age || null}
              type="number"
              onChange={(e) => {
                setNewUser({ ...newUser, age: e.target.value });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Price* (in Rupees)"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.price || null}
              type="number"
              onChange={(e) => {
                setNewUser({ ...newUser, price: e.target.value });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Count*"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.count || null}
              type="number"
              onChange={(e) => {
                setNewUser({ ...newUser, count: e.target.value });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={['Dog', 'Cat', 'Bird']}
                // sx={{ width: 1000 }}
                value={newUser.animalType || ''}
                onChange={(e, params) => {
                    // console.log(params);
                    setNewUser({ ...newUser, animalType: params });
                }}
                renderInput={(params) => <TextField {...params} label="Animal Type*" />}
                />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Picture URL*"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.picURL || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, picURL: e.target.value });
              }}
            />
            <div className="textFieldStyle">
                <img src={newUser.picURL || defaultImage} alt="preview image" width='100px'/>
            </div>
            <div className="textFieldStyle">OR</div>
            <div className="textFieldStyle">
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Picture*
                <VisuallyHiddenInput type="file" accept="image/*" />
              </Button>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={(e) => {
              if (
                err ||
                !newUser.name ||
                !newUser.age ||
                !newUser.animalType ||
                !newUser.count ||
                !newUser.picURL ||
                !newUser.sex ||
                !newUser.price
              ) {
                toast.error("Please put all valid details", {
                  theme: "colored",
                });
              } else {
                flagToCallUpdateAPI ? updateAnimal() : createAnimal();
              }
            }}
            style={{
              backgroundColor: "DodgerBlue",
              color: "white",
              borderRadius: "8px",
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManageAnimals;
