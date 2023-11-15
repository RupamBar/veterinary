import React, { useState, useEffect } from "react";
import "./Dogs.css";
import AuthorizedHeader from "../../components/Header/AuthorizedHeader";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, TextField } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import axios from "axios";
import config from "../../config.json";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Badge from "@mui/material/Badge";

function Dogs() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [allAnimalList, setAllAnimalList] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);
  const [addedProductIds, setAddedProductIds] = useState([]);

  // console.log(addedToCart, "addedToCart");
  // console.log(addedProductIds, "addedProductIds");

  const getTokenData = () => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("token"));
      if (tokenData) {
        setUser(tokenData);
      }
    } catch (err) {
      console.log("Error==", err.message);
    }
  };

  const getCartProducts = () => {
    const cartToken = JSON.parse(localStorage.getItem("cart"));
    // console.log(cartToken, "cartToken");
    cartToken?.forEach((item, i) => {
      if (item?.id === user?.id) {
        setAddedToCart(item?.products || []);
        let idArr = [];
        item?.products.forEach((item, i) => {
          idArr.push(item.id);
        });
        setAddedProductIds(idArr || []);
        return;
      }
    });
  };

  const getAllDogs = async () => {
    try {
      const res = await axios.get(
        `${config.backend_URL}/getAllAnimalsByType/Dog`
      );
      setAllAnimalList(res.data.data || []);
    } catch (err) {
      console.log("Error == ", err.message);
    }
  };

  useEffect(() => {
    getTokenData();
    getAllDogs();
  }, []);

  useEffect(() => {
    getCartProducts();
  }, [user]);

  const getFilteredAnimalList = async (txt) => {
    try {
      const res = await axios.get(
        `${config.backend_URL}/getAllAnimalsByFilter/Dog/${txt}`
      );
      setAllAnimalList(res.data.data || []);
    } catch (err) {
      console.log("Error == ", err.message);
    }
  };

  const searchAnimalByName = async (val) => {
    try {
      const res = await axios.get(
        `${config.backend_URL}/searchAnimalByName/Dog/${val}`
      );
      setAllAnimalList(res.data.data || []);
    } catch (err) {
      console.log("Error ==", err.message);
    }
  };

  const addToCart = (item, i) => {
    let data = [...addedToCart];
    item.type = "animal";
    item.quantity = 1;
    data.push(item);
    setAddedToCart(data);

    let idArr = [...addedProductIds];
    idArr.push(item.id);
    setAddedProductIds(idArr);

    let usersCart = {
      id: user?.id || "",
      products: data,
    };

    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    let flag = 0;

    cartData?.forEach((item, i) => {
      if (item?.id === user?.id) {
        flag = 1;
        item.products = data;
      }
    });

    if (flag === 0) {
      cartData?.push(usersCart);
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  return (
    <div>
      {user.userType ? <AuthorizedHeader user={user} /> : <Header />}
      <div className="foodListContainer">
        <span
          style={{ cursor: "pointer", color: "dodgerblue" }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Home
        </span>
        <span style={{ cursor: "pointer" }}>&nbsp;&gt;&nbsp;Dogs</span>
      </div>
      <div className="foodListContainer">
        <div className="headingNSearch">
          <h1 className="foodContainerHeading">Dog Collections</h1>
          <div>
            <TextField
              id="standard-basic"
              label="Search by Name"
              variant="outlined"
              autoComplete={false}
              style={{
                width: "20vw",
              }}
              onChange={(e) => {
                if (e.target.value) {
                  searchAnimalByName(e.target.value);
                } else {
                  getAllDogs();
                }
              }}
            />
          </div>
        </div>
        <div className="listPageStyle">
          <div className="leftFilterContainer">
            <div className="filterText">Filters</div>
            <div className="accordionContainer">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Price</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="asc"
                        control={<Radio />}
                        label="Low to High"
                        onClick={(e) => {
                          getFilteredAnimalList("asc");
                        }}
                      />
                      <FormControlLabel
                        value="desc"
                        control={<Radio />}
                        label="High to Low"
                        onClick={(e) => {
                          getFilteredAnimalList("desc");
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div className="cardsContainer">
            {allAnimalList.map((item, i) => {
              return (
                <div key={i} className="card">
                  <div className="imageContainer">
                    <img
                      src={item?.picURL}
                      alt=""
                      width="150px"
                      className="productImg"
                    />
                  </div>
                  <h5 className="productName">{item?.name}</h5>
                  <div className="productPrice">
                    {/* <div className="counter">
                        <div>
                            <button style={{border:'1px solid dodgerBlue', width:'30px', borderRadius:'10px'}}>-</button>
                        </div>
                        <div>{}</div>
                        <div>
                            <button style={{border:'1px solid dodgerBlue', width:'30px', borderRadius:'10px'}}>+</button>
                        </div>
                    </div> */}
                    <div>
                      <del className="delText">Rs.{item?.price + 1896}</del>Rs.
                      {item?.price}
                    </div>
                  </div>
                  <div className="cartBtn">
                    {item.count !== 0 ? (
                      !addedProductIds.includes(item.id) ? (
                        <Button
                          style={{
                            backgroundColor: "#ff1548",
                            color: "white",
                            borderRadius: "20px",
                            padding: "5px 20px",
                          }}
                          onClick={(e) => {
                            if(user)
                            {
                                addToCart(item, i);
                            }
                            else
                            {
                                if(window.confirm("To proceed you need to login first."))
                                {
                                    navigate('/login');
                                }
                            }
                          }}
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <Button>
                          <DoneAllIcon style={{ color: "#39FF14" }} />
                          Added to cart
                        </Button>
                      )
                    ) : (
                      <div className="outOfStockText">Out of Stock</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Floting add to cart */}
      {user ? <Box
        sx={{ "& > :not(style)": { m: 1 } }}
        style={{
          position: "fixed",
          width: "100px",
          height: "100",
          right: "0px",
          bottom: "0px",
        }}
      >
        <Badge badgeContent={addedToCart.length || 0} color="error" size='large'>
        <Fab style={{ backgroundColor: "#f5d038" }} aria-label="add">
            <ShoppingCartIcon />
        </Fab>
        </Badge>
      </Box> : null}
    </div>
  );
}

export default Dogs;
