import express from 'express';
import {getAllCourse, addCourse, deleteCourse, enrollInCourse, getByUserId } from '../controllers/course-controller.js';

const courseRouter = express.Router();

courseRouter.get("/", getAllCourse);
courseRouter.post("/add", addCourse);
courseRouter.post("/enroll/:id", enrollInCourse)
courseRouter.delete("/delete/:id", deleteCourse);
courseRouter.get("/myCourses/:id", getByUserId);



export default courseRouter;