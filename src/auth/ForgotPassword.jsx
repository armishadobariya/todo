import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import todo from '../images/todo.png'
import img from '../images/forgot_img.png';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import '../index.css'
import { forgotPasswordUrl, verifyOtpUrl } from './Api';

const RedditTextField = styled((props) => (
	<TextField InputProps={{ disableUnderline: true }} {...props} />
))
	(({ theme }) => ({
		'& .MuiFilledInput-root': {
			overflow: 'hidden',
			borderRadius: 4,
			backgroundColor: 'transparent',
			border: '1px solid',
			width: '300px',
			'&:hover': {
				backgroundColor: 'transparent',
			},
			'&.Mui-focused': {
				backgroundColor: 'transparent',
			},
		},
	}));



const ForgotPassword = () => {

	const [email, setEmail] = useState("");

	const navigate = useNavigate();

	const [otp, setOtp] = useState("");
	const [response, setResponse] = useState(null);
	const [showOtp, setShowOtp] = useState(false);
	const [verifyEmail, setVerifyEmail] = useState(" ");


	const VerifyOtp = async (e) => {
		try {
			e.preventDefault();
			const reqdata = {
				email: email,
				otp: otp,
			};
			const responseData = await axios.post(verifyOtpUrl, reqdata);
			setResponse("success: ", responseData.data);
			navigate("/ResetPassword", { state: email });
		}
		catch (error) {
			setResponse(error);
			setResponse("error:", 'error');
		}

	};

	// const ForgotPassword = async (e) => {
	// 	try {
	// 		e.preventDefault();
	// 		const reqdata = {
	// 			email: email,
	// 		};
	// 		const responseData = await axios.post(forgotPasswordUrl, reqdata);
	// 		setResponse("success: ", responseData.data);
	// 	}
	// 	catch (error) {
	// 		setResponse(error);
	// 		setResponse("error:", 'error');
	// 	}
	// };

	const toggleForm = () => {
		setShowOtp(!showOtp);
		console.log('form toggeld');
	}

	const checkEmailExists = async () => {
		try {
			const reqdata = {
				email: email,
			};
			const responseData = await axios.post(forgotPasswordUrl, reqdata);
			setVerifyEmail(responseData.data.message);
			toggleForm();
			// if (responseData.data.exists) {
			// 	toggleForm(); // Open the form if the email exists
			// }
		} catch (error) {
			setVerifyEmail("Email not found");
		}
	};

	return (
		<div className="forgot_main">
			{/* <div className="msg">
				{response && <div> {response}</div>}

			</div> */}

			<div className="msg">
				{response && <div>{response.message}</div>}
			</div>


			<div className="col">
				<div className="forgot_child">
					<img src={todo} alt="" height='37px' width='140px' />
				</div>

				<div className="content">
					<h1>Forgote Your Password?</h1><br />
					<p>To reset your password, please enter the your email address of your todoist account.</p><br /><br />

					<RedditTextField
						label="Email"
						defaultValue=""
						placeholder="Enter Your Email..."
						id="reddit-input"
						variant="filled"
						style={{
							marginTop: 11,
							width: 200
						}}
						InputLabelProps={{
							style: { color: 'black' }
						}}
						value={email}
						onChange={(e) => { setEmail(e.target.value) }}

					/>

					<br />
					<p style={{ color: "red" }}>{verifyEmail}</p>

					{!showOtp && <div style={{ cursor: "pointer" }}>
						<Button style={{
							borderRadius: 7,
							backgroundColor: "#dc4c3e",
							padding: "6px 30px",
							fontSize: "16px",
							width: '300px',
							height: '50px',

						}} variant="contained" disableElevation onClick={checkEmailExists}>
							Get OTP
						</Button> <br /><br />


					</div>
					}

					{showOtp && (
						<>
							<RedditTextField
								label="Enter OTP"
								defaultValue=""
								placeholder="Enter Verify OTP..."
								id="reddit-input"
								variant="filled"
								style={{
									marginTop: 11,
									width: 200
								}}
								InputLabelProps={{
									style: { color: 'black' }
								}}
								value={otp}
								onChange={(e) => { setOtp(e.target.value) }}

							/>
							<br /><br />

							<Button style={{
								borderRadius: 7,
								backgroundColor: "#dc4c3e",
								padding: "6px 30px",
								fontSize: "16px",
								width: '300px',
								height: '50px',
							}} variant="contained" disableElevation onClick={VerifyOtp}>
								Reset my password
							</Button>
						</>
					)}

					<br /><br />

					<div className="forgot_end">
						<hr className='forgotline' />
						<a href="/Signin" className='loginlink'>Go to login</a>
					</div>

				</div>
			</div>
			<div className="col2">
				<div className="forgot_img">
					<img src={img} width="600px" alt="" />
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword;