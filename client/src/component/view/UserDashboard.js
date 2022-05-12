import React, { useState, useEffect } from 'react';
import Fileuploadform from '../add/Fileuploadform'
import axios from 'axios';
import { useParams } from "react-router-dom";
import UserProfile from './user/user';

function UserDashboard(props) {
  const [userdata, setUserdata] = useState({ user: []});
  const [logindata,setLogindata] =useState({ login: []})
  const { id } = useParams();

  const getUserdata = () => {

    axios
      .get(`http://localhost:8888/viewsingleuser/${id}`)
      .then((res) => {
        // console.log(res.data.details);
        setUserdata({ user: res.data.userdetails })
        setLogindata({login:res.data.logindetails})
        console.log("userlist :", userdata);
        console.log("loginlist :", logindata);

      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  useEffect(() => {
    getUserdata();
  })
  return (
    <div>
      <div> { 
        // console.log(userdata.user)
      logindata.login.map((u,i)=>{
      return  <label>{u.phonenumber}</label>
      })
        
      } </div>
      {
        userdata.user.map((u,i)=>{
          return(
            <label>{u.uname}</label>
          )
        })
      }
      {/* <UserProfile userProfileData/> */}

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