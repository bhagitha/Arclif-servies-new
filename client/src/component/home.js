import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles/home.module.css';
import Requirements from './requirements'
import Sidebar from './sidebar'
import { Link } from 'react-router-dom'
import Userdashboard from './view/UserDashboard'
import Cookies from 'universal-cookie';
import App from '../App';
import AdminDashboard from '../component/view/Admin/AdminDashboard'
import Adminview from '../component/view/Admin/AdminView'

const cookies = new Cookies();

axios.defaults.withCredentials = true;

function Home() {
	const accessToken = cookies.get('authSession');
	console.log("accessToken :", accessToken);

	function UserisLoggedin() {
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
			<div className={styles}>
				
					<div>
					
						<Adminview/>
					</div>
			

			</div>
		);
	}
	return (accessToken) ? <UserisLoggedin /> : <App />
}

export default Home;
