import React, { useState, useEffect } from "react";
import "./AddToCart.css";
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
import { toast } from "react-toastify";

function AddToCart() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [addedToCart, setAddedToCart] = useState([]);
  const [addedProductIds, setAddedProductIds] = useState([]);

  const [addedFoods, setAddedFoods] = useState([]);
  const [addedAnimals, setAddedAnimals] = useState([]);
  const [addedMedicines, setAddedMedicines] = useState([]);
  const [addedAssets, setAddedAssets] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);

  const [err, setErr] = useState(false);

  //   console.log(addedToCart, "addedToCart");
  //   console.log(addedProductIds, "addedProductIds");

  //     console.log(addedFoods, "addedFoods");
  //   console.log(addedAnimals, "addedAnimals");
  //   console.log(addedMedicines, "addedMedicines");
  //   console.log(addedAssets, "addedAssets");

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

  const getCartProducts = async () => {
    const cartToken = JSON.parse(localStorage.getItem("cart"));
    // console.log(cartToken, "cartToken");
    cartToken?.forEach(async (item, i) => {
      try {
        if (item?.id === user?.id) {
          setAddedToCart(item?.products || []);

          //collecting ID of all product
          let idArr = [];
          item?.products.forEach((item, i) => {
            idArr.push(item.id);
          });
          setAddedProductIds(idArr || []);

          // collecting ID of food only
          let foodIdArr = [];
          item?.products.forEach((item, i) => {
            if (item?.type === "food") {
              foodIdArr.push(item.id);
            }
          });
          const res1 = await axios.post(
            `${config.backend_URL}/getFoodsByIDs`,
            foodIdArr
          );
          res1.data.data.forEach((item, i) => {
            item.type = "food";
            item.quantity = 1;
            item.left = item.count ? item.count - item.quantity : item.count;
          });
          setAddedFoods(res1.data.data || []);

          // collecting ID of animal only
          let animalIdArr = [];
          item?.products.forEach((item, i) => {
            if (item?.type === "animal") {
              animalIdArr.push(item.id);
            }
          });
          const res2 = await axios.post(
            `${config.backend_URL}/getAnimalsByIDs`,
            animalIdArr
          );
          res2.data.data.forEach((item, i) => {
            item.type = "animal";
            item.quantity = 1;
            item.left = item.count ? item.count - item.quantity : item.count;
          });
          setAddedAnimals(res2.data.data || []);

          // collecting ID of medicine only
          let medicineIdArr = [];
          item?.products.forEach((item, i) => {
            if (item?.type === "medicine") {
              medicineIdArr.push(item.id);
            }
          });
          const res3 = await axios.post(
            `${config.backend_URL}/getMedicinesByIDs`,
            medicineIdArr
          );
          res3.data.data.forEach((item, i) => {
            item.type = "medicine";
            item.quantity = 1;
            item.left = item.count ? item.count - item.quantity : item.count;
          });
          setAddedMedicines(res3.data.data || []);

          // collecting ID of asset only
          let assetIdArr = [];
          item?.products.forEach((item, i) => {
            if (item?.type === "asset") {
              assetIdArr.push(item.id);
            }
          });
          const res4 = await axios.post(
            `${config.backend_URL}/getAssetsByIDs`,
            medicineIdArr
          );
          res4.data.data.forEach((item, i) => {
            item.type = "asset";
            item.quantity = 1;
            item.left = item.count ? item.count - item.quantity : item.count;
          });
          setAddedAssets(res4.data.data || []);
          return;
        }
      } catch (err) {
        console.log("Error==", err.message);
      }
    });
  };

  useEffect(() => {
    getTokenData();
  }, []);

  useEffect(() => {
    getCartProducts();
  }, [user]);

  const decreaseQuantity = (str, item, i) => {
    console.log(item.quantity, "count");
    if (item.quantity === 1) {
      toast.error("Minimum limit reached", {
        theme: "colored",
      });
    } else {
      if (str === "food") {
        let data = [...addedFoods];
        data[i].quantity -= 1;
        data[i].left += 1;
        setAddedFoods([...data]);
      } else if (str === "animal") {
        let data = [...addedAnimals];
        data[i].quantity -= 1;
        data[i].left += 1;
        setAddedAnimals([...data]);
      } else if (str === "medicine") {
        let data = [...addedMedicines];
        data[i].quantity -= 1;
        data[i].left += 1;
        setAddedMedicines([...data]);
      } else if (str === "asset") {
        let data = [...addedAssets];
        data[i].quantity -= 1;
        data[i].left += 1;
        setAddedAssets([...data]);
      }
    }
  };

  const increaseQuantity = (str, item, i) => {
    if (item.count === item.quantity) {
      toast.error("Maximum limit reached", {
        theme: "colored",
      });
    } else {
      if (str === "food") {
        let data = [...addedFoods];
        data[i].quantity += 1;
        data[i].left -= 1;
        setAddedFoods([...data]);
      } else if (str === "animal") {
        let data = [...addedAnimals];
        data[i].quantity += 1;
        data[i].left -= 1;
        setAddedAnimals([...data]);
      } else if (str === "medicine") {
        let data = [...addedMedicines];
        data[i].quantity += 1;
        data[i].left -= 1;
        setAddedMedicines([...data]);
      } else if (str === "asset") {
        let data = [...addedAssets];
        data[i].quantity += 1;
        data[i].left -= 1;
        setAddedAssets([...data]);
      }
    }
  };

  const removeProduct = (str, item, i) => {
    if (str === "food") {
      let data = [...addedFoods];
      data.splice(i, 1);
      setAddedFoods([...data]);
    } else if (str === "animal") {
      let data = [...addedAnimals];
      data.splice(i, 1);
      setAddedAnimals([...data]);
    } else if (str === "medicine") {
      let data = [...addedMedicines];
      data.splice(i, 1);
      setAddedMedicines([...data]);
    } else if (str === "asset") {
      let data = [...addedAssets];
      data.splice(i, 1);
      setAddedAssets([...data]);
    }

    console.log(addedToCart, "addedToCart");
    let prdArr = [...addedToCart];
    prdArr = prdArr.filter((item1, i1) => item1.id !== item.id);
    setAddedToCart([...prdArr]);

    const cartToken = JSON.parse(localStorage.getItem("cart"));
    cartToken?.forEach(async (item, i) => {
      if (item?.id === user?.id) {
        item.products = prdArr;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cartToken));
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    addedFoods.forEach((item, i) => {
      totalAmount += item.price * item.quantity;
    });
    addedAnimals.forEach((item, i) => {
      totalAmount += item.price * item.quantity;
    });
    addedMedicines.forEach((item, i) => {
      totalAmount += item.price * item.quantity;
    });
    addedAssets.forEach((item, i) => {
      totalAmount += item.price * item.quantity;
    });
    setTotalAmount(totalAmount || 0);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [addedFoods, addedAnimals, addedMedicines, addedAssets]);

  const buyProducts = async () => {
    try {
      let receiptsData = [];
      addedFoods.forEach(async (item, i) => {
        // const res = await axios.post(`${config.backend_URL}/buyProducts/foods`, item);
        receiptsData.push({
          customerId: user.id,
          productId: item.id,
          quantity: item.quantity,
          amountPaid: item.price * item.quantity,
        });
        const res = await axios.post(
          `${config.backend_URL}/buyProducts/foods`,
          item
        );
        const resp = await axios.post(`${config.backend_URL}/addReceipts`, {
          customerId: user.id,
          productId: item.id,
          quantity: item.quantity,
          amountPaid: item.price * item.quantity,
        });
      });
      receiptsData = [];
      addedAnimals.forEach(async (item, i) => {
        // const res = await axios.post(`${config.backend_URL}/buyProducts/animals`, item);
        receiptsData.push({
          customerId: user.id,
          animalId: item.id,
        });
        const res = await axios.post(
          `${config.backend_URL}/buyProducts/animals`,
          item
        );
        const resp = await axios.post(`${config.backend_URL}/addPets`, {
          customerId: user.id,
          animalId: item.id,
        });
      });
      receiptsData = [];
      addedMedicines.forEach(async (item, i) => {
        // const res = await axios.post(`${config.backend_URL}/buyProducts/medicines`, item);
        receiptsData.push({
          customerId: user.id,
          medicineId: item.id,
        });
        const res = await axios.post(
          `${config.backend_URL}/buyProducts/medicines`,
          item
        );
        const resp = await axios.post(
          `${config.backend_URL}/addSoldMedicines`,
          {
            customerId: user.id,
            medicineId: item.id,
          }
        );
      });
      receiptsData = [];
      addedAssets.forEach(async (item, i) => {
        // const res = await axios.post(`${config.backend_URL}/buyProducts/assets`, item);
        receiptsData.push({
          customerId: user.id,
          assetId: item.id,
        });
        const res = await axios.post(
          `${config.backend_URL}/buyProducts/assets`,
          item
        );
        const resp = await axios.post(`${config.backend_URL}/addSoldAssets`, {
          customerId: user.id,
          assetId: item.id,
        });
      });
      // console.log(receiptsData.length, "receiptsData????");
      // const resData = await axios.post(`${config.backend_URL}/addReciepts`, receiptsData);
      toast.success("Order Placed Successfully", {
        theme: "colored",
      });

      let cartToken = JSON.parse(localStorage.getItem("cart"));
      cartToken = cartToken?.filter((item1, i1) => item1.id !== user?.id);
      localStorage.setItem("cart", JSON.stringify(cartToken));
      getCartProducts();
      navigate("/profile");
    } catch (err) {
      console.log("Error==", err.message);
    }
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
        <span style={{ cursor: "pointer" }}>&nbsp;&gt;&nbsp;Add to Cart</span>
      </div>
      <div className="foodListContainer">
        <div className="headingNSearch">
          <h1 className="foodContainerHeading">Your Cart</h1>
        </div>
        {/* Cart products list */}
        <div className="cartMainDiv">
          {totalAmount ? (
            <div className="productsContainer">
              {/* product details */}
              {/* Foods */}
              {addedFoods.map((item, i) => {
                return (
                  <div className="productsDetails">
                    <div>
                      <div style={{ width: "200px" }}>{item?.name}</div>
                      <div>
                        <img
                          src={item?.picURL}
                          alt=""
                          width="70px"
                          className="productImg"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <del className="delText">Rs.{item?.price + 87}</del>Rs.{" "}
                        {item?.price}
                      </div>
                      {/* <div>
                      <button>-</button>
                      <span>1</span>
                      <button>+</button>
                    </div> */}
                      {item.count ? (
                        <div className="counter">
                          <div>
                            <button
                              style={{
                                border: "1px solid dodgerBlue",
                                width: "30px",
                                borderRadius: "10px",
                              }}
                              onClick={(e) => {
                                decreaseQuantity("food", item, i);
                              }}
                            >
                              -
                            </button>
                          </div>
                          <div className="countText">{item?.quantity}</div>
                          <div>
                            <button
                              style={{
                                border: "1px solid dodgerBlue",
                                width: "30px",
                                borderRadius: "10px",
                              }}
                              onClick={(e) => {
                                increaseQuantity("food", item, i);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="outOfStockText">Out of Stock</div>
                      )}
                    </div>
                    <div>
                      <Button
                        style={{
                          backgroundColor: "#ff1548",
                          color: "white",
                          borderRadius: "20px",
                          padding: "5px 20px",
                        }}
                        onClick={(e) => {
                          removeProduct("food", item, i);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
              {/* Animals */}
              {addedAnimals.map((item, i) => {
                return (
                  <div className="productsDetails">
                    <div>
                      <div style={{ width: "200px" }}>{item?.name}</div>
                      <div>
                        <img
                          src={item?.picURL}
                          alt=""
                          width="70px"
                          className="productImg"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <del className="delText">Rs.{item?.price + 87}</del>Rs.{" "}
                        {item?.price}
                      </div>
                      {/* <div>
                      <button>-</button>
                      <span>1</span>
                      <button>+</button>
                    </div> */}
                      {item.count ? (
                        <div className="counter">
                          <div>
                            <button
                              style={{
                                border: "1px solid dodgerBlue",
                                width: "30px",
                                borderRadius: "10px",
                              }}
                              onClick={(e) => {
                                decreaseQuantity("animal", item, i);
                              }}
                            >
                              -
                            </button>
                          </div>
                          <div className="countText">{item?.quantity}</div>
                          <div>
                            <button
                              style={{
                                border: "1px solid dodgerBlue",
                                width: "30px",
                                borderRadius: "10px",
                              }}
                              onClick={(e) => {
                                increaseQuantity("animal", item, i);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="outOfStockText">Out of Stock</div>
                      )}
                    </div>
                    <div>
                      <Button
                        style={{
                          backgroundColor: "#ff1548",
                          color: "white",
                          borderRadius: "20px",
                          padding: "5px 20px",
                        }}
                        onClick={(e) => {
                          removeProduct("animal", item, i);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
              {/* Medicines */}
              {addedMedicines.map((item, i) => {
                return (
                  <div className="productsDetails">
                    <div>
                      <div style={{ width: "200px" }}>{item?.name}</div>
                      <div>
                        <img
                          src={item?.picURL}
                          alt=""
                          width="70px"
                          className="productImg"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <del className="delText">Rs.{item?.price + 87}</del>Rs.{" "}
                        {item?.price}
                      </div>
                      {/* <div>
                      <button>-</button>
                      <span>1</span>
                      <button>+</button>
                    </div> */}
                      {item.count ? (
                        <div className="counter">
                          <div>
                            <button
                              style={{
                                border: "1px solid dodgerBlue",
                                width: "30px",
                                borderRadius: "10px",
                              }}
                              onClick={(e) => {
                                decreaseQuantity("medicine", item, i);
                              }}
                            >
                              -
                            </button>
                          </div>
                          <div className="countText">{item?.quantity}</div>
                          <div>
                            <button
                              style={{
                                border: "1px solid dodgerBlue",
                                width: "30px",
                                borderRadius: "10px",
                              }}
                              onClick={(e) => {
                                increaseQuantity("medicine", item, i);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="outOfStockText">Out of Stock</div>
                      )}
                    </div>
                    <div>
                      <Button
                        style={{
                          backgroundColor: "#ff1548",
                          color: "white",
                          borderRadius: "20px",
                          padding: "5px 20px",
                        }}
                        onClick={(e) => {
                          removeProduct("medicine", item, i);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
              {/* Assets */}
              {addedAssets.map((item, i) => {
                return (
                  <div className="productsDetails">
                    <div>
                      <div style={{ width: "200px" }}>{item?.name}</div>
                      <div>
                        <img
                          src={item?.picURL}
                          alt=""
                          width="70px"
                          className="productImg"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <del className="delText">Rs.{item?.price + 87}</del>Rs.{" "}
                        {item?.price}
                      </div>
                      {/* <div>
                      <button>-</button>
                      <span>1</span>
                      <button>+</button>
                    </div> */}
                      {item.count ? (
                        <div className="counter">
                          <div>
                            <button
                              style={{
                                border: "1px solid dodgerBlue",
                                width: "30px",
                                borderRadius: "10px",
                              }}
                              onClick={(e) => {
                                decreaseQuantity("asset", item, i);
                              }}
                            >
                              -
                            </button>
                          </div>
                          <div className="countText">{item?.quantity}</div>
                          <div>
                            <button
                              style={{
                                border: "1px solid dodgerBlue",
                                width: "30px",
                                borderRadius: "10px",
                              }}
                              onClick={(e) => {
                                increaseQuantity("asset", item, i);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="outOfStockText">Out of Stock</div>
                      )}
                    </div>
                    <div>
                      <Button
                        style={{
                          backgroundColor: "#ff1548",
                          color: "white",
                          borderRadius: "20px",
                          padding: "5px 20px",
                        }}
                        onClick={(e) => {
                          removeProduct("asset", item, i);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="productsContainer">
                <img src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png" alt="empty cart" height="400px"/>
            </div>
          )}
          <div className="billSection">
            <h3>Reciept</h3>
            <table width="100%">
              <thead>
                <tr>
                  <th></th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Products Price</td>
                  <td>{totalAmount || 0}</td>
                </tr>
                {totalAmount ? (
                  <tr>
                    <td>Delivery Charges</td>
                    <td>100</td>
                  </tr>
                ) : null}
                <tr className="totalAmountSec">
                  <td>Total Amount</td>
                  <td>{totalAmount + (totalAmount ? 100 : 0) || 0}</td>
                </tr>
              </tbody>
            </table>
            <div className="buyBtn">
              {
                totalAmount ? 
                <Button
                style={{
                  backgroundColor: "#ff1548",
                  color: "white",
                  borderRadius: "20px",
                  padding: "10px 30px",
                }}
                onClick={(e) => {
                  e.preventDefault();

                  buyProducts();
                }}
              >
                Buy Now
              </Button>
              :
              <Button
                style={{
                  backgroundColor: "#ff1548",
                  color: "white",
                  borderRadius: "20px",
                  padding: "10px 30px",
                }}
                onClick={(e) => {
                  e.preventDefault();

                  navigate('/profile');
                }}
              >
                Continue Shopping
              </Button>
              }
            </div>
          </div>
        </div>
      </div>
      {/* Floating add to cart */}
      {user ? (
        <Box
          sx={{ "& > :not(style)": { m: 1 } }}
          style={{
            position: "fixed",
            width: "100px",
            height: "100",
            right: "0px",
            bottom: "0px",
          }}
        >
          <Badge
            badgeContent={addedToCart.length || 0}
            color="error"
            size="large"
          >
            <Fab style={{ backgroundColor: "#f5d038" }} aria-label="add">
              <ShoppingCartIcon />
            </Fab>
          </Badge>
        </Box>
      ) : null}
    </div>
  );
}

export default AddToCart;
