import React, { useState, useEffect } from 'react';
import Fileuploadform from '../add/Fileuploadform'
import axios from 'axios';
import { useParams, useHistory, Link } from "react-router-dom";
import styles from '../styles/home.module.css';
import Sidebar from '../sidebar';
import UploadFileComponent from '../add/UploadFileComponent';
import { Form, Button, Card } from 'react-bootstrap'

import {
  PersonPin, Edit, Delete, Add
} from "@material-ui/icons";


function UserDashboard(props) {
  const history = useHistory()
  const [userdata, setUserdata] = useState({ user: [] });
  const [logindata, setLogindata] = useState({ login: [] })
  const [userPlan, setUserplan] = useState({ userplan: [] })
  const [planServices, setPlanservices] = useState([])
  const [buildingdetails, setBuildingdetails] = useState([])

  const { id } = useParams();

  const getUserdata = () => {

    axios
      .get(`http://localhost:8888/viewsingleuser/${id}`)
      .then((res) => {
        // console.log(res.data.details);
        setUserdata({ user: res.data.userdetails })
        setLogindata({ login: res.data.logindetails })
        // console.log("userlist :", userdata);
        // console.log("loginlist :", logindata);

      })
      .catch((err) => {
        console.log(err.response);
      });

    axios.post('http://localhost:8888/getuserplan', { login_id: id })
      .then((res) => {
        // console.log(res);
        setUserplan({ userplan: res.data.details })
        setPlanservices(res.data.details.plan_services)
      })

    axios.post('http://localhost:8888/getbuildingdetails', { id: id })
      .then((response) => {
        setBuildingdetails(response.data.details)
        console.log("buildingdetails :", response.data.details)
      })
    // setPlanservices({services:userPlan.userplan.plan_services})
    // console.log("plan data", userPlan.userplan.plan_services)
  }

  useEffect(() => {
    getUserdata();
  }, [])

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
  const upload = () => {
    // history.push(/uploadfile')
  }

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

        <div style={{
          marginLeft: "3rem", marginTop: '1rem',
          marginBottom: '2rem', width: '100%'
        }}>

          <div style={{ width: '100%'}}>
            <div style={{display:'flex'}}>

            <div style={{
              height: '200px',
              width: '250px', borderRadius: '20px',
              boxShadow: '1px 2px 10px #a3a3c2', marginBottom: '2rem'
            }}>

              <img style={{
                boxShadow: '1px 2px 10px #a3a3c2',
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
           <div style={{ marginLeft: "3rem", display: 'flex'}}>
             <div>

           <Card style={{ width: '20rem',borderRadius: '20px',height:'200px',backgroundColor:'#f2f2f2',
              boxShadow: '1px 2px 10px #a3a3c2' }}>
           
           <Card.Body>
             <Card.Title>STAGE</Card.Title>
             <Card.Text>
               Clieck below to insert documents
             </Card.Text>
             <Link to={`/uploadfile/${id}`}>
             <Button variant="info">UPLOAD HERE</Button></Link>  
           </Card.Body>
         </Card> 
         </div>
        
           </div>
           </div>
           
            <div style={{
              height: '400px', padding: '1rem',
              width: '600px', borderRadius: '20px',
              boxShadow: '1px 2px 10px #a3a3c2', marginBottom: '2rem'
            }}> 
            <h5 style={{ margin: '.3rem' }}>  Details   </h5>
            <hr></hr>

              <div style={{
              display: 'flex'}}>

              <div style={{ marginTop: '0', marginLeft: '1rem', borderRight: '1px solid #a3a3c2', width: '150px' }}>
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
                <h6>{buildingdetails.map((u,i)=>{return (<div key={i}><label > total_area :{u.total_area} </label>
                
                </div>)})}</h6>
              
              </div>
              <div style={{ marginTop: '0', marginLeft: '1rem', borderRight: '1px solid #a3a3c2', width: '150px' }}>

                <h6>{userPlan.userplan.plan_name}</h6>
                <h6>{userPlan.userplan.plan_amount}</h6>
                <h6>{userPlan.userplan.initial_payment}</h6>
              </div>
              <div style={{ marginTop: '0', marginLeft: '1rem'}}>
                {planServices.map((u, i) => {
                  return (
                    <>
                      {/* <input type="checkbox" /> */}
                      <label>{u}</label>
                      <br></br>
                    </>
                  )
                })}
              </div>
              <div>
            </div>


            <div>
          
              {/* <h6>Plan choosen</h6>
            <hr></hr>
            <h6>{userPlan.userplan.plan_name}</h6>
            <h6>{userPlan.userplan.plan_amount}</h6>
            <h6>{userPlan.userplan.initial_payment}</h6> */}


              {/* {userPlan.userplan.plan_services}
            {console.log(userPlan.userplan.plan_services)} */}

            </div>
        
          </div>

        
          
        
          {/* <Link to={`/uploadfile/${u}/${id}`}> Stage1</Link>   */}
          {/* <div className="container">
                <div className="row">
                    <form>
                        <div className="form-group">
                            <input type="file" name="imgCollection" onChange={(e)=>{console.log(e.target)}}  />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div> */}

          {/* <UploadFileComponent id={id}/> */}
          {/* <Fileuploadform /> */}
          {/* <UserProfile userProfileData/> */}
      
          
    </div></div>
    </div>

    
    
    </div>
    
  

    </div>
  )
}

export default UserDashboard