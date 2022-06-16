import React, { useState } from 'react';
import styles from './styles/style.module.css';
import axios from 'axios';
import PhoneInputs from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { PhoneIphone } from "@material-ui/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PhoneInput(props) {
	const { value, handleChange, hashHandleChange } = props;
	// const [phonenumber, setPhonenumber] = useState(0);

	const Continue = (e) => {
		console.log(`Phone : ${value.phone}`)
		console.log(`Phone length : ${value.phone.length}`)
		const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
	

		console.log(`Phone is a number : ${regex.test(value.phone)}`)

		if (value.phone != '' && value.phone.length == 10 ) {
			axios
				.post('/api/sendOTP', {
					phonenumber: `${value.phone}`,
					flag: 'login'
				})
				.then(function (res) {
					console.log(res.data.otp);
					const hash = res.data.hash;
					hashHandleChange(hash);
				});

			e.preventDefault();
			props.nextStep();
		} else {
			toast.error("Invalid phone number !!")
		}
	}
	return (
		<div className={styles}>
			<div className={styles.background}>

				<div className={styles.container}>
					<div className={styles.heading}>AGRIHA ADMIN</div>

					<div className={styles.input_text}></div>
					<div className={styles.input_container}>

						<PhoneIphone style={{
							color: 'teal', marginTop: '0.5rem', width: "10%", fontSize: "32px",
							marginLeft: 10
						}} />

						<div style={{ width: "20%", paddingLeft: "5px", paddingRight: '5px' }}>
							<PhoneInputs
								className={styles.countrycode}
								country={'in'}
							// value={value.code}
							// onChange={(e) => { console.log(e); 
							// 	// setPhonenumber(e); 
							// 	handleCodeChange(`+${e}`)}}
							/>
						</div>
						<div style={{ width: "100%" }}>
							<input
								type="tel"
								value={value.phone}
								onChange={handleChange('phone')}
								placeholder="Enter the Phone No."
								className={styles.input}
								required
							/>
						</div>
						<label></label>
					</div>
					<button onClick={Continue} className={styles.submit}>
						Send OTP
					</button>
				</div>
			</div>
			<div className="form-group">
				<ToastContainer />
			</div>
		</div>
	);
}

export default PhoneInput;
