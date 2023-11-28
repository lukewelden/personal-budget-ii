import express from 'express';
import { indexPage, envelopesPage, addEnvelope } from '../controllers/index.js';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/envelopes', envelopesPage);
indexRouter.post('/envelopes', addEnvelope); 

export default indexRouter;
