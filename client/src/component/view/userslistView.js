import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/home.module.css';
import Requirements from '../requirements'
import Sidebar from '../sidebar'
import Userview from './userview';
import {
	PersonPin, Edit, Delete, Add
} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import App from '../../App';

import DataTable from './DataTable'
import useTable from '../useTable'

const cookies = new Cookies();

function UserslistView() {

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
						{/* <button onClick={logout} className={styles.logout}> */}
						{/* Log out
				</button> */}
					</div>

					<div className={styles.bottom}>
						<div style={{ width: '180px' }} >

							<Sidebar></Sidebar>

						</div>

						<div>

							<Link to="/registereduser"><button
								className={styles.addbutton}>
								<Edit /> Registered users</button></Link>


							<Link to="/createuser">	<button
								className={styles.addbutton}>
								<Add /> Create customer</button></Link>


							<Userview />
{/* <DataTable/> */}

						</div>

					</div>
				</div>
			</>
		);
	}
	return (accessToken) ? <UserviewisLoggedin /> : <App />
}

export default UserslistView;
