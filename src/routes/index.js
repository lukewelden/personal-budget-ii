import express from 'express';

const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Personal Budget' });
});

export default indexRouter;
