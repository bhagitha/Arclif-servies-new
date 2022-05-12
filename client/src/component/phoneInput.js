import React, { useState } from 'react';
import styles from './styles/style.module.css';
import axios from 'axios';
import PhoneInputs from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { PhoneIphone } from "@material-ui/icons";

function PhoneInput(props) {
	const { value, handleChange, hashHandleChange } = props;
	// const [phonenumber, setPhonenumber] = useState(0);

	const Continue = (e) => {
		console.log(`Phone : ${value.phone}`)
		axios
			.post('http://localhost:8888/sendOTP', {
				phonenumber: `${value.phone}`
			})
			.then(function (res) {
				console.log(res.data.otp);
				const hash = res.data.hash;
				hashHandleChange(hash);
			});

		e.preventDefault();
		props.nextStep();
	};
	return (
		<div className={styles}>
			<div className={styles.background}>

				<div className={styles.container}>
					<div className={styles.heading}>AGRIHA ADMIN</div>

					<div className={styles.input_text}></div>
					<div className={styles.input_container}>

						<PhoneIphone style={{ 
							color: 'teal', marginTop: '0.5rem', width: "10%", fontSize: "32px", 
							marginLeft: 10 }} />

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
							/>
						</div>
					</div>
					<button onClick={Continue} className={styles.submit}>
						Send OTP
					</button>
				</div>
			</div>
		</div>
	);
}

export default PhoneInput;
