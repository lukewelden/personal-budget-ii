import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', indexRouter); 

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({error: err.stack,});
});

export default app;
