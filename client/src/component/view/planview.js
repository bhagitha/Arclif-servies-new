import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/home.module.css';
import {
    Receipt, Edit, Delete
} from "@material-ui/icons";


function PlanView() {
    const [planlist, setPlanlist] = useState({ plans: [] });


    const getPlandata = () => {
        axios
            .get('http://localhost:8888/viewplan')
            .then((res) => {
                console.log(res.data.details);
                setPlanlist({ plans: res.data.details })
                console.log("userlist :", planlist)
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    useEffect(() => {
        getPlandata();
    })
    return (
        <>
            <div className="ml-5">
                <table className="table table-hover" >
                    <thead className={styles.tableview}>
                        <tr>
                            <th scope="col" style={{width:'8%'}}></th>
                            <th scope="col" style={{width:'8%'}}>Plan id</th>
                            <th scope="col" style={{width:'10%'}}>Plan Name</th>
                            <th scope="col" style={{width:'10%'}}>Plan Amount</th>
                            <th scope="col" style={{width:'20%'}}>plan_services</th> 
                            <th scope="col" style={{width:'20%'}}>initial_payment </th>
                            <th scope="col" style={{width:'8%'}}></th>
                            <th scope="col" style={{width:'8%'}}></th>
                        </tr>
                    </thead>

                    {planlist.plans.map((datas, i) => {
                        console.log("data :", datas)

                        return (
                            //  <label style={{ color: "white" }}>username :{datas.uname}</label>
                            <tbody>
                                <tr>
                                    <td style={{ color: '#04524b' }}><Receipt /></td>
                                    <td>{i+1}</td>
                                    <td>{datas.plan_name}</td>
                                    <td>{datas.plan_amount}</td>
                                   {datas.plan_services.map((data) => {
                                        return (
                                            <tr>{data}</tr>)
                                    })}
                                    <td>{datas.initial_payment}</td>
                                    <td><Edit /></td>
                                    <td><Delete /></td>
                                </tr>

                            </tbody>

                        )
                    })
                    }
                </table>
            </div>
        </>
    )
}

export default PlanView