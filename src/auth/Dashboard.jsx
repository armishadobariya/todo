import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./Dashboard.css";
import ViewListIcon from '@mui/icons-material/ViewList';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import FlagIcon from '@mui/icons-material/Flag';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search'; // Added import
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import { checkBoxUrl, deleteAccountUrl, searchTaskUrl, userDataUrl } from './Api';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate } from 'react-router-dom';
import ImageViewer from "react-simple-image-viewer";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, DateTimePickerToolbar } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from '@mui/icons-material/Cancel';
import {
	addTodoData,
	deleteTodoData,
	getTodo,
	updateTodoData,
	checkTodoData,
	searchTodoData,
} from "../store/todo/todoMethods";
// import DeleteIcon from '@mui/icons-material/Delete';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));


const Dashboard = () => {
	const [age, setAge] = useState('');
	const [showForm, setShowForm] = useState(false);   // show add task
	const [showUpdate, setShowUpdate] = useState(false);  // show update form 
	const [image, setImage] = useState();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [updateTaskId, setUpdateTaskId] = useState(null);
	const [updateTitle, setUpdateTitle] = useState("");
	const [updateDescription, setUpdateDescription] = useState("");
	const [updateIsComplated, setUpdateIsComplated] = useState("");
	const [updateDate, setUpdateDate] = useState("");
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [viewerImage, setViewerImage] = useState("");
	const [showProfile, setShowProfile] = useState(false);
	const [userName, setUserName] = useState(false);
	const [userEmail, setUserEmail] = useState(false);
	const [userImage, setUserImage] = useState(false);
	// const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	let tasks = useSelector((state) => state.todo.todos);



	const handleImageChange = (event) => {
		setImage(event.target.files[0]);
	};

	useEffect(() => {
		getTodo()(dispatch);
	}, []);

	const openImageViewer = (image) => {
		setViewerImage(image);
		setIsViewerOpen(true);
	};

	const logOut = () => {
		localStorage.removeItem('token');
		navigate("/Signin");
	}

	const addTodo = async (e) => {
		addTodoData({ image, title, description, date })(dispatch);
		setTitle("");
		setDescription("");
		setImage(null);
		setShowForm(false);
		setDate("");
	};

	const handleDeleteTask = async (taskId, token) => {
		deleteTodoData({ taskId, token })(dispatch);
	};

	const updateTodo = async () => {
		updateTodoData({
			id: updateTaskId,
			title: updateTitle,
			description: updateDescription,
			isCompleted: updateIsComplated,
			date: updateDate,
		})(dispatch);
		setUpdateTaskId(null);
		setUpdateTitle("");
		setUpdateDescription("");
		setShowUpdate(false);
		setUpdateDate("");
	};

	const checkBoxTodo = async (taskId, isCompleted) => {
		checkTodoData({ taskId, isCompleted })(dispatch);
	}



	const deleteAccount = async (token) => {
		try {
			const response = await axios.delete(deleteAccountUrl, {
				headers: {
					Authorization: `Bearer ${token}`,
				},

			});
			if (response.status === 200) {
				console.log('success');
				navigate("/Signin");
			}
		} catch (error) {
			console.error("Error deleting user:", error.message);
		}
	}
	const searchTask = async (search) => {
		searchTodoData({ search })(dispatch);
	}
	// const searchTask = async (search) => {
	// 	if (search === undefined || search === null || search === "") {
	// 		return getTodo()(dispatch);
	// 	}
	// 	try {
	// 		const token = localStorage.getItem("token")
	// 		const response = await axios.get(`${searchTaskUrl}/${search}`, {
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		});
	// 		if (response.status === 200) {
	// 			dispatch(setTodo(response.data.data));

	// 		}
	// 	} catch (error) {
	// 		console.error("Error deleting user:", error.message);
	// 	}
	// }

	const handleChange = (event) => {
		setAge(event.target.value);
	}
	const toggleForm = () => {
		setShowForm(!showForm);
	}


	const toggleUpdate = (id, title, description, isCompleted, date) => {
		setUpdateTaskId(id)
		setUpdateTitle(title);
		setUpdateDescription(description);
		setUpdateIsComplated(isCompleted);
		setShowUpdate(!showUpdate);
		setUpdateDate(date);
	}

	const getUserData = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get(userDataUrl, {
				headers: {
					Authorization: `Bearer ${token}`,
				},

			});
			if (response.status === 200) {
				console.log('success');
				const data = response.data.data;
				setUserName(data.name);
				setUserImage(data.image);
				setUserEmail(data.email);
			}
		} catch (error) {
			console.error("fetch user data:", error.message);
		}
	}

	const displayProfile = () => {
		setShowProfile(!showProfile);
		getUserData();

	}



	const email = location.state;
	console.log(email);
	const current = new Date();
	const datee = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`
	return (
		<>
			<div className='nav'>
				<div className="front">
					<MenuIcon style={{ height: "45px", width: "40px", marginLeft: "30px", color: "white", cursor: 'pointer' }} onClick={displayProfile} />

					<HomeIcon style={{ height: "45px", width: "40px", marginLeft: "15px", color: "white", cursor: 'pointer' }}></HomeIcon>
					<Search style={{ maxWidth: "230px", marginLeft: "135px", cursor: 'pointer' }}>
						<SearchIconWrapper >
							<SearchIcon style={{ marginLeft: "0px", color: "white", cursor: 'pointer' }} />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
							style={{
								display: "flex",
								marginLeft: "0px",
								marginTop: "-38px",
								color: 'white',
								height: '35px',
								cursor: 'pointer'
							}}
							onChange={(e) => {
								searchTask(e.target.value)
							}}
						/>
					</Search>
					<AddIcon style={{ marginLeft: "1415px", marginBottom: '30px', marginTop: '-35px', color: "white", width: "50px", fontSize: '32px', cursor: 'pointer' }} onClick={toggleForm} />
					<PowerSettingsNewIcon style={{ color: 'white', fontSize: '32px', cursor: 'pointer', float: 'right', marginTop: '-60px', marginLeft: '1200px', marginRight: '20px' }} onClick={logOut} />
					{showProfile && (
						<div className='profile_display'>
							<div className="close">
								<CancelIcon className='close_profile' onClick={displayProfile} />
							</div>
							<div className="email_profile">
								<h6>{userEmail}</h6>
							</div>

							<div className="image_profile">
								<img src={userImage} alt="User_Profile" />
							</div>
							<h3>Hi,{userName} !</h3>
							<div className="delete_profile">
								<button className='btn_profile' onClick={() => deleteAccount(localStorage.getItem("token"))}> Delete A/C</button>
							</div>
						</div>
					)}
				</div>
			</div>
			<center>
				<div className='dashboad_main'>
					<div className="dashboard_child">
						<div className="title">
							<h2>Today</h2>
							<h6>{datee}</h6>
							<div className="dashboard_view"><h4 ><ViewListIcon /></h4> <h3>view</h3></div>
						</div>
						<hr />
						<div className="tasks-list"><br />
							<h5>Todos :</h5>
							<ul style={{ listStyleType: "none" }}>

								{tasks && tasks.map(task => (
									<li key={task.id}>
										<div className="displaydata">
											<RemoveCircleOutlineOutlinedIcon
												className='deleteicon'
												style={{ color: "#dc4c3e", marginTop: '10px' }}
												onClick={() => handleDeleteTask(task.id, localStorage.getItem("token"))}
											/>
											<input
												type="checkbox"
												className='check_box'
												checked={task.isCompleted}
												onChange={() => checkBoxTodo(task.id, task.isCompleted)}
											/>
											<h4 className='displaytitle' onClick={() => openImageViewer(task.image)}>{task.title}</h4>
											<br />
											<h5>{task.description}</h5>
											<h5>{task.date}</h5>
											{task.image && (
												<div onClick={() => openImageViewer(task.image)}>
													<img src={task.image} alt="Task Image" className="task_image" />
												</div>
											)}
											<EditCalendarOutlinedIcon
												className="editicon"
												style={{ justifyContent: "right", color: 'grey' }}
												onClick={() => toggleUpdate(task.id, task.title, task.description, task.isCompleted, task.date)}
											/>
										</div>
										<hr />
										<br />
									</li>
								))}
								{isViewerOpen && (
									<ImageViewer
										src={[viewerImage]}
										currentIndex={0}
										disableScroll={false}
										onClose={() => setIsViewerOpen(false)}
										style={{ height: '40px', width: '60px', backgroundColor: "white" }}
									/>
								)}
							</ul>
						</div>
						{showUpdate && (
							<div className="dashboard_box" style={{ marginLeft: "2px" }}>

								<input type="text" className='task_name' placeholder='Task name' value={updateTitle} onChange={(e) => { setUpdateTitle(e.target.value) }} /><br /><br />
								<input type="text" className='task_description' placeholder='Description' value={updateDescription} onChange={(e) => { setUpdateDescription(e.target.value) }} /><br /> <br />
								<div className="controls">
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['DateTimePicker']}>
											{/* <DateTimePicker hintText={updateDate} onChange={(e) => { setUpdateDate(e) }} /> */}
											<DateTimePicker onChange={(e) => {
												console.log(e);
												const d = `${e.$y}-${(e.$M + 1).toString().padStart(2, '0')}-${e.$D.toString().padStart(2, '0')}T${e.$H.toString().padStart(2, '0')}:${e.$m.toString().padStart(2, '0')}:${e.$s.toString().padStart(2, '0')}Z`
												console.log(d)
												setUpdateDate(d)
											}} />
										</DemoContainer>
									</LocalizationProvider>
									<FormControl sx={{ marginLeft: "15px", minWidth: 10, borderRadius: '15px' }} className='dropdown'>
										<Select
											value={age}
											onChange={handleChange}
											displayEmpty
											defaultValue='priority'
											inputProps={{ 'aria-label': 'Without label' }}
											style={{ height: '55px', marginTop: "8px" }}
										>
											<MenuItem value="">
												<h5 style={{ fontWeight: "300", color: "grey" }} ><OutlinedFlagIcon style={{ height: "18px" }} /> Priority</h5>
											</MenuItem>
											<MenuItem value={10}><FlagIcon style={{ color: "red", height: "18px" }} /> Priority 1</MenuItem>
											<MenuItem value={20}><FlagIcon style={{ color: "orange", height: "18px" }} />  Priority 2</MenuItem>
											<MenuItem value={30}><FlagIcon style={{ color: "blue", height: "18px" }} />  Priority 3</MenuItem>
											<MenuItem value={40}><OutlinedFlagIcon style={{ height: "18px" }} />  Priority 4</MenuItem>
										</Select>
									</FormControl>
								</div>
								<hr className='line0' />
								<div className="last">
									<Button variant="contained" style={{ backgroundColor: "rgb(194, 193, 189)", color: "black" }} onClick={() => toggleUpdate(null, "", "")}>Cancle</Button>
									<Button variant="contained" sx={{ marginLeft: "14px" }} style={{ backgroundColor: "#d1453b" }} className='btnadd' onClick={updateTodo}>Save</Button>
								</div>

							</div>
						)}

						<br />
						<br />


						{!showForm && <div className="add_task" onClick={toggleForm} style={{ cursor: "pointer" }}>
							<AddIcon style={{ color: "red" }} /> Add Task
						</div>
						}
						{showForm && (
							<div className="dashboard_box1" style={{ marginLeft: "2px" }}>
								<input type="file" name="image" onChange={handleImageChange} style={{ marginTop: "10px", marginLeft: "-322px" }} />
								<input type="text" className='task_name' placeholder='Task name' value={title} onChange={(e) => { setTitle(e.target.value) }} /><br /><br />
								<input type="text" className='task_description' placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }} /><br /> <br />
								<div className="controls">

									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={['DateTimePicker']}>
											{/* <DateTimePicker label="Date time Picker" onChange={(e) => { setDate(e) }} /> */}
											<DateTimePicker onChange={(e) => {
												console.log(e);
												const d = `${e.$y}-${(e.$M + 1).toString().padStart(2, '0')}-${e.$D.toString().padStart(2, '0')}T${e.$H.toString().padStart(2, '0')}:${e.$m.toString().padStart(2, '0')}:${e.$s.toString().padStart(2, '0')}Z`
												console.log(d)

												setDate(d)
											}} />
										</DemoContainer>
									</LocalizationProvider>
									<FormControl sx={{ marginLeft: "15px", minWidth: 10, borderRadius: '15px' }} className='dropdown'>
										<Select
											value={age}
											onChange={handleChange}
											displayEmpty
											defaultValue='priority'
											inputProps={{ 'aria-label': 'Without label' }}
											style={{ height: '55px', marginTop: "8px", }}
										>
											<MenuItem value="">
												<h5 style={{ fontWeight: "300", color: "grey" }} ><OutlinedFlagIcon style={{ height: "18px" }} /> Priority</h5>
											</MenuItem>
											<MenuItem value={10}><FlagIcon style={{ color: "red", height: "18px" }} /> Priority 1</MenuItem>
											<MenuItem value={20}><FlagIcon style={{ color: "orange", height: "18px" }} />  Priority 2</MenuItem>
											<MenuItem value={30}><FlagIcon style={{ color: "blue", height: "18px" }} />  Priority 3</MenuItem>
											<MenuItem value={40}><OutlinedFlagIcon style={{ height: "18px" }} />  Priority 4</MenuItem>
										</Select>
									</FormControl>
								</div>
								<hr className='line0' />
								<div className="last">
									<Button variant="contained" style={{ backgroundColor: "rgb(194, 193, 189)", color: "black" }} onClick={toggleForm}>Cancle</Button>
									<Button variant="contained" sx={{ marginLeft: "14px" }} style={{ backgroundColor: "#d1453b" }} className='btnadd' onClick={addTodo}>Add Task</Button>
								</div>

							</div>
						)}


					</div>
				</div>
			</center>
		</>
	);
}
export default Dashboard;