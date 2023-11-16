import React, { useState, useEffect } from "react";
import "./BookGroomSlot.css";
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

function BookGroomSlot() {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState("");
  //   console.log(loggedInUser, "loggedInUser");
  const [payloadData, setPayloadData] = useState({
    customerId: "",
    customerName: "",
    petId: "",
    animalId: "",
    animalName: "",
    dateTime: "",
    checkedUp: false,
    checkUpType: "Groom",
  });
  const [animalArr, setAnimalArr] = useState([]);
  const [empList, setEmpList] = useState([]);

  //   console.log(animalArr, "animalArr???>>>>");
    console.log(payloadData, "payloadData???>>>>");

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
          petId: item?.petId,
          animalId: item?.animals?.id,
          animalName: item?.animals?.name,
        };
        arr.push(data);
      });
      setAnimalArr(arr);

      const resp = await axios.get(`${config.backend_URL}/getAllEmployees`);
      setEmpList(resp?.data?.data || []);
    } catch (err) {
      console.log("Error==", err);
    }
  };

  useEffect(() => {
    getLoggedInUserData();
  }, []);

  const addSlots = async () => {
    // console.log(payloadData, "payloadData>>>>");
    try {
      let data = {
        customerId: payloadData.customerId,
        petId: payloadData.petId,
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
        dateTime: "",
        checkedUp: false,
        checkUpType: "Groom",
      });
      toast.success("Groom slot registered", {
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
      <div className="formContainerGroomSlot">
        <div className="appointmentForm">
          <h2>Book A Grooming Slot</h2>
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
              value={"Groom"}
              onChange={(e, params) => {
                // console.log(params);
                setPayloadData({ ...payloadData, checkUpType: params });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select CheckUp Type*" />
              )}
            />
          </div>
          {/* <div className="textFieldStyle">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={empList || []}
              getOptionLabel={(options) =>
                options.name || options.empName || ""
              }
              // sx={{ width: 1000 }}
              value={payloadData || ""}
              onChange={(e, params) => {
                // console.log(params);
                setPayloadData({
                  ...payloadData,
                  empName: params?.name,
                  empId: params?.id,
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select emp*" />
              )}
            />
          </div> */}
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
                if (
                  payloadData.customerId &&
                  payloadData.customerName &&
                  payloadData.petId &&
                  payloadData.checkUpType &&
                  payloadData.dateTime
                ) {
                  addSlots();
                } else {
                  toast.error("Please fill all the fields", {
                    theme: "colored",
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
            We Provide Grooming Services Also

        </div>
        <div className="checkUpImg">
            <img src="https://media.istockphoto.com/id/1068118124/photo/professional-cares-for-a-dog-in-a-specialized-salon-groomers-holding-tools-at-the-hands.jpg?s=612x612&w=0&k=20&c=GIULBrZSjpT-HrHFfSwE6qjR_unw9lRuRkauu4gWDZE=" alt="" height='500px' style={{boxShadow: '1px 1px 10px 5px rgb(156, 150, 150)'}}/>
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
    </>
  );
}

export default BookGroomSlot;
