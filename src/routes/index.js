import express from 'express';
import { indexPage, envelopesPage } from '../controllers/index.js';
const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/envelopes', envelopesPage); 

export default indexRouter;
