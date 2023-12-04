import React from 'react';
import todo from "../images/Todoist_logo.png";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import "./Signin.css";
import sipic from "../images/signin.png";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUrl } from './Api.jsx';
import { googleLoginUrl } from './Api.jsx';
import GoogleButton from 'react-google-button';
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from 'jwt-decode';
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

	// function alert(type, msg) {
	// 	const bs_class = (type === "success") ? "alert-success" : "alert-danger";

	// 	return (
	// 		<div className={`alert ${bs_class} alert-dismissible fade show custom-alert`} role="alert">
	// 			<strong className="me-3">{msg}</strong>
	// 			<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	// 		</div>
	// 	);
	// }

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
				navigate("/", { state: email });
			}

		}
		catch (error) {

			setResponse(alert(error.response.data.message));

			// setResponse(alert("error", 'Email or Password not exists'));
		}
	};

	// const [showPassword, setShowPassword] = React.useState(false);

	// const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleKeyDown = (event) => {
		console.log("clicked");

		if (event.key === 'Enter') {
			console.log("enter clicked");
			LoginUser(event);

		};
	}

	return (
		<>

			<div className="log_main">
				<div className="msg1">
					{response && <div> {response}</div>}
				</div>
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
								<GoogleOAuthProvider clientId="295805594505-sq8l6g2m1dlgnlepvim7h03gmo48gco3.apps.googleusercontent.com">
									<GoogleLogin
										onSuccess={async (credentialResponse) => {
											try {
												console.log(credentialResponse);
												const data = jwtDecode(credentialResponse.credential)
												console.log(data)

												const token = credentialResponse.credential;
												const response = await axios.post(googleLoginUrl, {
													"token": token,
												});

												if (response.status === 200) {

													const { token } = response.data;
													localStorage.setItem("token", token);
													navigate("/");
												}

												console.log('Google Login Response:', response.data);

											} catch (error) {
												console.error('Error:', error.message);
											}
										}}
										onError={() => {
											console.log('Login Failed');
										}}
									/>
								</GoogleOAuthProvider>
								{/* <LoginSocialFacebook
									appId="654047430249892"
									onResolve={(response) => {
										console.log(response);

									}}
									onReject={(error) => {
										console.log(error);
									}}
								>
									<FacebookLoginButton style={{ width: '379px', marginLeft: '0px', marginBottom: '12px' }} />
								</LoginSocialFacebook> */}
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
										onKeyDown={handleKeyDown}
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