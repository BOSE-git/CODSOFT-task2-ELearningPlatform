import express from "express";
const tempoRouter = express.Router();

let temporaryData = null;

tempoRouter.post('/', (req, res) => {
    temporaryData = req.body;
    res.status(200).json({ message: temporaryData });
  });
  
  tempoRouter.get('/', (req, res) => {
    console.log(temporaryData);
    res.status(200).json(temporaryData);
  });

export default tempoRouter;