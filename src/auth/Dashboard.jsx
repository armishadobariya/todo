import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import ViewListIcon from "@mui/icons-material/ViewList";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import FlagIcon from "@mui/icons-material/Flag";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search"; // Added import
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import { checkBoxUrl } from "./Api";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoData,
  deleteTodoData,
  getTodo,
  updateTodoData,
} from "../store/todo/todoMethods";

const Dashboard = () => {
  const [age, setAge] = useState("");
  const [showForm, setShowForm] = useState(false); // show add task
  const [showUpdate, setShowUpdate] = useState(false); // show update form
  const [image, setImage] = useState(); // show update form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateTaskId, setUpdateTaskId] = useState(null);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerImage, setViewerImage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let tasks = useSelector((state) => state.todo.todos);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Remain pervious task.

  useEffect(() => {
    getTodo()(dispatch);
  }, []);

  const openImageViewer = (image) => {
    setViewerImage(image);
    setIsViewerOpen(true);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/Signin");
  };

  const addTodo = async (e) => {
    addTodoData({ image, title, description })(dispatch);
    setTitle("");
    setDescription("");
    setImage(null);
    setShowForm(false);
  };

  const handleDeleteTask = async (taskId, token) => {
    deleteTodoData({ taskId, token })(dispatch);
  };

  const updateTodo = async () => {
    updateTodoData({
      id: updateTaskId,
      title: updateTitle,
      description: updateDescription,
      isCompleted: false,
    })(dispatch);
    setUpdateTaskId(null);
    setUpdateTitle("");
    setUpdateDescription("");
    setShowUpdate(false);
  };
  const handleCheckboxChange = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      const checkdata = {
        id: taskId,
        isCompleted: true,
      };
      const response = await axios.put(checkBoxUrl, checkdata, {
        headers: {
          authorization: token,
        },
      });

      console.log("Checkbox API Response:", response.data);
    } catch (error) {
      console.error("Error updating checkbox:", error.message);
      // Handle error, show an error message, etc.
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleUpdate = (id, title, description) => {
    setUpdateTaskId(id);
    setUpdateTitle(title);
    setUpdateDescription(description);
    setShowUpdate(!showUpdate);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  return (
    <>
      <div className="nav">
        <div className="front">
          <MenuIcon
            style={{
              height: "45px",
              width: "40px",
              marginLeft: "30px",
              color: "white",
              cursor: "pointer",
            }}
          />
          <HomeIcon
            style={{
              height: "45px",
              width: "40px",
              marginLeft: "15px",
              color: "white",
              cursor: "pointer",
            }}
          ></HomeIcon>
          <Search
            style={{
              maxWidth: "230px",
              marginLeft: "135px",
              cursor: "pointer",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon
                style={{ marginLeft: "0px", color: "white", cursor: "pointer" }}
              />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              style={{
                display: "flex",
                marginLeft: "0px",
                marginTop: "-38px",
                color: "white",
                height: "35px",
                cursor: "pointer",
              }}
            />
          </Search>
          <AddIcon
            style={{
              marginLeft: "1415px",
              marginBottom: "30px",
              marginTop: "-35px",
              color: "white",
              width: "50px",
              fontSize: "32px",
              cursor: "pointer",
            }}
            onClick={toggleForm}
          />
          <PowerSettingsNewIcon
            style={{
              color: "white",
              fontSize: "32px",
              cursor: "pointer",
              float: "right",
              marginTop: "-60px",
              marginLeft: "1200px",
              marginRight: "20px",
            }}
            onClick={logOut}
          />
        </div>
      </div>
      <center>
        <div className="dashboad_main">
          <div className="dashboard_child">
            <div className="title">
              <h2>Today</h2>
              <h6>{date}</h6>
              <div className="dashboard_view">
                <h4>
                  <ViewListIcon />
                </h4>{" "}
                <h3>view</h3>
              </div>
            </div>
            <hr />

            <div className="tasks-list">
              <br />
              <h5>Todos :</h5>
              <ul style={{ listStyleType: "none" }}>
                {tasks &&
                  tasks.map((task) => (
                    <li key={task.id}>
                      <div className="displaydata">
                        <RemoveCircleOutlineOutlinedIcon
                          className="deleteicon"
                          style={{ color: "#dc4c3e", marginTop: "10px" }}
                          onClick={() =>
                            handleDeleteTask(
                              task.id,
                              localStorage.getItem("token")
                            )
                          }
                        />
                        <input
                          type="checkbox"
                          className="check"
                          checked={task.isCompleted}
                          onChange={() => handleCheckboxChange(task.id)}
                        />
                        <h4
                          className="displaytitle"
                          onClick={() => openImageViewer(task.image)}
                        >
                          {task.title}
                        </h4>
                        <br />
                        <h5>{task.description}</h5>
                        {task.image && (
                          <div onClick={() => openImageViewer(task.image)}>
                            <img
                              src={task.image}
                              alt="Task Image"
                              className="task_image"
                            />
                          </div>
                        )}
                        <EditCalendarOutlinedIcon
                          className="editicon"
                          style={{ justifyContent: "right", color: "grey" }}
                          onClick={() =>
                            toggleUpdate(task.id, task.title, task.description)
                          }
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
                    style={{
                      height: "40px",
                      width: "60px",
                      backgroundColor: "white",
                    }}
                  />
                )}
              </ul>
            </div>

            {showUpdate && (
              <div className="dashboard_box" style={{ marginLeft: "2px" }}>
                <input
                  type="text"
                  className="task_name"
                  placeholder="Task name"
                  value={updateTitle}
                  onChange={(e) => {
                    setUpdateTitle(e.target.value);
                  }}
                />
                <br />
                <br />
                <input
                  type="text"
                  className="task_description"
                  placeholder="Description"
                  value={updateDescription}
                  onChange={(e) => {
                    setUpdateDescription(e.target.value);
                  }}
                />
                <br /> <br />
                <div className="controls">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "180px", height: "20px" }}
                      className="customDatePicker"
                    />
                  </LocalizationProvider>
                  <FormControl
                    sx={{
                      marginLeft: "15px",
                      minWidth: 10,
                      borderRadius: "15px",
                    }}
                    className="dropdown"
                  >
                    <Select
                      value={age}
                      onChange={handleChange}
                      displayEmpty
                      defaultValue="priority"
                      inputProps={{ "aria-label": "Without label" }}
                      style={{ height: "57px" }}
                    >
                      <MenuItem value="">
                        <h5 style={{ fontWeight: "300", color: "grey" }}>
                          <OutlinedFlagIcon style={{ height: "18px" }} />{" "}
                          Priority
                        </h5>
                      </MenuItem>
                      <MenuItem value={10}>
                        <FlagIcon style={{ color: "red", height: "18px" }} />{" "}
                        Priority 1
                      </MenuItem>
                      <MenuItem value={20}>
                        <FlagIcon style={{ color: "orange", height: "18px" }} />{" "}
                        Priority 2
                      </MenuItem>
                      <MenuItem value={30}>
                        <FlagIcon style={{ color: "blue", height: "18px" }} />{" "}
                        Priority 3
                      </MenuItem>
                      <MenuItem value={40}>
                        <OutlinedFlagIcon style={{ height: "18px" }} /> Priority
                        4
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <hr className="line0" />
                <div className="last">
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(194, 193, 189)",
                      color: "black",
                    }}
                    onClick={() => toggleUpdate(null, "", "")}
                  >
                    Cancle
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: "14px" }}
                    style={{ backgroundColor: "#d1453b" }}
                    className="btnadd"
                    onClick={updateTodo}
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}

            <br />
            <br />

            {!showForm && (
              <div
                className="add_task"
                onClick={toggleForm}
                style={{ cursor: "pointer" }}
              >
                <AddIcon style={{ color: "red" }} /> Add Task
              </div>
            )}
            {showForm && (
              <div className="dashboard_box1" style={{ marginLeft: "2px" }}>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  style={{ marginTop: "10px", marginLeft: "-322px" }}
                />
                <input
                  type="text"
                  className="task_name"
                  placeholder="Task name"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <br />
                <br />
                <input
                  type="text"
                  className="task_description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <br /> <br />
                <div className="controls">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "180px", height: "20px" }}
                      className="customDatePicker"
                    />
                  </LocalizationProvider>
                  <FormControl
                    sx={{
                      marginLeft: "15px",
                      minWidth: 10,
                      borderRadius: "15px",
                    }}
                    className="dropdown"
                  >
                    <Select
                      value={age}
                      onChange={handleChange}
                      displayEmpty
                      defaultValue="priority"
                      inputProps={{ "aria-label": "Without label" }}
                      style={{ height: "57px" }}
                    >
                      <MenuItem value="">
                        <h5 style={{ fontWeight: "300", color: "grey" }}>
                          <OutlinedFlagIcon style={{ height: "18px" }} />{" "}
                          Priority
                        </h5>
                      </MenuItem>
                      <MenuItem value={10}>
                        <FlagIcon style={{ color: "red", height: "18px" }} />{" "}
                        Priority 1
                      </MenuItem>
                      <MenuItem value={20}>
                        <FlagIcon style={{ color: "orange", height: "18px" }} />{" "}
                        Priority 2
                      </MenuItem>
                      <MenuItem value={30}>
                        <FlagIcon style={{ color: "blue", height: "18px" }} />{" "}
                        Priority 3
                      </MenuItem>
                      <MenuItem value={40}>
                        <OutlinedFlagIcon style={{ height: "18px" }} /> Priority
                        4
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <hr className="line0" />
                <div className="last">
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(194, 193, 189)",
                      color: "black",
                    }}
                    onClick={toggleForm}
                  >
                    Cancle
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: "14px" }}
                    style={{ backgroundColor: "#d1453b" }}
                    className="btnadd"
                    onClick={addTodo}
                  >
                    Add Task
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </center>
    </>
  );
};
export default Dashboard;
