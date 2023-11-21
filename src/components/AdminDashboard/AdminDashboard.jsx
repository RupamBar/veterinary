import React from "react";
import AuthorizedHeader from "../Header/AuthorizedHeader";
import "./AdminDashboard.css";
import { makeStyles } from "tss-react/mui";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

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

function AdminDashboard({ user }) {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <>
      <div className="adminDashboard">
        <div className="innerDiv">
          <h2 className="dashboardHeader">Admin Dashboard</h2>
          <div className="usersMainContainer firstelement">
            <h3>Manage Users</h3>
            <div className="userContainer">
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/manage-customers", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Manage Customers
              </div>
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/manage-doctors", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Manage Doctors
              </div>
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/manage-employees", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Manage Employees
              </div>
            </div>
          </div>
          <div className="usersMainContainer">
            <h3>Manage Products</h3>
            <div className="userContainer">
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/manage-animals", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Manage Animals
              </div>
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/manage-foods", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Manage Foods
              </div>
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/manage-assets", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Manage Assets
              </div>
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/manage-medicines", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Manage Medicines
              </div>
            </div>
          </div>
          <div className="usersMainContainer">
            <h3>Manage Services</h3>
            <div className="userContainer">
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/checkup-slots", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Check ups
              </div>
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/manage-grooming", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Grooming
              </div>
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/manage-prescriptions", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Prescriptions
              </div>
            </div>
          </div>
          <div className="usersMainContainer">
            <h3>Sales</h3>
            <div className="userContainer">
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/food-receipts", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Sold Foods
              </div>
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/view-pets", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Pets
              </div>
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/view-sold-assets", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Sold Assets
              </div>
              <div
                className="dashCards"
                onClick={(e) => {
                  navigate("/view-sold-medicines", {
                    state: JSON.stringify({ user: user }),
                  });
                }}
              >
                Sold Medicines
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default AdminDashboard;
