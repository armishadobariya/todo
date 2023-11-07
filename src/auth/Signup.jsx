import React from 'react';
import todo from "../images/Todoist_logo.png";
import google from "../images/goo.png";
import facebook from "../images/face.png";
import apple from "../images/apple.png";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import "../signup.css";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Signup = () => {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [response, setResponse] = useState(null);

	const navigate = useNavigate();


	const clickHandle = async (e) => {
		try {
			e.preventDefault();
			const api = "http://192.168.29.54:8000/signUp";
			const reqData =
			{
				name: name,
				email: email,
				password: pass,
			};
			const response = await axios.post(api, reqData);
			// setResponse(alert("success", "Register Successfully ..."));
			console.log(response);
			setResponse("success", 'success..');
			setResponse(() => { navigate('/Signin') })
		}
		catch (error) {
			console.error('Error:', error);
			setResponse("error", 'error..');
			// setResponse(alert("error", 'An error occurred'));
		}
	};


	const RedditTextField = styled((props) => (
		<TextField InputProps={{ disableUnderline: true }} {...props} />
	))
		(({ theme }) => ({
			'& .MuiFilledInput-root': {
				overflow: 'hidden',
				borderRadius: 4,
				backgroundColor: 'transparent',
				border: '1px solid',
				width: '350px',
				'&:hover': {
					backgroundColor: 'transparent',
				},
				'&.Mui-focused': {
					backgroundColor: 'transparent',
				},
			},
		}));


	return (
		<>

			<div className="main">
				<div className="msg">
					{response && <div> {response}</div>}

				</div>
				<div className="div_1">


					<div className="main_header">
						<img src={todo} alt="logo" height="40px" width="150px" />
					</div>
					<div className="child_header">
						<h1 className='chead'>Sign up</h1>
					</div>
					<div className="form">
						<form action="" >
							<div className="icon">

								<div className='google'>
									<img src={google} alt="google image" height='30px' width='30px' /> <strong className='go' >  Continue with Google </strong>
								</div>
								<div className='google'>
									<img src={facebook} alt="facebook image" height='20px' width='20px' style={{ marginRight: '7px' }} /> <strong className='face'>  Continue with Facebook</strong>
								</div>
								<div className='google'>
									<img src={apple} alt="apple image" height='30px' width='30px' /><strong className='app'>  Continue with Apple</strong>
								</div><br />
								<hr className='line' /><br />
							</div>


							<div className="inp_data">
								<div>
									<RedditTextField
										label="Name"
										defaultValue=""
										placeholder="Enter Your Name..."
										id="reddit-input"
										variant="filled"
										style={{ marginTop: 11 }}
										InputLabelProps={{
											style: { color: 'black' }
										}}
										value={name}
										onChange={(e) => { setName(e.target.value) }}

									/>
								</div>
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
									width: '350px',
									height: '52px',
									marginBottom: '13px',

								}} variant="contained" disableElevation onClick={clickHandle} >
									Sign up with Email
								</Button> <br /><br />
							</div>
							<div className="pra">
								<p>By continuing with Google, Apple, or Email, you agree to Todoist’s</p>
								<a href='Terms of Service'>Terms of Service</a> and <a href='Privacy Policy'>Privacy Policy.</a><br />
								<hr className='line1' />


							</div>
							<div>
							</div>
							<div className='footer'>
								<p>Already signed up? <a href="/Signin" className='login'>Go to login</a></p>
							</div>

						</form>
					</div>
				</div>
				<div className="div_2">
					<div className="video">
						<video src="https://todoist.b-cdn.net/assets/video/69a00ecf3b2aedf11010987593926c2e.mp4" height='500px' width="500px" loop autoPlay muted></video>
					</div>
				</div>
			</div>
		</>
	)
}

export default Signup;