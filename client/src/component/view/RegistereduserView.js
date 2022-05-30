import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/home.module.css';
import Requirements from '../requirements'
import Sidebar from '../sidebar'
import Userview from './userview';
import {
    PersonPin, Edit, Delete, Add
} from "@material-ui/icons";

import moment from 'moment';

import { useHistory } from 'react-router-dom';


function UserslistView() {
    const [userlist, setUserlist] = useState({ users: [] });
    const getUserdata = () => {
        axios
          .get('/api/viewlogin', {
            headers: {
              'Content-Type': 'Application/json'
            }
          })
          .then((res) => {
            // console.log(res.data.details);
            setUserlist({ users: res.data.details })
            // console.log("userlist :", userlist)
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    
      useEffect(() => {
        getUserdata();
      })
    
    return (
        <>
            <div className={styles}>
                <div className={styles.top}>
                    <p >AGRIHA</p>
                
                </div>
                <div className={styles.bottom}>
                    <div style={{ width: '180px' }} >

                        <Sidebar></Sidebar>

                    </div>

                    <div>

                        <div className="ml-5 mt-3">
                            <table className="table table-hover">
                                <thead className={styles.tableview}>

                                    <tr>
                                        <th scope="col" style={{ width: '2%' }}>  </th>
                                        <th scope="col" style={{ width: '4%' }}>customer </th>
                                        <th scope="col" style={{ width: '8%' }}>Phonenumber</th>
                                        <th scope="col" style={{ width: '8%' }}>Role</th>
                                        <th scope="col" style={{ width: '10%' }}> Created at</th>
                                
                                    </tr>

                                </thead>

                                {
                                    userlist.users.map((data, i) => {
                                        console.log("data :", data)
                                        // {
                                        //   if (datas.userlogindetails.length != 0) {
                                        return (
                                            //  <label style={{ color: "white" }}>username :{datas.uname}</label>
                                            <tbody>
                                                <tr >
                                                    <td style={{ color: '#04524b' }}><PersonPin /></td>
                                                    <td>{i + 1}</td>
                                                    <td>{data.phonenumber}</td>
                                                    <td>{data.roletype}</td>
                                                    <td>{moment(data.createdAt).format('DD-MM-YYYY')}</td>
                                                </tr>
                                            </tbody>
                                        )
                                        //   }
                                        // }


                                    })
                                }
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default UserslistView;
