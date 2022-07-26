import "./styles/sidebarmain.css";
import React from 'react';
import { Link } from 'react-router-dom';



export default function Sidebar() {
  return (

    <div className="sidebar">
      <div className="sidebarCard">
        <img
          src="https://cdn-icons-png.flaticon.com/512/747/747891.png"
          alt=""
        />
        <Link to="/" className="sidebarListItemText"><p>DASHBOARD</p></Link>
      </div>
      <div className="sidebarCard">
        <img
          src="/assets/users.png"
          alt=""
        />
        <Link to="/userlist" className="sidebarListItemText"> <p>USERS LIST</p></Link>
      </div>
      <div className="sidebarCard">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7686/7686188.png"
          alt=""
        />
        <Link to="/viewofflineuser" className="sidebarListItemText" >
          <p>CLIENTS LIST </p></Link>
      </div>
      <div className="sidebarCard">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2660/2660279.png"
          alt=""
        />
        <Link to="/plans" className="sidebarListItemText" >  <p>PRICE PLANS</p></Link>
      </div>
      <div className="sidebarCard">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7686/7686188.png"
          alt=""
        />
        <Link to="/adonservices" className="sidebarListItemText" >
          <p>ADDON SERVICES</p></Link>
      </div>
      <div className="sidebarCard">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1388/1388855.png"
          alt=""
        />
        <p>EMPLOYEES</p>
      </div>
      <div className="sidebarCard">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1545/1545606.png"
          alt=""
        />
        <Link to="/enquiry" className="sidebarListItemText" >
          <p>ENQUIRY</p>
        </Link>
      </div>
      <div className="sidebarCard">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5426/5426665.png"
          alt=""
        />
        <Link to="/project" className="sidebarListItemText" >
          <p>PROJECTS</p>
        </Link>
      </div>
      <div className="sidebarCard">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7609/7609433.png"
          alt=""
        />
        <Link to="/Admin" className="sidebarListItemText" ><p>ADMIN</p>
        </Link> 
      </div>
      <div className="sidebarCard">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1001/1001296.png"
          alt=""
        />
        <p>INTERNSHIP</p>
      </div>
      <div className="sidebarCard">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1001/1001296.png"
          alt=""
        />
        <p>JOB</p>
      </div>
    </div>
  );
};


