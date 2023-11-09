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

  const dataFormatTable = (arr) => {
    setSlotListRaw(arr || []);
    let newArray = [];
    arr.forEach((item, i) => {
      let data;
      data = {
        id : item.id,
        customerName : item.customers.name,
        customerEmail : item.customers.email,
        customerPhone : item.customers.phone,
        petName : item.pets.animals.name,
        picURL : item.pets.animals.picURL,
        appointmentDate : `${new Date(item.dateTime).toLocaleDateString()} ${new Date(item.dateTime).toLocaleTimeString()}`
      };
      newArray.push(data);
    });
    setSlotListFormatted(newArray || []);
  }

  // getting token
  const getUserData = async () => {
    try {
      // const resp = await axios.get(`${config.backend_URL}/getLoggedInUser`);
      const tokenData = JSON.parse(localStorage.getItem("token"));
      console.log(JSON.parse(localStorage.getItem("token")), "user");
      setUser(tokenData || "");
      if(tokenData)
      {
        const res = await axios.get(`${config.backend_URL}/getSlotsByDoctorId/${tokenData?.id}`);
        // console.log(res.data, "res.data");
        dataFormatTable(res.data.data || [])
      }
    } catch (err) {
      console.log("Error==", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);


  const getSlotsByDoctorId = async() => {
    const res = await axios.get(`${config.backend_URL}/getSlotsByDoctorId/${user?.id}`);
    dataFormatTable(res.data.data || [])
    // console.log(res.data, "res.data");
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
        return (
            <img src={params.row.picURL} width='150px'/>
        )
    }
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
          <div className="tableContainer">
            <Box sx={{ height: 450, width: "95%", margin:'20px' }}>
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
            </Box>
          </div>
        </div>
      </div>
      <div  style={{marginTop : '20px'}}>
        <Footer/>
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
