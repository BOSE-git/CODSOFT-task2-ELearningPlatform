import './MyCourses.css';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';

const MyCourses = () => {
  const [userCourses, setUserCourses] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
   
    const fetchUserCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/course/myCourses/${userId}`);
        setUserCourses(response.data.user.courses);
      } catch (error) {
        console.error('Error fetching user courses:', error);
      }
    };

    fetchUserCourses();
  }, [userId]);

  return (
    <div className="courses-container">
      {userCourses.map(course => (
        <CourseCard
          key={course._id}
          id={course._id}
          title={course.title}
          imgUrl={course.imgUrl}
          links={course.links}
        />
      ))}
    </div>
  );
};

export default MyCourses;
