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
    console.log(envelopeId);
    console.log(typeof(envelopeId));
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