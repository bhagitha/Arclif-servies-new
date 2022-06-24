import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/home.module.css';
import Sidebar from '../sidebar'
import {
    PersonPin, Edit, Delete, Add
} from "@material-ui/icons";
import moment from 'moment';
import Cookies from 'universal-cookie';
import App from '../../App';
import Header from '../header';
import Pagination from '../add/Pagination';

const cookies = new Cookies();

function UserslistView() {

    const accessToken = cookies.get('authSession');
    console.log("accessToken :", accessToken);

    function UserisLoggedin() {

        const [userlist, setUserlist] = useState({ users: [] });
        const [currentPage, setCurrentPage] = useState(1);
        const [postsPerPage] = useState(10);

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

        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = userlist.users.slice(indexOfFirstPost, indexOfLastPost);
        console.log("currentPosts : ", currentPosts)

        const Paginate = (pageNumber) => {
            setCurrentPage(pageNumber)
        }

        return (
            <>
                <div className={styles}>
                    <div>
                        <Header />
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
                                            <th scope="col" style={{ width: '10%'}}> Created at</th>
                                        </tr>

                                    </thead>

                                    {
                                        currentPosts.map((data, i) => {
                                            // console.log("data :", data)
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
                            <div className="pagination">
                                <Pagination postsPerPage={postsPerPage} totalPosts={userlist.users.length}
                                    Paginate={Paginate} />

                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    }
    return (accessToken) ? <UserisLoggedin /> : <App />
}
export default UserslistView;
