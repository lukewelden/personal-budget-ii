import express from 'express';
import { indexPage, envelopesPage, addEnvelope, getEnvelopeById } from '../controllers/index.js';
import { validateBudget, performAsyncAction } from '../middleware/index.js';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/envelopes', envelopesPage);
indexRouter.post('/envelopes', validateBudget, performAsyncAction, addEnvelope); 
indexRouter.get('/envelopes/:envelopeId', getEnvelopeById);

export default indexRouter;
