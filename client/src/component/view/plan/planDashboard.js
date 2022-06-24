import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import styles from '../../styles/home.module.css';
import Sidebar from '../../sidebar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  PersonPin, Edit, Delete, Add
} from "@material-ui/icons";
import { Link } from 'react-router-dom';

import Cookies from 'universal-cookie';
import App from '../../../App';
import Header from '../../header'

const cookies = new Cookies();
axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '20ch',
      height: '70px',
    },
  },
}));

function PlanDashboard() {
  const accessToken = cookies.get('authSession');
  console.log("accessToken :", accessToken);

  function PlanviewisLoggedin() {

    const [plandata, setPlandata] = useState({
      plan: "",
      plan_name: '',
      plan_amount: '',
      plan_services: [],
      stages: [],
      stage_price: [],
      initial_payment: '',
      stages: []
    });
    const [stages, setStages] = useState([]);
    const [stageprice, setStageprice] = useState([]);

    const { id } = useParams();
    // const [plan, setPlan] = useState({
    //   plan_name: '',
    //   plan_amount: '',
    //   plan_services: [],
    //   initial_payment: ''

    // })
    const getPlandata = () => {
      console.log('plan id :', id)

      axios
        .get(`/api/viewsingleplan/${id}`, { withCredentials: true },)
        .then((res) => {
          // console.log(res.data.details.stages);
          // setPlandata({ plan_name: res.data.details.plan_name })
          setPlandata({ plan: res.data.details })
          setStages(res.data.details.stages)
          setStageprice(res.data.details.stage_price)
          // setPlandata({stage_price: res.data.details.stage_price})
          // plandata.plan.forEach(element => {
          //    setPlandata({stages: element})
          // });


          // console.log("single plan :", plandata);

        })
        .catch((err) => {
          console.log(err.response);
        });
    }


    const handleChange = (e) => {
      // setPlandata({...state,[e.target.name]:value})

    }
    useEffect(() => {
      getPlandata();
    })

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
    const update = (id) => {
      console.log("id :", id)
    }
    const classes = useStyles();

    return (
      <div className={styles}>
        <div>
          <Header/>

        </div>

        <div className={styles.bottom}>
          <div style={{ width: '180px' }} >

            <Sidebar></Sidebar>

          </div>

          <div style={{ marginLeft: "3rem", marginTop: '1rem', marginBottom: '2rem', width: '100%' }}>
            <Link to={`/stages/${id}`}>
              <button
                className={styles.addbutton}>
                <Add /> Stage</button>
            </Link>

            <div style={{ width: '100%', display: 'flex' }}>


              <div style={{
                height: 'max-content', marginLeft: '2rem', padding: '1rem',
                width: '800px', borderRadius: '20px',
                boxShadow: '5px 2px 10px #030333', marginBottom: '2rem'
              }}>

                <form className={classes.root}>
                  <div className="form-group">

                    <input type="text" className="form-control"
                      style={{
                        width: '175px',
                        backgroundColor: 'Window',
                        marginLeft: '0.5rem'
                      }}
                      value={plandata.plan.plan_name}
                      name="plan_name"
                      onChange={(e) => {
                        console.log(e.target.value);
                        // handleChange(e)
                        setPlandata({ plan_name: e.target.value })
                      }}
                    />
                  </div>

                  <TextField

                    id="outlined-required"
                    helperText="plan amount"
                    value={plandata.plan.plan_amount}
                    variant="outlined"

                  />

                  <TextField
                    required
                    id="outlined-required"
                    helperText="initial payment"
                    value={plandata.plan.initial_payment}
                    variant="outlined"
                  />

                  <br></br>
                  <TextField
                    required
                    id="outlined-required"
                    multiline
                    style={{ width: '350px', height: 'max-content' }}
                    value={plandata.plan.plan_services}
                    variant="outlined"
                    helperText="services provided"
                  />

                  <br></br>
                  <div style={{ display: 'flex', marginTop: '5px', height: 'max-content' }}>
                    <TextField
                      required
                      id="outlined-required"
                      helperText="no of stages"
                      value={plandata.plan.no_of_stages}
                      variant="outlined"
                    />

                    <div>
                      {
                        stages.map((items) => {
                          return (<>
                            <input type="text" value={items} className="form-control"

                              style={{
                                width: '150px',
                                backgroundColor: 'Window',
                                marginLeft: '0.5rem'
                              }} />
                            <br></br>
                          </>)
                        })
                      }
                    </div>

                    <div>
                      {stageprice.map((data) => {
                        return (<>
                          <input type="text" value={data} className="form-control"

                            style={{
                              width: '80px',
                              backgroundColor: 'Window',
                              marginLeft: '0.5rem'
                            }} />
                          <br></br>
                        </>)
                      })}
                      <br></br></div>
                  </div>

                  <button className='btn btn-info mr-2 text-white' onClick={() => { update(plandata._id) }}>Update</button>
                  <button className='btn btn-secondary'>Cancel</button>
                </form>

              </div>

            </div>
          </div>
        </div>
      </div>
    )
  } return (accessToken) ? <PlanviewisLoggedin /> : <App />
}

export default PlanDashboard