import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/home.module.css';
import Requirements from '../requirements'
import Sidebar from '../sidebar'
import Userview from './userview';
import {
	PersonPin,Edit,Delete,Add
  } from "@material-ui/icons";


function UserslistView() {

	const logout = () => {
		axios
			.get('http://localhost:8888/logout')
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
		{/* {data} */}

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
					{/* {userlist.map((data, i) => {
					return <label key={i}>{data.uname}</label>} */}

					<button 
					className={styles.addbutton}> 
					<Add/> User</button>
					<Userview/>
					
					{/* <Requirements/> */}
				
					
					
				</div>

			</div>
		</div>
		</>
	);
}

export default UserslistView;
