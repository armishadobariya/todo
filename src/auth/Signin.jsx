import React from 'react';
import todo from "../images/Todoist_logo.png";
import google from "../images/goo.png";
import facebook from "../images/face.png";
import apple from "../images/apple.png";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import "./Signin.css";
import sipic from "../images/signin.png";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUrl } from './Api.jsx';

import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
const RedditTextField = styled((props) => (
	<TextField InputProps={{ disableUnderline: true }} {...props} />
))
	(({ theme }) => ({
		'& .MuiFilledInput-root': {
			overflow: 'hidden',
			borderRadius: 4,
			backgroundColor: 'transparent',
			border: '1px solid',
			width: '380px',
			'&:hover': {
				backgroundColor: 'transparent',
			},
			'&.Mui-focused': {
				backgroundColor: 'transparent',
			},
		},
	}));



const Signin = () => {
	const navigate = useNavigate();


	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [response, setResponse] = useState(null);
	const [verificationResult, setVerificationResult] = useState('');

	function alert(type, msg) {
		const bs_class = (type === "success") ? "alert-success" : "alert-danger";

		return (
			<div className={`alert ${bs_class} alert-dismissible fade show custom-alert`} role="alert">
				<strong className="me-3">{msg}</strong>
				<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>
		);
	}

	const LoginUser = async (e) => {
		try {
			e.preventDefault();
			const reqdata = {
				email: email,
				password: pass,
			};
			const responseData = await axios.post(signInUrl, reqdata);
			if (responseData.status === 200) {

				const { token } = responseData.data;
				localStorage.setItem("token", token);
				// setResponse(alert("success", "Register Successfully ..."));
				navigate("/");

			}
			// if (!responseData.data.email.exists) {
			// 	setVerificationResult('email not exists');
			// }
			// else if (!responseData.data.password.exists) {
			// 	setVerificationResult('password not exists');
			// }
			// else {
			// 	setVerificationResult('Data Exists');
			// }
		}
		catch (error) {
			setResponse(alert("error", 'Email or Password not exists'));
			// setVerificationResult('123');
		}

	};





	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	// const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
	// 	event.preventDefault();
	// }

	return (
		<>

			<div className="log_main">
				<div className="msg1">
					{response && <div> {response}</div>}
				</div>
				{/* <div className="msg">
					{response && <div>{response.message}</div>}
				</div> */}


				<div className="div_1">
					<div className="log_header">
						<img src={todo} alt="logo" height="37px" width="140px" />
					</div>
					<div className="log_child">
						<h1 className='chead1'>Log in</h1>
					</div>
					<div className="form">
						<form action="">
							<div className="log_icon">

								<div className='log_google'>
									{/* <GoogleIcon /> Continue with Google */}
									<img src={google} alt="google image" height='30px' width='30px' /> <strong className='go' >  Continue with Google </strong>
								</div>
								<div className='log_google'>
									<img src={facebook} alt="facebook image" height='20px' width='20px' style={{ marginRight: '7px' }} /> <strong className='face'>  Continue with Facebook</strong>
								</div>
								<div className='log_google'>
									<img src={apple} alt="apple image" height='30px' width='30px' /><strong className='app'>  Continue with Apple</strong>
								</div>
								{/* <fieldset className='line' /> */}
								<hr className='log_line' />
							</div>


							<div className="inp_data">

								<div>
									<RedditTextField
										label="Email"
										defaultValue=""
										placeholder="Enter Your Email..."
										id="reddit-input"
										variant="filled"
										style={{ marginTop: 11 }}
										InputLabelProps={{
											style: { color: 'black' }
										}}
										value={email}
										onChange={(e) => { setEmail(e.target.value) }}

									/>
								</div>
								<h1>{verificationResult}</h1>
								<div>
									<RedditTextField
										label="Password"
										defaultValue=""
										placeholder="Enter Your Password..."
										id="reddit-input"
										variant="filled"
										type="password"
										style={{ marginTop: 11 }}
										InputLabelProps={{
											style: { color: 'black' }
										}}
										value={pass}
										onChange={(e) => { setPass(e.target.value) }}
									/>

								</div>
							</div>
							<div className='btn'>
								<Button style={{
									borderRadius: 7,
									backgroundColor: "#dc4c3e",
									padding: "6px 30px",
									fontSize: "16px",
									width: '380px',
									height: '52px',
									marginBottom: '13px',
									marginLeft: '-14px'


								}} variant="contained" disableElevation onClick={LoginUser}>
									Log in
								</Button> <br /><br />
							</div>
							<div className="forget1">
								<a href="/ForgotPassword">Forget Your Password?</a>
							</div>
							<div className="pra1">
								<p>By continuing with Google, Apple, or Email
									, you agree to Todoist's
								</p>
								<a href='Terms of Service'>Terms of Service</a> and <a href='Privacy Policy'>Privacy Policy</a><p>.</p><br />
								<hr className='line2' />

							</div>
							<div>
							</div>
							<div className='footer1'>
								<p>Don't have an account? <a href="/Signup" className='login'>Sign Up</a></p>
							</div>

						</form>
					</div>
				</div>
				<div className="div_21">
					<img src={sipic} alt="sign in img" height="230px" width="450px" />
				</div>
			</div>
		</>
	)
}

export default Signin;