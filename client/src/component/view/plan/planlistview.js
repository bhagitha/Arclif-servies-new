import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/home.module.css';
import Sidebar from '../../sidebar'

import {
	PersonPin,Edit,Delete,Add
  } from "@material-ui/icons";
  import PlanView from './planview'

axios.defaults.withCredentials = true;

function PlanlistView() {

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
				
					<button 
					className={styles.addbutton}> 
					<Add/> Plan</button>
					<PlanView/>
					
				
				</div>

			</div>
		</div>
		</>
	);
}

export default PlanlistView;
