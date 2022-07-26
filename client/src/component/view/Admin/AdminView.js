import React from 'react';
import "../../styles/Admin.css";
import Header from "../../header";
import Main from "./AdminDashboard";
import Payments from "../Payments/Payments";
import Sidebar from "../../sidebar";
// import ReactGA from 'react-ga';
//   const TRACKING_ID = "UA-215749633-1"; // OUR_TRACKING_ID
//   ReactGA.initialize(TRACKING_ID);

function AdminView() {
  return (
    <div className="App">
      <Header />
      <div className="bodyContainer">
        <Sidebar />
        <Main />
        <Payments />
      </div>

    </div>
  );
}

export default  AdminView;
