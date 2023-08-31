import './Courses.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import CourseCard from './CourseCard';





const Courses = () => {

  const [course, setCourses] = useState([]);
  const [programmingCourses, setProgrammingCourses] = useState([]);
  const [editingCourses, setEditingCourses] = useState([]);
  const [instrumentCourses, setInstrumentCourses] = useState([]);


  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/course/");
      const data = res.data;
      return data.courses;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest().then((courseData) => {
      console.log(courseData);
      setCourses(courseData);
      setProgrammingCourses(courseData.filter(course => course.type === "Programming"));
      setEditingCourses(courseData.filter(course => course.type === "Editing"));
      setInstrumentCourses(courseData.filter(course => course.type === "Instruments"));
    });
  }, []);



  return (
    <div className="container-course-outline">
      <h2>All Courses</h2>
      <div className="courses-container">

          {course.map((course) => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.title}
              imgUrl={course.imgUrl}
              links={course.links}
            />
          ))}

      </div>
      <h2>Programming</h2>
      <div className="courses-container">

          {programmingCourses.map((course) => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.title}
              imgUrl={course.imgUrl}
              links={course.links}
            />
          ))}

      </div>
      <h2>Editing</h2>
      <div className="courses-container">

          {editingCourses.map((course) => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.title}
              imgUrl={course.imgUrl}
              links={course.links}
            />
          ))}

      </div>
      <h2>Instruments</h2>
      <div className="courses-container">

          {instrumentCourses.map((course) => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.title}
              imgUrl={course.imgUrl}
              links={course.links}
            />
          ))}

      </div>
    </div>
  );
  
}

export default Courses