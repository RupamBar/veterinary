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
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import config from "../../../config.json";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import "./ManageDoctors.css"

function ManageDoctors() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = JSON.parse(location.state);
  const regex =
    /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[0-9]).{8}$/;
  const [open, setOpen] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [err, setErr] = useState(false);
  const [newUser, setNewUser] = useState({
    doctorName: "",
    email: "",
    password: "",
    phone: null,
    address: "",
    city: "",
    state: "",
    pincode: null,
    speciality: "",
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
      doctorName: "",
      email: "",
      password: "",
      phone: null,
      address: "",
      city: "",
      state: "",
      pincode: null,
      speciality: "",
    });
  };

  const getAllDoctors = async () => {
    try {
      const res = await axios.get(`${config.backend_URL}/getAllDoctors`);
      setDoctorList(res?.data?.data);
    } catch (err) {
      console.log("Error==", err.message);
      toast.error(err?.response?.data?.message, {
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  // ***for updating user
  const startEditDoctor = async(data) => {
    try {
      // console.log(data.id, "dATA");
      const res = await axios.get(`${config.backend_URL}/getDoctorById/${data.id}`);
      // console.log(res.data.data, "res.data.data");
      setNewUser(res?.data?.data[0]);
      setFlagToCallUpdateAPI(true);
      handleClickOpen();
    } catch (err) {
      console.log("Error ==", err);
    }
  }

  const updateDoctor = async() => {
    try
    {
      const resp = await axios.put(`${config.backend_URL}/updateDoctor`,newUser);
      toast.success("Doctor's account is updated successfully", {
        theme: "colored",
      });
      getAllDoctors();
    }
    catch(err)
    {
      console.log("Error==", err);
      toast.error(err?.response?.data?.message, {
        theme: "colored",
      });
    }
    handleClose();
  };

  // ***for creating user
  const createDoctor = async () => {
    try {
      const res = await axios.get(
        `${config.backend_URL}/getDoctorByEmail/${newUser.email}`
      );
      if (res.data.data.length === 0) {
        const resp = await axios.post(
          `${config.backend_URL}/addDoctor`,
          newUser
        );
        toast.success("Doctor's account is created successfully", {
          theme: "colored",
        });
        handleClose();
        getAllDoctors();
      } else {
        toast.error("Doctor's account already exists", {
          theme: "colored",
        });
      }
    } catch (err) {
      console.log("Error==", err.message);
      toast.error(err?.response?.data?.message, {
        theme: "colored",
      });
    }
  };

  // ***for deleting doctor
  const startDeleteDoctor = async(data) => {
    const ans = window.prompt(`Do you want to delete the doctor ${data.email} ? If yes then put 'YES' here and click OK`)
    // console.log(ans, "ans");
    // console.log(stateData.user, "stateData.user");
    try
    {
      if(ans === "YES")
      {
        const res = await axios.delete(`${config.backend_URL}/deleteDoctor/${data.id}`);
        // const response = await axios.delete(`${config.backend_URL}/removeAuthCustomer/${stateData.user.id}`);
        getAllDoctors();
        toast.success("Doctor's account is deleted successfully", {
          theme: "colored",
        });
      }
    }
    catch(err)
    {
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
                startEditDoctor(params.row);
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
                startDeleteDoctor(params.row);
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
      field: "doctorName",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "password",
      headerName: "Password",
      width: 200,
    },
    {
      field: "speciality",
      headerName: "Speciality",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
    {
      field: "state",
      headerName: "State",
      width: 150,
    },
    {
      field: "pincode",
      headerName: "Pincode",
      width: 100,
    },
  ];

  return (
    <div>
      <AuthorizedHeader user={stateData.user} />
      <div className="adminPageBg">
        <div style={{display : 'flex', alignItems: 'center'}}>
            <div>
                <ArrowBackIcon style={{cursor: 'pointer'}} onClick={(e) => {navigate('/profile')}}/>
            </div>
            <div className="adminPageHeading">Manage Doctors</div>
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
            Add Doctor
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
          Add Doctor
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
          <div>
            <TextField
              id="outlined-basic"
              label="Email*"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.email || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, email: e.target.value });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Password*"
              variant="outlined"
              type="password"
              style={{ width: "100%" }}
              value={newUser.password || ""}
              onChange={(e) => {
                if (!regex.test(e.target.value)) {
                  setErr(
                    "Please put atleast 8 characters with special, uppercase, lowercase characters and number"
                  );
                } else {
                  setErr(false);
                }
                setNewUser({ ...newUser, password: e.target.value });
              }}
            />
            {err ? <div className="errMsg">{err}</div> : null}
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Name*"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.doctorName || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, doctorName: e.target.value });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Speciality*"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.speciality || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, speciality: e.target.value });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.phone || ""}
              type="number"
              onChange={(e) => {
                setNewUser({ ...newUser, phone: e.target.value || null });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.address || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, address: e.target.value });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.city || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, city: e.target.value });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="State"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.state || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, state: e.target.value });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Pincode"
              variant="outlined"
              style={{ width: "100%" }}
              type="number"
              value={newUser.pincode || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, pincode: e.target.value || null});
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={(e) => {
              if (
                err ||
                !newUser.email ||
                !newUser.doctorName ||
                !newUser.password ||
                !newUser.speciality
              ) {
                toast.error("Please put all valid details", {
                  theme: "colored",
                });
              } else {
                flagToCallUpdateAPI ? updateDoctor() : createDoctor();
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

export default ManageDoctors;
