import React, { useState } from 'react';
import styles from './styles/style.module.css';
import axios from 'axios';
import {useHistory} from  'react-router-dom';

import { PhoneIphone } from "@material-ui/icons";


function OtpVerify(props) {
	const history = useHistory();
	axios.defaults.withCredentials = true;

	const [ error, setError ] = useState({
		error: '',
		success: ''
	});
	const { value, handleChange } = props;
	const back = (e) => {
		e.preventDefault();
		props.prevStep();
	};

	const confirmOtp = () => {
		axios
			.post('http://localhost:8888/verifyOTP', {
				phonenumber: `${value.phone}`,
				roletype:'Admin',
				hash: `${value.hash}`,
				otp: `${value.otp}`,
				msg:'Admin verify',
				withCredentials: true
			})
			.then(function(res) {
				console.log(res.data);
				if(res.data.roletype=='Admin')
				{
				// window.location.reload();
history.push('/home')
				}else{
					history.push('/home')
				}
			})
			.catch(function(error) {
				console.log(error.response.data);
				setError({ ...error, error: error.response.data.msg });
			});
	};
	return (
		<div className={styles}>
			<div className={styles.background}>
				<div className={styles.container}>
					<div className={styles.heading}>Otp verify</div>
					<div className={styles.error}>{error.error}</div>
					<div className={styles.success}>{error.success}</div>
					<div className={styles.input_text}> Enter One Time Password:</div>
					<div className={styles.input_container}>
		<PhoneIphone style={{color:'teal',  marginTop: '0.5rem',width: "10%",fontSize:"32px",marginLeft:10 }}/>

						<input
							type="tel"
							value={value.otp}
							onChange={handleChange('otp')}
							placeholder="Enter the 6 digits OTP"
							className={styles.input}
						/>
					</div>
					<button onClick={back} className={styles.back}>
						Back
					</button>
					<button onClick={confirmOtp} className={styles.submit}>
						Confirm OTP
					</button>
					
				</div>
			</div>
		</div>
	);
}

export default OtpVerify;
