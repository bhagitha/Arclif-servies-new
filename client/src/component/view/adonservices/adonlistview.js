import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Adonview from '../adonservices/adonview';
import styles from '../../styles/home.module.css';
import Sidebar from '../../sidebar';
import App from '../../../App';

import {
	PersonPin, Edit, Delete, Add
} from "@material-ui/icons";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

axios.defaults.withCredentials = true;

function Adonlistview() {

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
					<div className={styles.top}>
						<p >AGRIHA</p>
					</div>
					<div className={styles.bottom}>
						<div style={{ width: '180px' }} >
							<Sidebar></Sidebar>
						</div>
						<div>
							<button
								className={styles.addbutton}>
								<Add /> Adon </button>
							<Adonview />
						</div>
					</div>
				</div>
			</>
		);
	}

	return (accessToken) ? <UserviewisLoggedin /> : <App />
}

export default Adonlistview;
