import React, { useState, useEffect } from "react";
import AuthorizedHeader from "../../../components/Header/AuthorizedHeader";
import { useLocation } from "react-router-dom";
// import { account, ID, databases } from "../../../appwrite/appwrite";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./ManageCustomers.css";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import config from "../../../config.json";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // "& .MuiDialogContent-root": {
  //   padding: theme.spacing(2),
  // },
  // "& .MuiDialogActions-root": {
  //   padding: theme.spacing(1),
  // },
}));

function ManageCustomers() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = JSON.parse(location.state);
  const regex =
    /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[0-9]).{8}$/;
  const [open, setOpen] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [err, setErr] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [flagToCallUpdateAPI, setFlagToCallUpdateAPI] = useState(false);

  const getAllCustomers = async () => {
    try {
      const res = await axios.get(`${config.backend_URL}/getAllCustomers`);
      // console.log(res.data.data, "res.data.data");
      setCustomerList(res?.data?.data);
    } catch (err) {
      console.log("Error ==", err);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setErr(false);
    setFlagToCallUpdateAPI(false);
    setNewUser({
      name: "",
      email: "",
      password: "",
    });
  };

  const startEditUser = async(data) => {
    try {
      // console.log(data.id, "dATA");
      const res = await axios.get(`${config.backend_URL}/getCustomerById/${data.id}`);
      // console.log(res.data.data, "res.data.data");
      setNewUser(res?.data?.data[0]);
      setFlagToCallUpdateAPI(true);
      handleClickOpen();
    } catch (err) {
      console.log("Error ==", err);
    }
  }

  const updateUsers = async () => {
    // console.log(newUser, "newUser");
    try
    {
      const payload = {
        id : newUser.id,
        email: newUser.email,
        password: newUser.password,
        name: newUser.name
      };
      const resp = await axios.put(`${config.backend_URL}/updateCustomer`,payload);
      toast.success("User is updated successfully", {
        theme: "colored",
      });
      getAllCustomers();
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

  const createUsers = async () => {
    // console.log(newUser, "newUser");
    try
    {
      const payload = {
        email: newUser.email,
        password: newUser.password,
        name: newUser.name
      };
      const resp = await axios.post(`${config.backend_URL}/signUp`,payload);
      const response = await axios.post(`${config.backend_URL}/addCustomer`,payload);
      toast.success("User is created successfully", {
        theme: "colored",
      });
      getAllCustomers();
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

  const startDeleteUser = async(data) => {
    const ans = window.prompt(`Do you want to delete the customer ${data.email} ? If yes then put 'YES' here and click OK`)
    console.log(ans, "ans");
    console.log(stateData.user, "stateData.user");
    try
    {
      if(ans === "YES")
      {
        const res = await axios.delete(`${config.backend_URL}/deleteCustomer/${data.id}`);
        // const response = await axios.delete(`${config.backend_URL}/removeAuthCustomer/${stateData.user.id}`);
        getAllCustomers();
        toast.success("User is deleted successfully", {
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
                startEditUser(params.row);
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
                startDeleteUser(params.row);
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

  // console.log(JSON.parse(location.state), "location.state.user");
  return (
    <div>
      <AuthorizedHeader user={stateData.user} />
      <div className="adminPageBg">
        <h2>Manage Users</h2>
        <div className="addBtnContainer">
          <Button
            style={{
              backgroundColor: "DodgerBlue",
              color: "white",
              borderRadius: "8px",
            }}
            onClick={handleClickOpen}
          >
            Add User
          </Button>
        </div>
        <div className="tableContainer">
          <Box sx={{ height: 450, width: "100%" }}>
            <DataGrid
              rows={customerList}
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

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add User
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
          <div>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.email || ''}
              onChange={(e) => {
                setNewUser({ ...newUser, email: e.target.value });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              style={{ width: "100%" }}
              value={newUser.password || ''}
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
              label="Name"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.name || ''}
              onChange={(e) => {
                setNewUser({ ...newUser, name: e.target.value });
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={(e) => {
              if (err || !newUser.email || !newUser.name || !newUser.password) {
                toast.error("Please put all valid details", {
                  theme: "colored",
                });
              } else {
                flagToCallUpdateAPI ? updateUsers() : createUsers();
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
      </BootstrapDialog>
    </div>
  );
}

export default ManageCustomers;
