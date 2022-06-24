import React from "react";
import "../../styles/admindashboard.css";

const AdminDashboard = () => {
  return (
    <div className="mainContainer">
      <div className="greetingContainer">
        <h1>
          Hi, <span>admin</span>
        </h1>
      </div>
      <div className="cardContainer">
        <div className="card users">
          <img
            src="https://cdn-icons-png.flaticon.com/512/681/681392.png"
            alt=""
          />
          <p>Total Users</p>
          <h3>10000</h3>
        </div>
        <div className="card payments">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1571/1571065.png"
            alt=""
          />
          <p>Total Payment</p>
          <h3>1000000.00</h3>
        </div>
        <div className="card projects">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1283/1283218.png"
            alt=""
          />
          <p>Total Projects</p>
          <h3>1000</h3>
        </div>
      </div>
      <div className="addContainer">
        <div className="add">
          <p>Add Client</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1237/1237946.png"
            alt=""
          />
        </div>
        <div className="add">
          <p>Add Project</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1237/1237946.png"
            alt=""
          />
        </div>
      </div>
      <div className="latestActivityContainer">
        <h2>Latest Activity</h2>
        <div className="activityCardsContainer">
          <div className="activityCard">
            <h5>LOGIN</h5>
            <p>UserName</p>
            <p>9876543210</p>
            <h6>07 Jun 2022</h6>
          </div>
          <div className="activityCard">
            <h5>LOGIN</h5>
            <p>UserName</p>
            <p>9876543210</p>
            <h6>07 Jun 2022</h6>
          </div>
          <div className="activityCard">
            <h5>LOGIN</h5>
            <p>UserName</p>
            <p>9876543210</p>
            <h6>07 Jun 2022</h6>
          </div>
          <div className="activityCard">
            <h5>LOGIN</h5>
            <p>UserName</p>
            <p>9876543210</p>
            <h6>07 Jun 2022</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
