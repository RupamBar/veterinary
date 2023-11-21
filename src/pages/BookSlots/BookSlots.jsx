import React, { useState, useEffect } from "react";
import "./BookSlots.css";
import AuthorizedHeader from "../../components/Header/AuthorizedHeader";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import config from "../../config.json";
// import { DateTimePicker } from '@mui/x-date-pickers';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { toast } from "react-toastify";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function BookSlots() {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState("");
  //   console.log(loggedInUser, "loggedInUser");
  const [payloadData, setPayloadData] = useState({
    customerId: "",
    customerName: "",
    petId: "",
    animalId: "",
    animalName: "",
    doctorId: "",
    doctorName: "",
    dateTime: "",
    checkedUp: false,
    checkUpType: "Doctor",
  });
  const [animalArr, setAnimalArr] = useState([]);
  const [doctorList, setDoctorList] = useState([]);

  //   console.log(animalArr, "animalArr???>>>>");
  //   console.log(payloadData, "payloadData???>>>>");

  const getLoggedInUserData = async () => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("token"));
      setLoggedInUser(tokenData || "");
      setPayloadData({
        ...payloadData,
        customerId: tokenData.id,
        customerName: tokenData.name,
      });

      const res = await axios.get(
        `${config.backend_URL}/getAllPetsByCustomerId/${tokenData?.id}`
      );
      //   console.log(res.data.data, "res.data.data");

      let arr = [];
      res?.data?.data.forEach((item, i) => {
        let data = {
          petId: item?.id,
          animalId: item?.animals?.id,
          animalName: item?.animals?.name,
        };
        arr.push(data);
      });
      setAnimalArr(arr);

      const resp = await axios.get(`${config.backend_URL}/getAllDoctors`);
      setDoctorList(resp?.data?.data || []);
    } catch (err) {
      console.log("Error==", err);
    }
  };

  useEffect(() => {
    getLoggedInUserData();
  }, []);

  const addSlots = async () => {
    try {
      let data = {
        customerId: payloadData.customerId,
        petId: payloadData.petId,
        doctorId: payloadData.doctorId,
        dateTime: payloadData.dateTime,
        checkedUp: payloadData.checkedUp,
        checkUpType: payloadData.checkUpType,
      };
      const res = await axios.post(`${config.backend_URL}/addSlot`, data);
      setPayloadData({
        ...payloadData,
        petId: "",
        animalId: "",
        animalName: "",
        doctorId: "",
        doctorName: "",
        dateTime: "",
        checkedUp: false,
        checkUpType: "Doctor",
      });
      toast.success("Appointment registered", {
        theme: "colored",
      });
    } catch (err) {
      console.log("Error ==", err.message);
    }
  };

  return (
    <>
      {
        loggedInUser?.id ? <AuthorizedHeader user={loggedInUser} /> : <Header />
      }
      {
        loggedInUser?.id ? 
        <div className="formContainerSlot">
        <div className="appointmentForm">
          <h2>Book An Appointment</h2>
          <div className="textFieldStyle">
            <TextField
              id="outlined-basic"
              label="Name*"
              variant="outlined"
              style={{ width: "100%" }}
              disabled
              value={payloadData.customerName || ""}
              onChange={(e) => {
                setPayloadData({
                  ...payloadData,
                  customerName: e.target.value,
                });
              }}
            />
          </div>
          <div className="textFieldStyle">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={animalArr || []}
              getOptionLabel={(options) => options.animalName || ""}
              // sx={{ width: 1000 }}
              value={payloadData || ""}
              onChange={(e, params) => {
                // console.log(params);
                setPayloadData({
                  ...payloadData,
                  petId: params?.petId,
                  animalId: params?.animalId,
                  animalName: params?.animalName,
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Pet*" />
              )}
            />
          </div>
          <div className="textFieldStyle">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={["Doctor", "Groom"]}
              // sx={{ width: 1000 }}
              disabled
              value={"Doctor"}
              onChange={(e, params) => {
                // console.log(params);
                setPayloadData({ ...payloadData, checkUpType: params });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select CheckUp Type*" />
              )}
            />
          </div>
          <div className="textFieldStyle">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={doctorList || []}
              getOptionLabel={(options) =>
                options.name || options.doctorName || ""
              }
              // sx={{ width: 1000 }}
              value={payloadData || ""}
              onChange={(e, params) => {
                // console.log(params);
                setPayloadData({
                  ...payloadData,
                  doctorName: params?.name,
                  doctorId: params?.id,
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Doctor*" />
              )}
            />
          </div>
          <div className="textFieldStyle">
            <TextField
              type="datetime-local"
              id="outlined-basic"
              variant="outlined"
              style={{ width: "100%" }}
              value={payloadData.dateTime || ""}
              onChange={(e) => {
                setPayloadData({
                  ...payloadData,
                  dateTime: e.target.value,
                });
              }}
            />
          </div>
          <div className="btnContainer">
            <Button
              style={{
                backgroundColor: "dodgerblue",
                color: "white",
                padding: "10px 20px",
              }}
              onClick={(e) => {
                e.preventDefault();
                if(payloadData.customerId && payloadData.customerName && payloadData.petId && payloadData.doctorId && payloadData.doctorName && payloadData.checkUpType && payloadData.dateTime)
                {
                    addSlots();
                }
                else
                {
                  console.log(payloadData, "payloadData11");
                    toast.error('Please fill all the fields', {
                        theme : 'colored'
                    });
                }
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      :
      <div className="unAuthPage">
        <div className="pageContent">
            We Provide Doctor Appointment Also

        </div>
        <div className="checkUpImg">
            <img src="https://img.freepik.com/premium-photo/vet-happy-nurse-with-dog-nature-doing-medical-healthcare-checkup-charity-work-homeless-animals-smile-doctor-veterinarian-loves-nursing-working-helping-dogs-puppy-pets_590464-102468.jpg?w=2000" alt="" height='500px' style={{boxShadow: '1px 1px 10px 5px rgb(156, 150, 150)'}}/>
        </div>
        <div>
            <Button style={{
                color:'white',
                backgroundColor : 'dodgerblue',
            }}
            onClick={(e) => navigate('/login')}
            >
                Login to book a Slot
            </Button>
        </div>
      </div>
      }
      <div style={{marginTop:'20px'}}>
        <Footer />
      </div>
    </>
  );
}

export default BookSlots;
