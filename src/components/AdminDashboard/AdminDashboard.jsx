import React from "react";
import AuthorizedHeader from "../Header/AuthorizedHeader";
import "./AdminDashboard.css";
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from "react-router-dom";

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
                    state: JSON.stringify({ user: user}),
                  });
                }}
              >
                Manage Customers
              </div>
              <div className="dashCards" onClick={(e) => {
                  navigate("/manage-doctors", {
                    state: JSON.stringify({ user: user}),
                  });
                }}>Manage Doctors</div>
              <div className="dashCards" onClick={(e) => {
                  navigate("/manage-employees", {
                    state: JSON.stringify({ user: user}),
                  });
                }}>Manage Employees</div>
            </div>
          </div>
          <div className="usersMainContainer">
            <h3>Manage Products</h3>
            <div className="userContainer">
              <div className="dashCards" onClick={(e) => {
                  navigate("/manage-animals", {
                    state: JSON.stringify({ user: user}),
                  });
                }}>Manage Animals</div>
              <div className="dashCards" onClick={(e) => {
                  navigate("/manage-foods", {
                    state: JSON.stringify({ user: user}),
                  });
                }}>Manage Foods</div>
              <div className="dashCards" onClick={(e) => {
                  navigate("/manage-assets", {
                    state: JSON.stringify({ user: user}),
                  });
                }}>Manage Assets</div>
              <div className="dashCards" onClick={(e) => {
                  navigate("/manage-medicines", {
                    state: JSON.stringify({ user: user}),
                  });
                }}>Manage Medicines</div>
            </div>
          </div>
          <div className="usersMainContainer">
            <h3>Manage Services</h3>
            <div className="userContainer">
              <div className="dashCards">Check ups</div>
              <div className="dashCards">Grooming</div>
              <div className="dashCards"  onClick={(e) => {
                  navigate("/manage-prescriptions", {
                    state: JSON.stringify({ user: user}),
                  });
                }}>Prescriptions</div>
              <div className="dashCards">Payments</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
