import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/home.module.css';
import {
  PersonPin,Edit,Delete
} from "@material-ui/icons";



function Adonview() {
  const [adonlist, setAdonlist] = useState({ adon: [] });


  const getAdondata = () => {
    axios
      .get('/api/viewadonservices')
      .then((res) => {
        // console.log("ad on data : ",res.data.details);
        setAdonlist({ adon: res.data.details })
        // console.log("userlist :", userlist)
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  useEffect(() => {
    getAdondata();
  })

  const getId=(id)=>{
    console.log(id)

  }

  const deleteUser=(loginid,userid)=>{
    axios.delete(`http://localhost:8888/deleteuser`,{
      loginid:loginid,userid:userid
    })
    .then((response)=>{
      console.log(response)
    })
  }
  return (
    <>
    <div className="ml-5">
      <table className="table table-hover">
        <thead className={styles.tableview}>
       
          <tr>
            <th scope="col" style={{width:'2%'}}>  </th>
            <th scope="col" style={{width:'3%'}}>Sl no</th>
            <th scope="col" style={{width:'8%'}}>Adon service </th>
            <th scope="col" style={{width:'8%'}}>Amount</th>  
          
            <th scope="col" style={{width:'6%'}}></th>
            <th scope="col" style={{width:'6%'}}>
              
            </th>
          </tr>
         
        </thead>
        
        {adonlist.adon.map((datas, i) => {
          console.log("adon data :", datas)

          return (
            //  <label style={{ color: "white" }}>username :{datas.uname}</label>
            <tbody>
              <tr>
                <td style={{color:'#04524b'}}><PersonPin/></td>
                <td>{i+1}</td>
                <td>{datas.adonservicename}</td>
                <td>{datas.adonserviceamount}</td>
               
                <td><Edit onClick={()=>{getId(datas._id)}}/></td>
                <td><Delete style={{color:'red'}} onClick={()=>{deleteUser(datas._id)}}/></td>
               
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

export default Adonview