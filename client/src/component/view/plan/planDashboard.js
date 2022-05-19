import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import styles from '../../styles/home.module.css';
import Sidebar from '../../sidebar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


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

  const [plandata, setPlandata] = useState({
    plan: "",
    plan_name: '',
    plan_amount: '',
    plan_services: [],
    initial_payment: '',
    stages:[]
  });
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
      .get(`http://localhost:8888/viewsingleplan/${id}`)
      .then((res) => {
        // console.log(res.data.details);
        // setPlandata({ plan_name: res.data.details.plan_name })
        setPlandata({ plan: res.data.details })

        console.log("single plan :", plandata);

      })
      .catch((err) => {
        console.log(err.response);
      });
  }


const handleChange=(e)=>{
  // setPlandata({...state,[e.target.name]:value})

}
  useEffect(() => {
    getPlandata();
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
  const update = (id) => {
    console.log("id :", id)
  }
  const classes = useStyles();

  return (
    <div className={styles}>
      <div className={styles.top}>
        <p >AGRIHA</p>

        <h3 style={{ marginTop: '1rem', float: "left" }}>Plan </h3>

        <button onClick={logout} className={styles.logout}>
          Log out
        </button>

      </div>

      <div className={styles.bottom}>
        <div style={{ width: '180px' }} >

          <Sidebar></Sidebar>

        </div>

        <div style={{ marginLeft: "3rem", marginTop: '1rem', marginBottom: '2rem', width: '100%' }}>

          <div style={{ width: '100%', display: 'flex' }}>
            {/* <div style={{
              height: '150px',
              width: '150px', borderRadius: '20px',
              boxShadow: '5px 2px 10px #030333', marginBottom: '2rem'
    onChange={(e)=>{console.log(e.target.value);setPlan({plan_name:e.target.value})}}        }}>

              <h5 style={{ margin: '5rem' }}>
                {plandata.plan.plan_name}

              </h5>
            </div> */}

            <div style={{
              height: '500px', marginLeft: '2rem', padding: '1rem',
              width: '800px', borderRadius: '20px',
              boxShadow: '5px 2px 10px #030333', marginBottom: '2rem'
            }}>

              <form className={classes.root}>
                <div className="form-group">

                  <input type="text" className="form-control"

                    style={{ width: '175px',
                    backgroundColor:'Window',
                    marginLeft:'0.5rem' }}
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
                  <TextField
                  required
                  id="outlined-required"
                  helperText="initial payment"
                  value={plandata.plan.no_of_stages}
                  variant="outlined"
                />
<br></br>
                <TextField
                  required
                  id="outlined-required"
                  multiline
                  style={{ width: '350px', height: '150px' }}
                  value={plandata.plan.plan_services}
                  variant="outlined"
                  helperText="services provided"
                />

                <br></br>


                <button className='btn btn-info mr-2 text-white' onClick={() => 
                  { update(plandata._id) }}>Update</button>
                <button className='btn btn-secondary'>Cancel</button>
              </form>



              {/* {plandata.plan.plan_services.map((data) => {
                          return (
                            <p>{data}</p>)
                        })} */}


            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanDashboard