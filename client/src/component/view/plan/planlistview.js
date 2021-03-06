import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/home.module.css';
import Sidebar from '../../sidebar'
import {
	PersonPin, Edit, Delete, Add
} from "@material-ui/icons";
import PlanView from './planview'
import Cookies from 'universal-cookie';
import App from '../../../App';
import Header from '../../header'

const cookies = new Cookies();

function PlanlistView() {

	const accessToken = cookies.get('authSession');
	console.log("accessToken :", accessToken);

	function PlanviewisLoggedin() {

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
					<div >
						<Header/>
					</div>

					<div className={styles.bottom}>
						<div style={{ width: '180px' }} >

							<Sidebar></Sidebar>

						</div>

						<div>

							<button
								className={styles.addbutton}>
								<Add /> Plan</button>
							<PlanView />


						</div>

					</div>
				</div>
			</>
		);
	}
	return (accessToken) ? <PlanviewisLoggedin /> : <App />
}

export default PlanlistView;
