import express from 'express';
import { indexPage, allEnvelopesPage } from '../controllers/index.js';
const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/envelopes', allEnvelopesPage); 

export default indexRouter;
