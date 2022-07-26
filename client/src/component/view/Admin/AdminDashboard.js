import React, { useState, useEffect } from "react";
import "../../styles/admindashboard.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';


const AdminDashboard = () => {

  const [userlist, setUserlist] = useState({ users: [] });
  const [enquirylist, setEnquirylist] = useState({ enquiry: [] });

  let count = 0;

  const getUserdata = () => {

    axios
      .get('/api/viewuser', {
        headers: {
          'Content-Type': 'Application/json'
        }
      })
      .then((res) => {
        setUserlist({ users: res.data.details })

      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const getEnquiry = () => {
    axios
      .get('/api/getenquiry', {
        headers: {
          'Content-Type': 'Application/json'
        }
      })
      .then((res) => {
        console.log("Enquiry details : ", res.data.details)
        const dataRev=res.data.details.slice().sort().reverse();

        console.log("data reverse: ",dataRev);

        setEnquirylist({ enquiry: dataRev});

      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  useEffect(() => {
    getEnquiry();
    // getUserdata();


  })
  console.log("userlist :", userlist)
  //  count=userlist.length;
  //   console.log(count)

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
          <Link to="/createuser">	 <p>Add Client</p></Link>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1237/1237946.png"
            alt=""
          />
        </div>
        <div className="add">
          <Link to="/createproject">	 <p>Add Project</p></Link>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1237/1237946.png"
            alt=""
          />
        </div>
        
      </div>
      <div className="latestActivityContainer">
        <h2>Latest Enquiry</h2>
        <div className="activityCardsContainer">
          {enquirylist.enquiry.map((data, i) => {
            console.log("data",data)
            return (
              <div className="activityCard">
                <h5>{data.name}</h5>
                <p>{data.contact}</p>
                <p>{data.email}</p>
                <h6>{moment(data.createdAt).format('DD-MM-YYYY')}</h6>
              </div>
            )
          }
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
