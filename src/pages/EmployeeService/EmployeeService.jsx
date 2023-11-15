import React, { useEffect, useState } from "react";
import AuthorizedHeader from "../../components/Header/AuthorizedHeader";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import config from "../../config.json";
import "./EmployeeService.css";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Footer from "../../components/Footer/Footer";

function EmployeeService() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState("");
  const [tab, setTab] = useState("Appointments");
  const [groomData, setGroomData] = useState([]);
  const [allPendingSlots, setAllPendingSlots] = useState([]);
  const [selectedPendingSlot, setSelectedPendingSlot] = useState("");
  const [allAssetsList, setAllAssetsList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(1);

  const [selectedProductsArr, setSelectedProductsArr] = useState([
    {
      product: null,
      quantity: 1,
      err : false,
    },
  ]);

  //   console.log(selectedProductsArr,"selectedProductsArr");

  // getting token
  const getUserData = async () => {
    try {
      // const resp = await axios.get(`${config.backend_URL}/getLoggedInUser`);
      const tokenData = JSON.parse(localStorage.getItem("token"));
      console.log(JSON.parse(localStorage.getItem("token")), "user");
      setUser(tokenData || "");
      const res = await axios.get(
        `${config.backend_URL}/getEmployeeByEmpCode/${tokenData.empCode}`
      );
      setUserData(res.data.data[0] || {});

      //fetching groom data by empId
      const resp = await axios.get(`${config.backend_URL}/getGroomDataByEmpId/${res.data.data[0].id}`);
        // console.log(resp.data.data, "resp.data.data");
        resp.data.data.forEach(async(item, i) => {
            item.appointmentDate = `${new Date(item.slots.dateTime).toLocaleDateString()} ${new Date(
              item.slots.dateTime
            ).toLocaleTimeString()}`;
            item.groomedOn = `${new Date(item.created_at).toLocaleDateString()} ${new Date(
              item.created_at
            ).toLocaleTimeString()}`;
            item.customerName = item.customers.name;
            item.customerEmail = item.customers.email;
            item.petName = item.pets.animals.name;
            item.customerPhone = item.customers.phone;
            item.checkedUp = item.slots.checkedUp;

            let arr = JSON.parse(item.productsUsed);
            var data = [];
            arr.forEach((items, j) => {
                data.push(items.assetId);
            })
            const respo = await axios.post(`${config.backend_URL}/getAssetsByIds`, data);
            console.log(respo.data.data, "respo.data.data");
            respo.data.data.forEach((itemss, k) => {
                k === 0 ? item.productsUsedFormatted = `${itemss.name} : ${arr[k].count},\n` : item.productsUsedFormatted += `${itemss.name} : ${arr[k].count},\n`
            });
          });          
        setGroomData(resp.data.data || []);
    } catch (err) {
      console.log("Error==", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getAllPendingSlotsForGroom = async () => {
    try {
      const res = await axios.get(
        `${config.backend_URL}/getAllPendingSlotsForGroom`
      );
      // console.log(res.data.data, "res.data.data");
      // setAllPendingSlots(res.data.data || []); // raw data
      let newArr = [];
      res.data.data.forEach((item, i) => {
        item.label = `${item.pets.animals.name}, ${
          item.customers.name
        }, ${new Date(item.dateTime).toLocaleDateString()} ${new Date(
          item.dateTime
        ).toLocaleTimeString()}`;
      });
      //   console.log(res.data.data, "res.data.data");
      setAllPendingSlots(res.data.data || []);
    } catch (err) {
      console.log("Error ==", err.message);
    }
  };

  const getAllAssets = async () => {
    try {
      const res = await axios.get(`${config.backend_URL}/getAllAssets`);
      console.log(res.data.data, "res.data.data for Assets");
      setAllAssetsList(res.data.data || []);
    } catch (err) {
      console.log("Error ==", err.message);
    }
  };

  const resetPage = () => {
    setSelectedProductsArr([
        {
          product: null,
          quantity: 1,
          err : false,
        },
    ]);
    setTotalPrice(0);
    setTotalCount(1);
    setSelectedPendingSlot("");
    getAllPendingSlotsForGroom();
    getAllAssets();
    // setTab("Appointments");
  };

  const addGroomingData = async () => {
    try
    {
        selectedProductsArr.forEach((item, i) => {
            if(!item.product || item.err || !item.quantity)
            {
                toast.error("Fill all required fields with correct data", {
                    theme: "colored",
                  });
                  return ;
            }
        });
        if (
          selectedPendingSlot.id &&
          totalPrice &&
          totalPrice > 0
          
        ) {
          // insert data into db
        //   console.log(selectedPendingSlot, "selectedPendingSlot");
        //   console.log(selectedProductsArr, "selectedProductsArr");
        //   console.log(userData, "userData");
        //   console.log(totalPrice, "totalPrice");
          let str = [];
          selectedProductsArr.forEach((item, i) => {
            str.push({
                assetId : item?.product?.id,
                count : item?.quantity
            })
          });
          let payload = {
            empId : userData.id,
            petId : selectedPendingSlot.pets.petId,
            customerId : selectedPendingSlot.customers.id,
            slotId : selectedPendingSlot.id,
            totalAmount : totalPrice,
            productsUsed : JSON.stringify(str),
          };
    
        //   console.log(payload, "payload");
          const res = await axios.post(`${config.backend_URL}/createGroomEntry`, payload);

          selectedProductsArr.forEach(async(item, i) => {
            let data = {
                id : item?.product?.id,
                count : item?.product?.count - item?.quantity,
            };
            const resp = await axios.put(`${config.backend_URL}/updateAsset`, data);
            // console.log(resp.data.data, "resp.data.data");
          });

          const respo = await axios.put(`${config.backend_URL}/updateSlot`, {
            checkedUp: true,
            id: selectedPendingSlot.id,
            empId : userData.id,
          });
          toast.success("Groom entry created successfully", {
            theme: "colored",
          });
          resetPage();
    
        } else {
          toast.error("Fill all required fields with correct data", {
            theme: "colored",
          });
        }
    }
    catch(err)
    {
        console.log("Error ==", err.message);
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
        field: "groomedOn",
        headerName: "Groomed on",
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
        field : "totalAmount",
        headerName: "Amount",
        width: 100,
    },
    {
        field : "productsUsedFormatted",
        headerName: "Product Used",
        width: 300,
        // renderCell: (params) => {
        //     // console.log(JSON.parse(params?.row?.productsUsed), "params");
            
        //     return "Data";
        // },
    },
    {
      field: "checkedUp",
      headerName: "Customer Checked-Up",
      width: 200,
    },
  ];

  return user ? (
    <div>
      <AuthorizedHeader user={user} />
      <div className="dashBoardContainer">
        <div className="optionsDiv">
          <h5>Options</h5>
          <div>
            <div
              className={`options ${tab === "Appointments" ? "activeTab" : ""}`}
              onClick={(e) => {
                setTab("Appointments");
                // getSlotsByDoctorId();
                getUserData();
              }}
            >
              Completed Appointments
            </div>
            <div
              className={`options ${tab === "Receipts" ? "activeTab" : ""}`}
              onClick={(e) => {
                setTab("Receipts");
                getAllPendingSlotsForGroom();
                getAllAssets();
              }}
            >
              Add Receipts
            </div>
          </div>
        </div>
        <div className="pagesDiv">
          <div className="doctorDashboardHeading">
            {tab === "Appointments" ? "Completed Appointments" : "Add Receipts"}
          </div>
          <div className="tableContainer">
            <Box sx={{ height: 450, width: "95%", margin: "20px" }}>
              {tab === "Appointments" ? (
                <DataGrid
                  rows={groomData || []}
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
                <div className="formContainer">
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    '*' fields are mandatory
                  </div>
                  <div className="addFormContainer">
                    <div className="leftForm">
                      <div className="textFieldStyle">
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={allPendingSlots || []}
                          getOptionLabel={(option) => option.label || ""}
                          value={selectedPendingSlot || ""}
                          onChange={(e, params) => {
                            // console.log(params);
                            setSelectedPendingSlot({ ...params });
                            // setNewUser({ ...params });
                            // setSelectedSlotId({ slotId: params?.id || "" });
                            // setSelectedSlotLabel({ label: params?.label || "" });
                          }}
                          // style={{width : '50%'}}
                          // disabled={flagToCallUpdateAPI}
                          renderInput={(params) => (
                            <TextField {...params} label="Select Pet*" />
                          )}
                        />
                      </div>
                      {selectedProductsArr.map((item, i) => {
                        return (
                          <div className="textFieldStyle eachRow">
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={allAssetsList || []}
                              getOptionLabel={(option) => option.name || ""}
                              value={selectedProductsArr[i].product || ""}
                              onChange={(e, params) => {
                                let arr = [...selectedProductsArr];
                                arr[i].product = params;
                                setSelectedProductsArr([...arr]);
                                //counting amount
                                var total = 0;
                                var tCount = 0;
                                selectedProductsArr.forEach((item, i) => {
                                  total +=
                                    item?.product?.price * item?.quantity;
                                
                                    tCount += parseInt(item?.quantity);
                                });
                                setTotalPrice(total);
                                setTotalCount(tCount);
                              }}
                              style={{ width: "40%", marginRight: "10px" }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select Product*"
                                />
                              )}
                            />
                            <TextField
                              id="outlined-basic"
                              label="Quantity*"
                              variant="outlined"
                              type="number"
                              disabled={!selectedProductsArr[i].product}
                              style={{ width: "40%", marginRight: "10px" }}
                              value={selectedProductsArr[i].quantity || ""}
                              onChange={(e) => {
                                console.log(e.target.value);
                                let arr = [...selectedProductsArr];
                                arr[i].quantity = e.target.value;
                                setSelectedProductsArr([...arr]);
                                //counting amount
                                var total = 0;
                                var tCount = 0;
                                selectedProductsArr.forEach((item, i) => {
                                  total +=
                                    item?.product?.price * item?.quantity;
                                  tCount += parseInt(item?.quantity);
                                });
                                setTotalPrice(total);
                                setTotalCount(tCount);
                                if (
                                  e.target.value >
                                  selectedProductsArr[i]?.product?.count
                                ) {
                                    let arr = [...selectedProductsArr];
                                    arr[i].err = true;
                                    setSelectedProductsArr([...arr]);
                                } else {
                                    let arr = [...selectedProductsArr];
                                    arr[i].err = false;
                                    setSelectedProductsArr([...arr]);
                                }
                              }}
                            />
                            {selectedProductsArr[i].err ? (
                              <small style={{color : 'red'}}>Quantity is out of stock</small>
                            ) : null}
                            {i === 0 ? null : (
                              <CancelIcon
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                  let arr = [...selectedProductsArr];
                                  arr.splice(i, 1);
                                  setSelectedProductsArr([...arr]);
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                      <div className="textFieldStyle">
                        <div className="circleIcon">
                          <AddCircleIcon
                            style={{ color: "dodgerblue", cursor: "pointer" }}
                            onClick={(e) => {
                              let data = [...selectedProductsArr];
                              data.push({
                                product: null,
                                quantity: 1,
                                err : false,
                              });
                              setSelectedProductsArr([...data]);
                            }}
                          />
                        </div>
                      </div>
                      <div className="textFieldStyle">
                        <Button
                          style={{
                            backgroundColor: "dodgerblue",
                            color: "white",
                            marginRight : '10px'
                          }}
                          onClick={(e) => {
                            addGroomingData();
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          onClick={(e) => {
                            // addGroomingData();
                            resetPage();
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                    <div className="rightCost">
                      <h4>Total Cost:</h4>
                      <table width='100%'>
                        <tr 
                        // className="tableClass"
                        >
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        {/* <tr> */}
                            {selectedProductsArr.map((item, i) => {
                            return (
                                <tr 
                                // className="rowClass"
                                >
                                <td>{item?.product?.name}</td>
                                <td>{item?.quantity}</td>
                                <td>
                                    {item?.quantity * item?.product?.price || 0}
                                </td>
                                </tr>
                            );
                            })}
                        {/* </tr> */}
                        <tr 
                        // className="tableClassTotal"
                        >
                            <th>Total</th>
                            <th>{totalCount || 1}</th>
                            <th>{totalPrice || 0}</th>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </Box>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  ) : (
    <>
      <div>401 : You are not authorized to view this page</div>
      <div>
        <Button
          onClick={(e) => {
            navigate("/");
          }}
        >
          Verify as an Employee first
        </Button>
      </div>
    </>
  );
}

export default EmployeeService;
