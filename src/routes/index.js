import express from 'express';
import { indexPage, envelopesPage, addEnvelope, getEnvelopeById, updateEnvelope } from '../controllers/index.js';
import { validateBudget } from '../middleware/index.js';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/envelopes', envelopesPage);
indexRouter.post('/envelopes', validateBudget, addEnvelope); 
indexRouter.get('/envelopes/:envelopeId', getEnvelopeById);
indexRouter.put('/envelopes/:envelopeId', validateBudget, updateEnvelope);

export default indexRouter;
