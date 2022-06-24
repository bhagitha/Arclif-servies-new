import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/home.module.css';
import moment from 'moment';
import {
  PersonPin, Edit, Delete
} from "@material-ui/icons";
import UserDashboard from './UserDashboard';
import { useHistory } from 'react-router-dom';
import '../styles/pagination.css'
import Pagination from '../add/Pagination'

axios.defaults.withCredentials = true;

function Userview() {

  const history = useHistory();
  const [userlist, setUserlist] = useState({ users: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const getUserdata = () => {

    axios
      .get('/api/viewuser', {
        headers: {
          'Content-Type': 'Application/json'
        }
      })
      .then((res) => {
        setUserlist({ users: res.data.details })
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  useEffect(() => {
    getUserdata();
  })

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userlist.users.slice(indexOfFirstPost, indexOfLastPost);
  console.log("currentPosts : ", currentPosts)

  const Paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

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

        <table id="dtBasicExample" className="table table-hover table-striped table-bordered bg-white">
          <thead className={styles.tableview}>

            <tr>
              <th scope="col" style={{ width: '2%' }}>  </th>
              <th scope="col" style={{ width: '5%' }}>Customer </th>
              <th scope="col" style={{ width: '10%' }}>Name</th>
              <th scope="col" style={{ width: '10%' }}>Place</th>
              <th scope="col" style={{ width: '10%' }}>Phonenumber</th>
              <th scope="col" style={{ width: '10%' }}>Created at</th>
              <th scope="col" style={{ width: '5%' }}></th>
              <th scope="col" style={{ width: '5%' }}></th>
            </tr>

          </thead>
          {
            currentPosts.map((datas, i) => {
              // console.log("data :", datas)
              const table = document.getElementById('dtBasicExample')

              {
                // if (datas.userlogindetails.length != 0) {
                  return (
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
              // }

            })
          }
        </table>

        <div className="pagination">
          <Pagination postsPerPage={postsPerPage} totalPosts={userlist.users.length}
            Paginate={Paginate} />

        </div>
      </div>
    </>
  )
}


export default Userview