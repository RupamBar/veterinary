import React, { useState, useEffect } from "react";
import "./DoctorProfile.css";
import Button from "@mui/material/Button";
// import { account, ID, databases } from "../../appwrite/appwrite";
import { makeStyles } from "tss-react/mui";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthorizedHeader from "../../components/Header/AuthorizedHeader";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";
import CustomerProfile from "../../components/CustomerProfile/CustomerProfile";
// import supabase from "../../supabase/supabaseConfig";
import axios from "axios";
import config from "../../config.json";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Footer from "../../components/Footer/Footer";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";

const useStyles = makeStyles()({
  logoutBtn: {
    backgroundColor: "red",
    color: "white",
  },
  formBtn: {
    marginTop: "60px",
    backgroundColor: "DodgerBlue",
    color: "white",
    padding: "5px 20px",
  },
});

function DoctorProfile() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [tab, setTab] = useState("Appointments");
  const [slotListRaw, setSlotListRaw] = useState([]);
  const [slotListFormatted, setSlotListFormatted] = useState([]);

  const [selectedSlotForPresc, setSelectedSlotForPresc] = useState([]);
  const [open, setOpen] = useState(false);
  const [flagToCallUpdateAPI, setFlagToCallUpdateAPI] = useState(false);
  const [err, setErr] = useState(false);
  const [newUser, setNewUser] = useState("");

  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [selectedSlotLabel, setSelectedSlotLabel] = useState("");
  const [cnsltNote, setCnsltNote] = useState("");
  const [investigation, setInvestigation] = useState("");
  const [presMedication, setPresMedication] = useState("");

  const [allPrescriptions, setAllPrescriptions] = useState([]);

  // console.log(selectedSlotLabel, "selectedSlotLabel");
  // console.log(slotListFormatted, "slotListFormatted");
  // console.log(newUser, "newUser");

  const dataFormatTable = (arr) => {
    setSlotListRaw(arr || []);
    let newArray = [];
    arr.forEach((item, i) => {
      let data;
      data = {
        id: item.id,
        slotId: item.id,
        customerId: item.customers.id,
        customerName: item.customers.name,
        customerEmail: item.customers.email,
        customerPhone: item.customers.phone,
        petId: item.pets.id,
        petName: item.pets.animals.name,
        picURL: item.pets.animals.picURL,
        doctorId: item.doctors.id,
        appointmentDate: `${new Date(
          item.dateTime
        ).toLocaleDateString()} ${new Date(
          item.dateTime
        ).toLocaleTimeString()}`,
        checkedUp: item.checkedUp,

        label: `${item.pets.animals.name}, ${item.customers.name}, ${new Date(
          item.dateTime
        ).toLocaleDateString()} ${new Date(
          item.dateTime
        ).toLocaleTimeString()}`,
      };
      newArray.push(data);
    });
    setSlotListFormatted(newArray || []);
  };

  // getting token
  const getUserData = async () => {
    try {
      // const resp = await axios.get(`${config.backend_URL}/getLoggedInUser`);
      const tokenData = JSON.parse(localStorage.getItem("token"));
      console.log(JSON.parse(localStorage.getItem("token")), "user");
      setUser(tokenData || "");
      if (tokenData) {
        const res = await axios.get(
          `${config.backend_URL}/getSlotsByDoctorId/${tokenData?.id}`
        );
        // console.log(res.data, "res.data");
        dataFormatTable(res.data.data || []);
      }
    } catch (err) {
      console.log("Error==", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const prescriptionTableDataFormatter = (arr) => {
    let newArr = [];
    console.log(arr, "arr????");
    arr.forEach((item, i) => {
      let data = {
        id: item.id,
        prescriptionId: item.id,
        slotId: item.slots.id,
        slotDate: `${new Date(
          item.slots.dateTime
        ).toLocaleDateString()} ${new Date(
          item.slots.dateTime
        ).toLocaleTimeString()}`,
        petId: item.pets.id,
        petName: item.pets.animals.name,
        customerId: item.customers.id,
        customerName: item.customers.name,
        customerEmail: item.customers.email,
        customerPhone: item.customers.phone,
        cnsltNote: item.cnsltNote,
        investigation: item.investigation,
        prscMed: item.prscMed,
        createdAt: `${new Date(
          item.created_at
        ).toLocaleDateString()} ${new Date(
          item.created_at
        ).toLocaleTimeString()}`,
      };
      newArr.push(data);
    });
    setAllPrescriptions(newArr || []);
  };

  const prescriptionTableDataFormatterForUpdate = (arr) => {
    let newArr = [];
    console.log(arr, "arr????");
    arr.forEach((item, i) => {
      let data = {
        id: item.id,
        prescriptionId: item.id,
        slotId: item.slots.id,
        slotDate: `${new Date(
          item.slots.dateTime
        ).toLocaleDateString()} ${new Date(
          item.slots.dateTime
        ).toLocaleTimeString()}`,
        petId: item.pets.id,
        petName: item.pets.animals.name,
        customerId: item.customers.id,
        customerName: item.customers.name,
        customerEmail: item.customers.email,
        customerPhone: item.customers.phone,
        cnsltNote: item.cnsltNote,
        investigation: item.investigation,
        prscMed: item.prscMed,
        doctorId: item.doctors.id,
        createdAt: `${new Date(
          item.created_at
        ).toLocaleDateString()} ${new Date(
          item.created_at
        ).toLocaleTimeString()}`,
        label: `${item.pets.animals.name}, ${item.customers.name}, ${new Date(
          item.slots.dateTime
        ).toLocaleDateString()} ${new Date(
          item.slots.dateTime
        ).toLocaleTimeString()}`,
      };
      newArr.push(data);
    });

    console.log(newArr, "newArr????");
    setSelectedSlotId({ slotId: newArr[0].slotId });
    setSelectedSlotLabel({ label: newArr[0].label });
    setNewUser(newArr[0]);
    setCnsltNote(newArr[0].cnsltNote);
    setInvestigation(newArr[0].investigation);
    setPresMedication(newArr[0].prscMed);
  };

  const getPrescriptionsByDoctorId = async () => {
    const res = await axios.get(
      `${config.backend_URL}/getPrescriptionsByDoctorId/${user?.id}`
    );
    prescriptionTableDataFormatter(res.data.data || []);
  };

  const getSlotsByDoctorId = async () => {
    const res = await axios.get(
      `${config.backend_URL}/getSlotsByDoctorId/${user?.id}`
    );
    dataFormatTable(res.data.data || []);
    // console.log(res.data, "res.data");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErr(false);
    setFlagToCallUpdateAPI(false);
  };

  const handleCLoseEdit = () => {
    setOpen(false);
    setErr(false);
    setFlagToCallUpdateAPI(false);
    resetForm();
  };

  const resetForm = () => {
    setNewUser("");
    setCnsltNote("");
    setInvestigation("");
    setPresMedication("");
    setSelectedSlotId("");
    setSelectedSlotLabel("");
  };

  // ***createPrescription
  const createPrescription = async () => {
    try {
      const payload = {
        slotId: newUser.slotId,
        petId: newUser.petId,
        customerId: newUser.customerId,
        doctorId: newUser.doctorId,
        prscMed: presMedication || null,
        cnsltNote: cnsltNote || null,
        investigation: investigation || null,
      };
      // console.log("payload", payload);

      const res = await axios.post(
        `${config.backend_URL}/addPrescription`,
        payload
      );
      console.log(res.data.data, "res.data.data");
      if (res.data.data) {
        const resp = await axios.put(`${config.backend_URL}/updateSlot`, {
          checkedUp: true,
          id: newUser.slotId,
        });

        if (res.data.data && resp.data.data) {
          getSlotsByDoctorId();
          getPrescriptionsByDoctorId();
          toast.success("Prescription created successfully", {
            theme: "colored",
          });
          resetForm();
          handleClose();
        } else {
          toast.error("Problem at updating slots table", {
            theme: "colored",
          });
        }
      } else {
        toast.error("Problem at updating Prescription table", {
          theme: "colored",
        });
      }
    } catch (err) {
      console.log("Error==", err.message);
      toast.error(err.message, {
        theme: "colored",
      });
    }
  };

  // ***for updating user
  const startEditPrescription = async (data) => {
    try {
      // console.log(data.id, "dATA");
      const res = await axios.get(
        `${config.backend_URL}/getPrescriptionById/${data.id}`
      );
      console.log(res.data.data, "res.data.data>>>");
      setFlagToCallUpdateAPI(true);
      prescriptionTableDataFormatterForUpdate(res.data.data || []);
      // setNewUser(res?.data?.data[0]);
      handleClickOpen();
    } catch (err) {
      console.log("Error ==", err);
    }
  };

  const updatePrescription = async () => {
    try {
      const payload = {
        id: newUser.id,
        slotId: newUser.slotId,
        petId: newUser.petId,
        customerId: newUser.customerId,
        doctorId: newUser.doctorId,
        prscMed: presMedication || null,
        cnsltNote: cnsltNote || null,
        investigation: investigation || null,
      };
      // console.log("payload", payload);
      const resp = await axios.put(
        `${config.backend_URL}/updatePrescription`,
        payload
      );
      // console.log(resp.data.data, "resp.data.data");
      if (resp.data.data) {
        toast.success("Prescription is updated successfully", {
          theme: "colored",
        });
        getSlotsByDoctorId();
        getPrescriptionsByDoctorId();
        handleCLoseEdit();
      } else {
        toast.error("Prescription couldn't be updated", {
          theme: "colored",
        });
      }
    } catch (err) {
      console.log("Error==", err.message);
      toast.error(err.message, {
        theme: "colored",
      });
    }
  };

  // ***for deleting Prescription
  const startDeletePrescription = async (data) => {
    console.log(data, "data");
    const ans = window.prompt(
      `Do you want to delete the prescription for '${data.petName}', '${data.customerName} months', '${data.slotDate}' ? If yes then put 'YES' here and click OK`
    );
    // console.log(ans, "ans");
    // console.log(stateData.user, "stateData.user");
    try {
      if (ans === "YES") {
        const res = await axios.delete(
          `${config.backend_URL}/deletePrescription/${data.id}`
        );
        if (res.data.data) {
          const resp = await axios.put(`${config.backend_URL}/updateSlot`, {
            checkedUp: false,
            id: data.slotId,
          });

          if (res.data.data && resp.data.data) {
            getSlotsByDoctorId();
            getPrescriptionsByDoctorId();
            toast.success("Prescription is deleted successfully", {
              theme: "colored",
            });
          }
          else {
            toast.error("Problem at updating Slots table", {
              theme: "colored",
            });
          }
        }
        else {
          toast.error("Problem at updating Prescriptions table", {
            theme: "colored",
          });
        }
      }
    } catch (err) {
      console.log("Error==", err.message);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      width: 250,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 200,
    },
    {
      field: "customerEmail",
      headerName: "Customer Email",
      width: 200,
    },
    {
      field: "petName",
      headerName: "Pet Name",
      width: 150,
    },
    {
      field: "customerPhone",
      headerName: "Customer Phone",
      width: 200,
    },
    {
      //   field: "picURL",
      headerName: "Picture",
      width: 250,
      renderCell: (params) => {
        // console.log(params, "params");
        return <img src={params.row.picURL} width="150px" />;
      },
    },
    {
      field: "checkedUp",
      headerName: "Customer Checked-Up",
      width: 200,
    },
  ];

  const columnsForPresc = [
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
                startEditPrescription(params.row);
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
                startDeletePrescription(params.row);
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
      field: "slotDate",
      headerName: "Visit Date",
      width: 250,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 250,
    },
    {
      field: "petName",
      headerName: "Pet Name",
      width: 150,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 200,
    },
    {
      field: "customerEmail",
      headerName: "Customer Email",
      width: 200,
    },
    {
      field: "customerPhone",
      headerName: "Customer Phone",
      width: 200,
    },
    {
      field: "cnsltNote",
      headerName: "Consult Note",
      width: 300,
    },
    {
      field: "investigation",
      headerName: "Investigation",
      width: 300,
    },
    {
      field: "prscMed",
      headerName: "Medicine",
      width: 300,
    },
  ];

  return user ? (
    <>
      {/* create a separate component for admin and user profile */}
      <AuthorizedHeader user={user} />
      {/* <div className='doctorDashboardHeading'>{tab === 'Appointments' ? 'Appointments' : 'Prescriptions'}</div> */}
      <div className="dashBoardContainer">
        <div className="optionsDiv">
          <h5>Options</h5>
          <div>
            <div
              className={`options ${tab === "Appointments" ? "activeTab" : ""}`}
              onClick={(e) => {
                setTab("Appointments");
                getSlotsByDoctorId();
              }}
            >
              Appointments
            </div>
            <div
              className={`options ${
                tab === "Prescriptions" ? "activeTab" : ""
              }`}
              onClick={(e) => {
                setTab("Prescriptions");
                getPrescriptionsByDoctorId();
              }}
            >
              Prescriptions
            </div>
          </div>
        </div>
        <div className="pagesDiv">
          <div className="doctorDashboardHeading">
            {tab === "Appointments" ? "Appointments" : "Prescriptions"}
          </div>
          <div className="addPrescriptionBtnContainer">
            {tab === "Appointments" ? null : (
              <Button
                style={{
                  backgroundColor: "DodgerBlue",
                  color: "white",
                  borderRadius: "8px",
                }}
                onClick={handleClickOpen}
              >
                Add Prescription
              </Button>
            )}
            <Dialog
              onClose={flagToCallUpdateAPI ? handleCLoseEdit : handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              fullWidth
              maxWidth={false}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Add Prescription
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={flagToCallUpdateAPI ? handleCLoseEdit : handleClose}
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
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={
                      slotListFormatted.filter(
                        (item, i) => item.checkedUp === false
                      ) || []
                    }
                    getOptionLabel={(option) => option.label || ""}
                    value={selectedSlotLabel || ""}
                    onChange={(e, params) => {
                      console.log(params);
                      setNewUser({ ...params });
                      setSelectedSlotId({ slotId: params?.id || "" });
                      setSelectedSlotLabel({ label: params?.label || "" });
                    }}
                    // style={{width : '50%'}}
                    disabled={flagToCallUpdateAPI}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Pet*" />
                    )}
                  />
                </div>
                <div className="textFieldStyle">
                  <label>Consulted Notes*</label>
                  <TextareaAutosize
                    id="outlined-basic"
                    label="Consulted Notes*"
                    variant="outlined"
                    style={{ width: "100%", height: "20vh" }}
                    value={cnsltNote || ""}
                    onChange={(e) => {
                      setCnsltNote(e.target.value);
                    }}
                  />
                </div>
                <div className="textFieldStyle">
                  <label>Investigation*</label>
                  <TextareaAutosize
                    id="outlined-basic"
                    label="Investigation*"
                    variant="outlined"
                    style={{ width: "100%", height: "20vh" }}
                    value={investigation || ""}
                    onChange={(e) => {
                      setInvestigation(e.target.value);
                    }}
                  />
                </div>
                <div className="textFieldStyle">
                  <label>Prescribed Medication*</label>
                  <TextareaAutosize
                    id="outlined-basic"
                    label="Prescribed Medication*"
                    variant="outlined"
                    style={{ width: "100%", height: "20vh" }}
                    value={presMedication || ""}
                    onChange={(e) => {
                      setPresMedication(e.target.value);
                    }}
                  />
                </div>
              </DialogContent>
              <DialogActions
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  onClick={(e) => {
                    resetForm();
                  }}
                >
                  Reset
                </Button>
                <Button
                  autoFocus
                  onClick={(e) => {
                    if (
                      err ||
                      !selectedSlotLabel ||
                      !cnsltNote ||
                      !investigation ||
                      !presMedication
                    ) {
                      toast.error("Please put all valid details", {
                        theme: "colored",
                      });
                    } else {
                      flagToCallUpdateAPI
                        ? updatePrescription()
                        : createPrescription();
                      // createPrescription();
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
          <div className="tableContainer">
            <Box sx={{ height: 450, width: "95%", margin: "20px" }}>
              {tab === "Appointments" ? (
                <DataGrid
                  rows={slotListFormatted}
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
              ) : (
                <DataGrid
                  rows={allPrescriptions}
                  columns={columnsForPresc}
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
              )}
            </Box>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Footer />
      </div>
    </>
  ) : (
    <>
      <div>401 : You are not authorized to view this page</div>
      <div>
        <Button
          onClick={(e) => {
            navigate("/login");
          }}
          className={classes.formBtn}
        >
          Login
        </Button>
      </div>
    </>
  );
}

export default DoctorProfile;
