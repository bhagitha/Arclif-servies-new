import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/home.module.css';
import moment from 'moment';
import {
  PersonPin, Edit, Delete
} from "@material-ui/icons";
import UserDashboard from './UserDashboard';
import { useHistory } from 'react-router-dom';


function Userview() {
  const history = useHistory();
  const [userlist, setUserlist] = useState({ users: [] });


  const getUserdata = () => {
    axios
      .get('/api/viewuser', {
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


  const deleteUser = (loginid, userid) => {
    axios.delete(`/api/deleteuser`, {
      loginid: loginid, userid: userid
    })
      .then((response) => {
        console.log(response)
      })
  }
  const viewuser = (id) => {
    history.push(`/userdashboard/${id}`)


  }
  return (
    <>
      <div className="ml-5">
        <table className="table table-hover">
          <thead className={styles.tableview}>

            <tr>
              <th scope="col" style={{ width: '2%' }}>  </th>
              <th scope="col" style={{ width: '8%' }}>customer </th>
              <th scope="col" style={{ width: '10%' }}>Name</th>
              <th scope="col" style={{ width: '10%' }}>Place</th>
              <th scope="col" style={{ width: '10%' }}>Phonenumber</th>
              <th scope="col" style={{ width: '10%' }}> Created at</th>
              <th scope="col" style={{ width: '8%' }}></th>
              <th scope="col" style={{ width: '8%' }}>

              </th>
            </tr>

          </thead>

          {
            userlist.users.map((datas, i) => {
              console.log("data :", datas)
              {
                if (datas.userlogindetails.length != 0) {
                  return (
                    //  <label style={{ color: "white" }}>username :{datas.uname}</label>
                    <tbody>
                      <tr >
                        <td style={{ color: '#04524b' }}><PersonPin /></td>
                        <td>{i + 1}</td>
                        <td>{datas.uname}</td>
                        <td>{datas.Place}</td>
                        {datas.userlogindetails.map((data) => {
                          return (<>
                            <td>{data.phonenumber}</td>

                            <td>{moment(data.createdAt).format('DD-MM-YYYY')}</td>
                            <td><Edit onClick={() => { viewuser(data._id) }} /></td>
                            <td><Delete style={{ color: 'red' }} onClick={() => { deleteUser(data._id, datas._id) }} /></td>
                          </>
                          )
                        })}
                      </tr>
                    </tbody>
                  )
                }
              }


            })
          }
        </table>
      </div>
    </>
  )
}

export default Userview