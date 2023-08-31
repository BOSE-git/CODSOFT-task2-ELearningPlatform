import mongoose from 'mongoose';
import Course from '../model/Courses.js';
import User from '../model/User.js';


export const getAllCourse = async (req, res, next) => {
    let courses;
    try {
      courses = await Course.find().populate("user");
    } catch (err) {
      return console.log(err);
    }
    if (!courses) {
      return res.status(404).json({ message: "No Courses Found" });
    }
    return res.status(200).json({ courses });
  };


  export const addCourse = async (req, res, next) => {
    const { title,imgUrl,type,links } = req.body;
  
    const course = new Course({
      title,
      imgUrl,
      type,
      links,
    });
  
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await course.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  
    return res.status(200).json({ course });
  };
  

  export const enrollInCourse = async (req, res, next) => {
    const userId = req.params.id;
    const { courseId } = req.body;
  
    let user;
    try {
      user = await User.findById(userId);
    } catch (err) {
      return console.log(err);
    }
  
    if (!user) {
      return res.status(400).json({ message: "Unable to find user" });
    }
  
    const enrolledCourse = await Course.findById(courseId);
  
    if (!enrolledCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
  
    // Check if the user is already enrolled in the course
    if (!user.courses.includes(enrolledCourse._id)) {
      user.courses.push(enrolledCourse._id);
      await user.save();
    }
  
    // Associate the course with the user
    enrolledCourse.user = user._id;
    await enrolledCourse.save();
  
    return res.status(200).json({ message: "Enrolled in the course", course: enrolledCourse });
  };
  
  export const deleteCourse = async (req, res, next) => {
    const id = req.params.id;
    let course;
    try {
      course = await Course.findByIdAndRemove(id).populate("user");
      await course.user.courses.pull(course);
      await course.user.save();
    } catch (err) {
      console.log(err);
    }
    if (!course) {
      return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" });
  };

  export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    console.log("User ID:", userId); // Check if the user ID is correctly extracted
    
    let userCourse;
    try {
        userCourse = await User.findById(userId).populate("courses");
        console.log("User Courses:", userCourse); // Check if the user's courses are being fetched
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
    if (!userCourse) {
        return res.status(404).json({ message: "No Course Found" });
    }
    
    return res.status(200).json({ user: userCourse });
};
