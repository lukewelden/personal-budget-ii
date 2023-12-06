import express from 'express';
import { indexPage, 
    envelopesPage, 
    addEnvelope, 
    getEnvelopeById, 
    updateEnvelope, 
    deleteEnvelope, 
    envelopeTransfer } 
    from '../controllers/index.js';
import { validateBudget } from '../middleware/index.js';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/envelopes', envelopesPage);
indexRouter.post('/envelopes', validateBudget, addEnvelope); 
indexRouter.get('/envelopes/:envelopeId', getEnvelopeById);
indexRouter.put('/envelopes/:envelopeId', validateBudget, updateEnvelope);
indexRouter.delete('/envelopes/:envelopeId', deleteEnvelope);
indexRouter.post('/envelopes/transfer', envelopeTransfer);

export default indexRouter;
