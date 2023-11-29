import "../reset.css";
import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import img from "../images/img1.png";
import logo from "../images/Todoist_logo.png";
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPasswordUrl } from "./Api";



const ResetPassword = () => {

	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setConfirmShowPassword] = useState(false);

	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");
	const [response, setResponse] = useState(null);
	const location = useLocation();
	const [passwordError, setPasswordError] = useState('');


	const validatePassword = (p, cf) => {
		// const minLength = 8;

		if (p.length < 8) {
			setPasswordError(`Password must be between 8 characters`);
			return false;
		}
		else if (p !== cf) {
			setPasswordError(`Password and confirm password is not same`);
			return false;
		}
		setPasswordError('');
		return true;
	};


	const ResetPass = async (e) => {
		try {
			e.preventDefault();

			if (validatePassword(password, cpassword)) {
				const email = location.state;
				console.log(email);
				const reqdata = {
					email: email,
					password: password,
				};
				const responseData = await axios.post(resetPasswordUrl, reqdata);
				setResponse("success: ", 'success');
				setResponse(() => { navigate("/Signin") });
			}
		}
		catch (error) {
			setResponse(error);
			setResponse("error:", 'error');
		}

	};



	return (
		<>
			<div className="reset_main">
				{/* <div className="msg">
				{response && <div> {response}</div>}

			</div> */}

				<div className="msg">
					{response && <div>{response.message}</div>}
				</div>
				<div className="reset_child">
					<div className="logo">
						<img src={logo} alt="" height="37px" width='140px' />
					</div>


					<div className="reset_detail">
						<h1 className='chead'>Password Reset</h1>
						<p className='reset_p'>Please Enter New Password For Your Todolist Account.</p>
						<p className='reset_p'>This will End Your active Session for your account and issue a new API token.</p>
						<form action="" className='reset_form'>
							<div className="new_pass">
								<label className='reset_label'>Enter a new Password</label>

								<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" />

								<OutlinedInput
									style={{
										width: "100%",
										height: "50px",
										marginBottom: "10px",
										borderRadius: "7px"
									}}
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										// validatePassword(e.target.value);
									}}
									id="outlined-adornment-password"
									type={showPassword ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => setShowPassword((pre) => !pre)}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}

								/>
								<p style={{ color: 'red' }}>{passwordError}</p>


							</div>

							<div className="confirm_pass">
								<label className='reset_label'>Confirm your new Password</label>
								<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" />

								<OutlinedInput
									style={{
										width: "100%",
										height: "50px",
										marginBottom: "10px",
										borderRadius: "7px"
									}}
									value={cpassword}
									onChange={(e) => { setCpassword(e.target.value) }}
									id="outlined-adornment-password"
									type={showConfirmPassword ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => setConfirmShowPassword((pre) => !pre)}
												edge="end"
											>
												{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}

								/>

							</div>
							

							<p className='form_p'>Your password must be at least 8 charatcor long. Avoid common words and Pattern. </p><br />
							{/* <div className="reset_button ">
                                <button type='submit' >Reset My Password</button>
                            </div> */}
							<Button style={{
								borderRadius: 7,
								backgroundColor: "#dc4c3e",
								padding: "6px 30px",
								fontSize: "16px",
								width: '500px',
								height: '52px',
								marginBottom: '5px',

							}} variant="contained" disableElevation onClick={ResetPass}>
								Reset My Password
							</Button> 


						</form>

						<div className="reset_end">
							<hr />
							<p>Need Additional Help? <a href="Contact.jsx">Contact us</a></p>
						</div>
					</div>


				</div>

				<div className="image">
					<img src={img} alt="" width="700px" />
				</div>
			</div>
		</>
	)
}

export default ResetPassword;
