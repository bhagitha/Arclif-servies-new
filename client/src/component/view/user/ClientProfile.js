import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/home.module.css';

import Sidebar from '../../sidebar'

import Cookies from 'universal-cookie';
import App from '../../../App';
import CreateClient from '../user/CreateClient';
import Header from  '../../header';


const cookies = new Cookies();

function ClientProfile() {

    const accessToken = cookies.get('authSession');
    console.log("accessToken :", accessToken);

    function UserviewisLoggedin() {

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

        return (
            <>

                <div className={styles}>
                    <div style={{marginBottom:'1rem'}}>
                       <Header/>
                    </div>
                    <div className={styles.bottom}>
                        <div style={{ width: '180px' }} >
                            <Sidebar></Sidebar>
                        </div>
                        <div style={{ width: '100%' }}>
                            <CreateClient />
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (accessToken) ? <UserviewisLoggedin /> : <App />
}

export default ClientProfile;
