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
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Autocomplete from "@mui/material/Autocomplete";
import "./ManageEmployees.css";

function ManageEmployees() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = JSON.parse(location.state);
  const regex =
    /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*[0-9]).{8}$/;
  const [open, setOpen] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [err, setErr] = useState(false);
  const [newUser, setNewUser] = useState({
    empCode: "",
    name: "",
    email: "",
    // password: "",
    phone: null,
    address: "",
    city: "",
    state: "",
    pincode: null,
    department: "",
    gender: "",
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
      empCode: "",
      name: "",
      email: "",
      // password: "",
      phone: null,
      address: "",
      city: "",
      state: "",
      pincode: null,
      department: "",
      gender: "",
    });
  };

  const getAllEmployees = async () => {
    try {
      const res = await axios.get(`${config.backend_URL}/getAllEmployees`);
      setDoctorList(res?.data?.data);
    } catch (err) {
      console.log("Error==", err.message);
      toast.error(err?.response?.data?.message, {
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  // ***for updating user
  const startEditEmployee = async (data) => {
    try {
      // console.log(data.id, "dATA");
      const res = await axios.get(
        `${config.backend_URL}/getEmployeeById/${data.id}`
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
  const updateEmployee = async () => {
    try {
      const resp = await axios.put(
        `${config.backend_URL}/updateEmployee`,
        newUser
      );
      toast.success("Employee's account is updated successfully", {
        theme: "colored",
      });
      getAllEmployees();
    } catch (err) {
      console.log("Error==", err);
      toast.error(err?.response?.data?.message, {
        theme: "colored",
      });
    }
    handleClose();
  };

  // ***for creating user
  const createEmployee = async () => {
    try {
      const res = await axios.get(
        `${config.backend_URL}/getEmployeeByEmail/${newUser.email}`
      );
      if (res.data.data.length === 0) {
        const resp = await axios.post(
          `${config.backend_URL}/addEmployee`,
          newUser
        );
        toast.success("Employee's account is created successfully", {
          theme: "colored",
        });
        handleClose();
        getAllEmployees();
      } else {
        toast.error("Employee's account already exists", {
          theme: "colored",
        });
      }
      console.log(res.data.data, "res.data.data");
    } catch (err) {
      console.log("Error==", err.message);
      toast.error(err?.response?.data?.message, {
        theme: "colored",
      });
    }
  };

  // ***for deleting employee
  const startDeleteEmployee = async (data) => {
    const ans = window.prompt(
      `Do you want to delete the employee ${data.email} ? If yes then put 'YES' here and click OK`
    );
    // console.log(ans, "ans");
    // console.log(stateData.user, "stateData.user");
    try {
      if (ans === "YES") {
        const res = await axios.delete(
          `${config.backend_URL}/deleteEmployee/${data.id}`
        );
        // const response = await axios.delete(`${config.backend_URL}/removeAuthCustomer/${stateData.user.id}`);
        getAllEmployees();
        toast.success("Employee's account is deleted successfully", {
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
                startEditEmployee(params.row);
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
                startDeleteEmployee(params.row);
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
      field: "empCode",
      headerName: "Employee Code",
      width: 150,
    },
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
      field: "gender",
      headerName: "Gender",
      width: 100,
    },
    {
      field: "department",
      headerName: "Department",
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <ArrowBackIcon
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                navigate("/profile");
              }}
            />
          </div>
          <div className="adminPageHeading">Manage Employess</div>
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
            Add Employee
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
          Add Employees
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
              label="Employee Code*"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.empCode || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, empCode: e.target.value });
              }}
            />
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
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={["Male", "Female"]}
              value={newUser.gender || ""}
              onChange={(e, params) => {
                setNewUser({ ...newUser, gender: params });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Gender*" />
              )}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Department*"
              variant="outlined"
              style={{ width: "100%" }}
              value={newUser.department || ""}
              onChange={(e) => {
                setNewUser({ ...newUser, department: e.target.value });
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
                setNewUser({ ...newUser, pincode: e.target.value || null });
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
                !newUser.empCode ||
                !newUser.email ||
                !newUser.name ||
                !newUser.department ||
                !newUser.gender
              ) {
                toast.error("Please put all valid details", {
                  theme: "colored",
                });
              } else {
                flagToCallUpdateAPI ? updateEmployee() : createEmployee();
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

export default ManageEmployees;
