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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import App from '../../App';
import Header from '../header';

const cookies = new Cookies();

function UserDashboard(props) {

  const accessToken = cookies.get('authSession');
  console.log("accessToken :", accessToken);

  function UserisLoggedin() {

    const history = useHistory();
    const [userdata, setUserdata] = useState({ user: [] });
    const [logindata, setLogindata] = useState({ login: [] })
    const [userPlan, setUserplan] = useState({ userplan: [] })
    const [planServices, setPlanservices] = useState([])
    const [buildingdetails, setBuildingdetails] = useState([])
    const [requirementslist, setRequirementsList] = useState([])

    const { id } = useParams();
    axios.defaults.withCredentials = true;

    // if(auth.isAuthenticated){
    const getUserdata = () => {

      axios
        .get(`/api/viewsingleuser/${id}`, { withCredentials: true })
        .then((res) => {
          // console.log(res.data.details);
          if (res.data.userdetails) {
            setUserdata({ user: res.data.userdetails })
            setLogindata({ login: res.data.logindetails })
            // console.log("userlist :", userdata);
            // console.log("loginlist :", logindata);
          } else {
            toast.error('no user found !!')
          }

        })
        .catch((err) => {
          console.log(err.response);
        });

      axios.post('/api/getuserplan', { login_id: id })
        .then((res) => {
          console.log("res : ", res);
          if (res.data.details) {
            setUserplan({ userplan: res.data.details })
            setPlanservices(res.data.details.plan_services)
          } else {
            toast.error('no plan found !!')
          }
        })

      axios.post('/api/getbuildingdetails', { id: id })
        .then((response) => {
          if (response.data.details) {
            setBuildingdetails(response.data.details)
            console.log("buildingdetails :", response.data.details)
          } else {
            toast.error('no building details found !!')
          }
        })
      // setPlanservices({services:userPlan.userplan.plan_services})
      // console.log("plan data", userPlan.userplan.plan_services)

      axios.post('/api/getrequirementslist', { login_id: id })
        .then((response) => {
          console.log("requirements list : ", response.data.details)

          if (response.data.details.requirements_list.length != 0) {
            setRequirementsList(response.data.details.requirements_list)
            console.log("requirements list :", response.data.details.requirements_list)
          } else {
            toast.error('no requirements details found !!')
          }
        })

    }

    useEffect(() => {
      getUserdata();
    }, [])

    const logout = () => {
      axios
        .get('/api/logout')
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
    // }else{
    // history.push('/')
    // }
    return (

      <div className={styles}>
        <div>
         
<Header/>
        </div>

        <div className={styles.bottom}>
          <div style={{ width: '180px' }} >

            <Sidebar></Sidebar>

          </div>

          <div style={{
            marginLeft: "3rem", marginTop: '1rem',
            marginBottom: '2rem', width: '100%'
          }}>

            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex' }}>

                <div style={{
                  height: '200px',
                  width: '200px', borderRadius: '20px',
                  marginBottom: '2rem'
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
                <div style={{ marginLeft: "3rem", display: 'flex' }}>

                  <div style={{ display: 'flex' }}>
                    <div style={{ marginRight: "5rem", marginTop: "3rem" }}>
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
                    <Card style={{
                      width: '20rem', borderRadius: '20px', height: 'max-content', backgroundColor: '#f2f2f2',
                      boxShadow: '1px 2px 10px rgb(221 221 221)',
                      marginTop: '2rem'
                    }}>

                      <Card.Body>
                        <Card.Title>upload documents</Card.Title>
                        <Card.Text>
                          click below to insert documents
                        </Card.Text>
                        { }
                        <Link to={`/uploadfile/${id}`}>
                          <Button variant="primary">UPLOAD HERE</Button></Link>
                      </Card.Body>
                    </Card>
                  </div>

                </div>
              </div>

              <div style={{
                height: 'fit-content', padding: '1rem',
                width: '750px', borderRadius: '20px',
                boxShadow: '1px 2px 10px #a3a3c2', marginBottom: '2rem'
              }}>

                <h5 style={{ margin: '.3rem' }}>  Details   </h5>
                <hr></hr>

                <div style={{
                  display: 'flex'
                }}>

                  <div style={{ marginTop: '0', marginLeft: '1rem', borderRight: '1px solid #a3a3c2', width: '150px' }}>
                    {/* {
                      userdata.user.map((u, i) => {
                        return (
                          <>
                            <label>{u.housename}</label><br></br>
                            <label>{u.Place}</label><br></br>
                            <label>{u.Pincode}</label><br></br>
                            <label>{u.country}</label>
                          </>)
                      })
                    } */}
                    <div>

                      {(buildingdetails) ?
                        buildingdetails.map((u, i) => {
                          return (
                            <ul key={i} style={{ listStyleType: 'none' }}>
                              <li > <strong>Floors - </strong>{u.no_of_floors} </li>

                              <li > <strong>Area - </strong>{u.total_area} </li>
                              <li ><strong> Bedrooms - </strong>{u.no_of_bedrooms} </li>
                              <li ><strong> Attached bathrooms </strong>{u.attached_bathrooms} </li>
                              <hr></hr> <li ><strong> Design type </strong>{u.design_type} </li>
                              <hr></hr><li > <strong>Total budget </strong>{u.total_budget} </li>

                            </ul>
                          )
                        }) : "no data found"
                      }
                    </div>

                  </div>

                  <div style={{ marginTop: '0', marginLeft: '1rem', borderRight: '1px solid #a3a3c2', width: '150px' }}>
                    <h5>Requirements </h5>
                    <hr></hr>
                    {(requirementslist) ? requirementslist.map((u, i) => {
                      return (
                        <>
                          <input type="checkbox" />
                          <label>{u}</label>
                          <br></br>
                        </>
                      )
                    }) : <label>no data found</label>
                    }
                  </div>

                  <div style={{ marginTop: '0', marginLeft: '1rem', borderRight: '1px solid #a3a3c2', width: '150px' }}>
                    <h5>Plan</h5>
                    <hr></hr>
                    <h6>{(userPlan.userplan) ? userPlan.userplan.plan_name : "no data found!!"}</h6>
                    <h6>{(userPlan.userplan) ? userPlan.userplan.plan_amount : "no data found"}</h6>
                    <h6>{(userPlan.userplan) ? userPlan.userplan.initial_payment : "no data found"}</h6>

                  </div>
                  <div style={{ marginTop: '0', marginLeft: '1rem' }}>
                    <h5>Services </h5>
                    <hr></hr>
                    {(planServices) ? planServices.map((u, i) => {
                      return (
                        <>
                          <input type="checkbox" />
                          <label>{u}</label>
                          <br></br>
                        </>
                      )
                    }) : <label>no data found</label>}
                  </div>
                  <div>
                  </div>

                  <div>

                  </div>

                </div>

              </div></div>
          </div>

        </div>

        <div className="form-group">
          <ToastContainer />
        </div>

      </div>
    )
  }
  return (accessToken) ? <UserisLoggedin /> : <App />
}


export default UserDashboard

