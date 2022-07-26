import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/home.module.css';
import Requirements from '../../requirements'
import Sidebar from '../../sidebar'
import Clientview from './Clientview';
import {
	PersonPin, Edit, Delete, Add
} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
// import App from '../../App';

// import DataTable from './DataTable'
// import useTable from '../useTable'
import Header from '../../header';

const cookies = new Cookies();

function ClientlistView() {

	const accessToken = cookies.get('authSession');
	console.log("accessToken :", accessToken);


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

						<div style={{marginTop:'1rem',marginLeft: '1rem'}}>

							{/* <Link to="/registereduser"><button
								className={styles.addbutton}>
								<Edit /> Registered users</button></Link> */}


							<Link to="/createclient">	<button
								className={styles.addbutton}>
								<Add /> Create Client</button></Link>


							<Clientview />

						</div>

					</div>
				</div>
			</>
		);

}

export default ClientlistView;
