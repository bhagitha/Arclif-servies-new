import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import axios from 'axios';
import styles from '../styles/home.module.css';
import Requirements from '../requirements'
import Sidebar from '../sidebar'
import { useParams, useHistory, Link } from "react-router-dom";
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

function AdStages() {
    const [stage, setStages] = useState('')
    const [rate, setRate] = useState('')
    const [services, setServices] = useState([])

    const classes = useStyles();
     const planid=useParams()
     console.log(planid)


     const AdStage=(e)=>{

        e.preventDefault();

         const items={
             plan_id:planid,
             stage:stage,
             rate:rate, 
             services:services
         }
         console.log("stage items: ",items)

// axios.post('/api/addstage',items).then((response)=>{

// })
     }

    return (
        <div>
            <div className={styles}>
                <div className={styles.top}>
                    <p >AGRIHA</p>
                    <h3 style={{ marginTop: '3rem', float: "left" }}>Create stages </h3>

                    <button className={styles.logout}>
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

                        <div className="container">
                            <div className="row">
                                <form className={classes.root} onSubmit={AdStage}>
                                    <div className="form-group">
                                        <label>stage name</label>
                                        <input type="text" className="form-control"
                                            style={{
                                                width: '175px',
                                                backgroundColor: 'Window',
                                                marginLeft: '0.5rem'
                                            }}
                                            placeholder="stage name"
                                            name="stage"
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                // handleChange(e)
                                                setStages(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>stage rate</label>
                                        <input type="text" className="form-control"
                                            style={{
                                                width: '175px',
                                                backgroundColor: 'Window',
                                                marginLeft: '0.5rem'
                                            }}
                                            placeholder="rate"
                                            name="rate"
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                // handleChange(e)
                                                setRate(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>stage Services</label>
                                        <input type="text" className="form-control"
                                            style={{
                                                width: '175px',
                                                backgroundColor: 'Window',
                                                marginLeft: '0.5rem'
                                            }}
                                            placeholder="services"
                                            name="services"
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                // handleChange(e)
                                                setServices([...services,e.target.value])
                                            }}
                                        />
                                        
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Add stages"/>
                                        </div>

                                </form>
                            </div>

                            <div>


                            </div>
                        </div></div>
                </div>
            </div>
        </div>
    )
}

export default AdStages