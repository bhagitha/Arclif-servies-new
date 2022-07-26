import React, { useState } from 'react';
import styles from './styles/style.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { PhoneIphone } from "@material-ui/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OtpVerify(props) {
	const history = useHistory();
	axios.defaults.withCredentials = true;

	const [error, setError] = useState({
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
			.post('/api/verifyOTP', {
				phonenumber: `${value.phone}`,
				roletype: 'Admin',
				hash: `${value.hash}`,
				otp: `${value.otp}`,
				msg: 'Admin verify',
				withCredentials: true
			})
			.then(function (res) {
				console.log("res :", res)
				// const hash = res.data.hash;
				// hashHandleChange(hash);
				// console.log("data user :", res.data.data[0].data[0]);
				// console.log("roletype user :", res.data.data[0].data[0].roletype);
				if (res.data.msg == 'login verified' || res.data.msg == 'register verified') {
					if (res.data.data[0].data[0].roletype == 'Admin') {
						// window.location.reload();
						history.push('/home')
					} else {
						// history.push('/home')
						toast.error('Admin not found !!')
					}
				} else {
					toast.error(res.data.msg)
				}
			})
			.catch(function (error) {
				console.log("error :", error);
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
					{/* <div className={styles.input_text_otp}> </div> */}
					<div className={styles.input_container}>
						<PhoneIphone style={{ color: 'eec71c', marginTop: '0.5rem', width: "10%", fontSize: "32px", marginLeft: 10 }} />

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
			<div className="form-group">
				<ToastContainer />
			</div>
		</div>
	);
}

export default OtpVerify;
