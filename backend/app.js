import express from 'express';
import mongoose from 'mongoose';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 8080;
import router from './routes/user-routes.js';
import courseRouter from './routes/course-routes.js'
import tempoRouter from './routes/temporary-data.js';

app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/course",courseRouter);
app.use("/api/temporaryData",tempoRouter);


mongoose.connect("mongodb+srv://sumitbose1712:tatakaye@elearning-cluster.drgt8ak.mongodb.net/Learn?retryWrites=true&w=majority").then(() => app.listen(port)).then(() => console.log(`Connected to Database, Listening on Port ${port}`)).catch((err) => console.log(err));
