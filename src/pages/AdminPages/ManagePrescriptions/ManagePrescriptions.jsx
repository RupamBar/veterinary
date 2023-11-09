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
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Autocomplete from '@mui/material/Autocomplete';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import config from "../../../config.json";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./ManagePrescriptions.css";
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

function ManagePrescriptions() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = JSON.parse(location.state);
  const regex =
    /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[0-9]).{8}$/;
  const [open, setOpen] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  console.log(doctorList, "doctorList");
  const [err, setErr] = useState(false);
  const [newUser, setNewUser] = useState({
    name: null,
    count: null,
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
      count: null,
      picURL: null,
      price : null,
    });
  };

  const getAllPrescriptions = async () => {
    try {
      const res = await axios.get(`${config.backend_URL}/getAllPrescriptions`);
      setDoctorList(res?.data?.data);
    } catch (err) {
      console.log("Error==", err.message);
      toast.error(err?.response?.data?.message, {
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    getAllPrescriptions();
  }, []);

  // ***for updating user
  const startViewPrescription = async (data) => {
    try {
      // console.log(data.id, "dATA");
      // const res = await axios.get(
      //   `${config.backend_URL}/getMedicineById/${data.id}`
      // );
      console.log(data, "data");
      setNewUser(data);
      // setFlagToCallUpdateAPI(true);
      handleClickOpen();
    } catch (err) {
      console.log("Error ==", err);
    }
  };

  // ***update employee
  const updateMedicine = async () => {
    try {
      const resp = await axios.put(
        `${config.backend_URL}/updateMedicine`,
        newUser
      );
      toast.success("Prescription is updated successfully", {
        theme: "colored",
      });
      getAllPrescriptions();
    } catch (err) {
      console.log("Error==", err);
      toast.error(err?.response?.data?.message, {
        theme: "colored",
      });
    }
    handleClose();
  };

  // ***for creating user
  const createMedicine = async () => {
    try {
        // console.log(newUser, "newUser");
      const res = await axios.get(
        `${config.backend_URL}/getMedicineByName/${newUser.name}`
      );
      if (res.data.data.length === 0) {
        const resp = await axios.post(
          `${config.backend_URL}/addMedicine`,
          newUser
        );
        toast.success("Prescription is added successfully", {
          theme: "colored",
        });
        handleClose();
        getAllPrescriptions();
      } else {
        toast.error("This Prescription already exists", {
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
  const startDeleteMedicine = async (data) => {
    const ans = window.prompt(
      `Do you want to delete the medicine ${data.name} ? If yes then put 'YES' here and click OK`
    );
    // console.log(ans, "ans");
    // console.log(stateData.user, "stateData.user");
    try {
      if (ans === "YES") {
        const res = await axios.delete(
          `${config.backend_URL}/deleteMedicine/${data.id}`
        );
        // const response = await axios.delete(`${config.backend_URL}/removeAuthCustomer/${stateData.user.id}`);
        getAllPrescriptions();
        toast.success("Medicine is deleted successfully", {
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
                startViewPrescription(params.row);
              }}
            >
              View
            </Button>
          </>
        );
      },
    },
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "animals",
      headerName: "Pet Name",
      width: 150,
      renderCell: (params) => {
        // console.log(params, "params");
        return (
          params?.row?.animals?.name
        );
      },
    },
    {
      field: "customers",
      headerName: "Customer Name",
      width: 150,
      renderCell: (params) => {
        // console.log(params, "params");
        return (
          params?.row?.customers?.name
        );
      },
    },
    {
      field: "doctors",
      headerName: "Doctor Name",
      width: 150,
      renderCell: (params) => {
        // console.log(params, "params");
        return (
          params?.row?.doctors?.name
        );
      },
    },
    {
      field: "slots",
      headerName: "Slot",
      width: 150,
      renderCell: (params) => {
        // console.log(params, "params");
        return (
          params?.row?.slots?.dateTime
        );
      },
    },
    {
      field: "cnsltNote",
      headerName: "Consult Note",
      width: 150,
    },
    {
      field: "investigation",
      headerName: "Investigation",
      width: 150,
    },
    {
      field: "prscMed",
      headerName: "Prescribed Medicine",
      width: 150,
    },

  ];

  return (
    <div>
      <AuthorizedHeader user={stateData.user} />
      <div className="adminPageBg">
        <div style={{ display: "flex", alignItems: "center", marginBottom : '20px'}}>
          <div>
            <ArrowBackIcon
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                navigate("/profile");
              }}
            />
          </div>
          <div className="adminPageHeading">Manage Prescriptions</div>
        </div>
        {/* <div className="addBtnContainer">
          <Button
            style={{
              backgroundColor: "DodgerBlue",
              color: "white",
              borderRadius: "8px",
            }}
            onClick={handleClickOpen}
          >
            Add Medicine
          </Button>
        </div> */}
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
          View Prescription
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
          {/* <div style={{ color: "red", marginBottom: "10px" }}>
            '*' fields are mandatory
          </div> */}
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Pet Name*"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser?.animals?.name || ""}
              disabled
              // onChange={(e) => {
              //   setNewUser({ ...newUser, name: e.target.value || null });
              // }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Customer Name*"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser?.customers?.name || ""}
              disabled
              // onChange={(e) => {
              //   setNewUser({ ...newUser, count: e.target.value || null });
              // }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Doctor Name*"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser?.doctors?.name || ""}
              disabled
              // onChange={(e) => {
              //   setNewUser({ ...newUser, price: e.target.value || null });
              // }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Booked Slot*"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser?.slots?.dateTime || ""}
              disabled
              // onChange={(e) => {
              //   setNewUser({ ...newUser, price: e.target.value || null });
              // }}
            />
          </div>
          <div className="textFieldStyle">
            <label htmlFor="Consult Note">Consult Note*</label>
            <TextareaAutosize
              id="outlined-basic"
              label="Consult Note*"
              variant="outlined"
              style={{ width: "100%", height: "20vh"}}
              value={newUser?.cnsltNote || ""}
              disabled
              // onChange={(e) => {
              //   setNewUser({ ...newUser, price: e.target.value || null });
              // }}
            />
          </div>
          <div className="textFieldStyle">
            <label htmlFor="Investigation">Investigation*</label>
            <TextareaAutosize
              id="outlined-basic"
              label="Investigation*"
              variant="outlined"
              style={{ width: "100%", height: "20vh"}}
              value={newUser?.investigation || ""}
              disabled
              // onChange={(e) => {
              //   setNewUser({ ...newUser, price: e.target.value || null });
              // }}
            />
          </div>
          <div className="textFieldStyle">
            <label htmlFor="Prescribed Medicine*">Prescribed Medicine*</label>
            <TextareaAutosize
              id="outlined-basic"
              label="Prescribed Medicine*"
              variant="outlined"
              style={{ width: "100%", height: "20vh"}}
              value={newUser?.prscMed || ""}
              disabled
              // onChange={(e) => {
              //   setNewUser({ ...newUser, price: e.target.value || null });
              // }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button
            autoFocus
            onClick={(e) => {
              if (
                err ||
                !newUser.name ||
                !newUser.count ||
                !newUser.picURL ||
                !newUser.price
              ) {
                toast.error("Please put all valid details", {
                  theme: "colored",
                });
              } else {
                flagToCallUpdateAPI ? updateMedicine() : createMedicine();
              }
            }}
            style={{
              backgroundColor: "DodgerBlue",
              color: "white",
              borderRadius: "8px",
            }}
          >
            Submit
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManagePrescriptions;
