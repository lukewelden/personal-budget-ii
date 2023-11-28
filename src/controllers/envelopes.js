import Model from '../models/model.js';

const envelopesModel = new Model('envelopes');

export const envelopesPage = async (req, res) => {
    try {
        const data = await envelopesModel.select('category, budget'); 
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
}