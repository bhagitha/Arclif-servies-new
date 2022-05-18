import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles/home.module.css';
import Requirements from './requirements'
import Sidebar from './sidebar'
import {Link} from 'react-router-dom'
import Userdashboard from './view/UserDashboard'

axios.defaults.withCredentials = true;
function Home() {
	const [state, setState] = useState({
		value: 'Private Protected Route - Home'
	});

	/*  The UseEffect below is used to verify the working of Protected Route. 
	 Do not use it aimlessly as it will cause performance issue and server timout due to infinite execution in loop

	useEffect(() => {
		console.log(state.value)
		axios
			.post('http://localhost:8888/home', {
				withCredentials: true
			})
			.then(function(res) {
				// console.log(res.data);
				setState({ ...state, value: res.data });
			})
			.catch(function(error) {
				console.log(error.response);
			});
	},[state]);
	*/

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
		<div className={styles}>
			<div className={styles.top}>
				<p>ADMIN</p>
				{/* <button onClick={logout} className={styles.logout}>
					Log out
				</button> */}
			</div>
			<div className={styles.bottom}>
			
				<div style={{width: '180px'}} >

				<Sidebar></Sidebar>
				
				</div>	
			
				{/* <Userdashboard/> */}
				{/* <Link to='/userdashboard'> User Dashboard</Link> */}
				{/* <Requirements/> */}
				{/* <div className={styles.card} />
				<div className={styles.words}> {state.value}</div> */}
			</div>
			
		</div>
	);
}

export default Home;
