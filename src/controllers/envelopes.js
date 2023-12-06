import { response } from 'express';
import Model from '../models/model.js';

const envelopesModel = new Model('envelopes');

export const envelopesPage = async (req, res) => {
    try {
        const data = await envelopesModel.select('id, category, budget'); 
        res.status(200).json({ envelopes: data.rows });
    } catch (err) {
        res.status(200).json({ envelopes: err.stack }); 
    }
};

export const addEnvelope = async (req, res) => {
    const { category, budget } = req.body;
    const columns = 'category, budget';
    const values = `'${category}', '${budget}'`;
    try {
        const data = await envelopesModel.insertWithReturn(columns, values);
        res.status(200).json({ envelopes: data.rows });
    } catch (err) {
        res.status(200).json({ envelopes: err.stack }); 
    }
};

export const getEnvelopeById = async (req, res) => {
    const { envelopeId } = req.params;
    const clause = ` WHERE id = ${envelopeId}`;
    try {
        const data = await envelopesModel.select('id, category, budget', clause); 
        res.status(200).json({ envelopes: data.rows });
    } catch (err) {
        res.status(200).json({ envelopes: err.stack }); 
    }

};

export const updateEnvelope = async (req, res) => {
    const { envelopeId } = req.params;
    const { category, budget } = req.body;
    const columns = ['category', 'budget'];
    const values = [category, budget];
    const clause = ` WHERE id = ${envelopeId}`;
    try {
        const data = await envelopesModel.update(columns, values, clause);
        res.status(200).json({ envelopes: data.rows });
    } catch (err) {
        res.status(200).json({ envelopes: err.stack }); 
    }
};

export const deleteEnvelope = async (req, res) => {
    const { envelopeId } = req.params;
    const clause = ` WHERE id = ${envelopeId}`;
    try {
        const data = await envelopesModel.delete(clause);
        res.status(200).json({ envelopes: data.rows });
    } catch (err) {
        res.status(200).json({ envelopes: err.stack }); 
    }
}

export const envelopeTransfer = async (req, res) => {
    const { from, to, amount } = req.body;
    if (from === undefined || to === undefined || amount === undefined) {
        return res.status(400).json({ error: 'Request body must contain from, to, and amount' });
    }
    const columns = ['budget'];
    const fromClause = ` WHERE id = '${from}';`;
    const toClause = ` WHERE id = '${to}';`;
    try {
        const fromData = await envelopesModel.select('id, category, budget', fromClause);
        const toData = await envelopesModel.select('id, category, budget', toClause);
        
        if (!fromData.rows[0] || !toData.rows[0]) { 
            return res.status(400).json({ error: 'Could not find envelope with given id' });
        }
        const fromBudget = parseFloat(fromData.rows[0].budget.replace('$', ''));
        const toBudget = parseFloat(toData.rows[0].budget.replace('$', ''));
        if (fromBudget < amount) {
            res.status(200).json({ envelopes: 'Not enough money in the envelope.' });
        } else {
            await envelopesModel.update(columns, [fromBudget - amount], fromClause);
            await envelopesModel.update(columns, [toBudget + amount], toClause);
            
            let envOne = await envelopesModel.select('id, category, budget', fromClause)
            envOne = envOne.rows[0];
            let envTwo = await envelopesModel.select('id, category, budget', toClause)
            envTwo = envTwo.rows[0];
            const response = [envOne, envTwo];
            
            res.status(200).json({ envelopes: response });
        }
    } catch (err) {
        res.status(200).json({ envelopes: err.stack });
    }
}