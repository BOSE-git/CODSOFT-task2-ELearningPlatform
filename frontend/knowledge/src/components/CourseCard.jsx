import './CourseCard.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AddBoxIcon from '@mui/icons-material/AddBox';


const CourseCard = ({ id, title, imgUrl, links }) => {

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const navigate = useNavigate();
  async function handleClick() {
    if (isLoggedIn) {
      const data = {
        id,
        title,
        links
      };
      await axios.post("http://localhost:5000/api/temporaryData", data);
      navigate('/coursePage');
    }
    else {
      alert("Please Login/SignUp")
      navigate('/auth');
    }
  }

  async function handleEnroll() {
    const userId = localStorage.getItem("userId");
    const courseId = id;

    try {
      const response = await axios.post(`http://localhost:5000/api/course/enroll/${userId}`, { courseId });
      console.log(response.data);
      alert("Enrolled Successfully");
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Enrollment failed. Please try again later.");
    }
  }


    return (
      <div className="card-outline" >
        <div className="card-container">
          <div className="add-button" onClick={handleEnroll}>
            <AddBoxIcon />
          </div>
          <img src={imgUrl} alt={title} />
          <h2 onClick={handleClick}>{title}</h2>
        </div>
      </div>
    );
  };

  export default CourseCard;
