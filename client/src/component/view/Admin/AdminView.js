import React from 'react';
import "../../styles/Admin.css";
import Header from "../../header";
import Main from "./AdminDashboard";
import Payments from "../Payments/Payments";
import Sidebar from "../../sidebar";

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
