import React, { useState, useEffect } from 'react';
import Fileuploadform from '../add/Fileuploadform'
import axios from 'axios';
import { useParams } from "react-router-dom";
import styles from '../styles/home.module.css';
import Sidebar from '../sidebar'

import {
  PersonPin, Edit, Delete, Add
} from "@material-ui/icons";

axios.defaults.withCredentials = true;

function UserDashboard(props) {
  const [userdata, setUserdata] = useState({ user: [] });
  const [logindata, setLogindata] = useState({ login: [] })
  const [userPlan, setUserplan] = useState({ userplan: [] })
const [planServices,setPlanservices]=useState({services:[]})
  const { id } = useParams();

  const getUserdata = () => {

    axios
      .get(`http://localhost:8888/viewsingleuser/${id}`)
      .then((res) => {
        // console.log(res.data.details);
        setUserdata({ user: res.data.userdetails })
        setLogindata({ login: res.data.logindetails })
        console.log("userlist :", userdata);
        console.log("loginlist :", logindata);

      })
      .catch((err) => {
        console.log(err.response);
      });

    axios.post('http://localhost:8888/getuserplan', { login_id: id })
      .then((res) => {
        console.log(res);
        setUserplan({ userplan: res.data.details })
      })
      setPlanservices({services:userPlan.userplan.plan_services})
      console.log("plan data", userPlan.userplan.plan_services)
  }

  useEffect(() => {
    getUserdata();
  })

  const logout = () => {
    axios
      .get('http://localhost:8888/logout')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    window.location.reload();
  };

  return (

    <div className={styles}>
      <div className={styles.top}>
        <p >AGRIHA</p>

        <h3 style={{ marginTop: '1rem', float: "left" }}>User Profile </h3>

        <button onClick={logout} className={styles.logout}>
          Log out
        </button>

      </div>

      <div className={styles.bottom}>
        <div style={{ width: '180px' }} >

          <Sidebar></Sidebar>

        </div>

        <div style={{ marginLeft: "3rem", marginTop: '1rem', 
        marginBottom: '2rem', width: '100%' }}>

          <div style={{ width: '100%', display: 'flex' }}>
            <div style={{
              height: '200px',
              width: '250px', borderRadius: '20px',
              boxShadow: '1px 2px 10px #030333', marginBottom: '2rem'
            }}>

              <img style={{
                boxShadow: '1px 2px 10px #030333',
                borderRadius: '50px',
                height: '80px', margin: '1rem',
                width: '80px'
              }} src="/assets/person/avatar-png-11554021661asazhxmdnu.png" />

              <h5 style={{ marginLeft: '1rem' }}>
                {
                  userdata.user.map((u, i) => {
                    return (
                      <>
                        <PersonPin />   <label>{u.uname}</label>
                      </>)
                  })
                }
              </h5>
              <h5 style={{ marginLeft: '1rem' }}>
                {
                  // console.log(userdata.user)
                  logindata.login.map((u, i) => {
                    return (<> <Edit /><label>{u.phonenumber}</label></>)
                  })

                }
              </h5>


            </div>

            <div style={{
              height: '200px', marginLeft: '2rem', padding: '1rem',
              width: '600px', borderRadius: '20px',
              boxShadow: '1px 2px 10px #030333', marginBottom: '2rem'
            }}>
              <h5 style={{ margin: '.3rem' }}> Personal details </h5>
              <hr></hr>
              {
                userdata.user.map((u, i) => {
                  return (
                    <>
                      <label>{u.housename}</label><br></br>
                      <label>{u.Place}</label><br></br>
                      <label>{u.Pincode}</label><br></br>
                      <label>{u.country}</label>
                    </>)
                })
              }

            </div>

          </div>
          <div>

            <h6>Plan choosen</h6>
            <hr></hr>
            <h6>{userPlan.userplan.plan_name}</h6>
            <h6>{userPlan.userplan.plan_amount}</h6>
            <h6>{userPlan.userplan.initial_payment}</h6>
            {/* <input type="checkbox" /> 
            {userPlan.userplan.plan_services} */}
             {/* {planServices.services.map((u, i)=>{
               return(
               console.log(u)
               )
             })} */}
          
             
          </div>




          <Fileuploadform />
          {/* <UserProfile userProfileData/> */}
        </div>
      </div>
    </div>
  )
}

// const userProfileData = {
//   logoArclif061: "logo-arclif-06-1-3.png",
//   spanText1: "Personal Details",
//   spanText2: "1",
//   vector2: "vector-9.png",
//   spanText3: "Your Cart",
//   spanText4: "Personal Details",
//   spanText5: "Name of customer",
//   spanText6: "Mobile Number",
//   spanText7: "Upload Your Own Plot Image",
//   vector3: "vector-3.png",
//   rectangle14: "rectangle-14-1.png",
//   overlapGroup3: "rectangle-27-1.png",
//   spanText8: "Upload Photo",
//   group8: "group-8-1.png",
//   spanText9: "Adresss",
//   spanText10: "E mail id",
//   vector4: "vector-1.png",
//   spanText11: "Add Photo",
//   spanText12: "Location",
//   spanText13: "Your Photos",
//   vector5: "vector-2.png",
// };
export default UserDashboard