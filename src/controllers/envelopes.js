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