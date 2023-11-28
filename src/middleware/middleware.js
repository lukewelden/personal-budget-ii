import axios from "axios";

export const validateBudget = (req, res, next) => {
    if (isNaN(req.body.budget)) {
        return res.status(400).json({ error: 'Budget must be a number.' });
    }
    next();
}

export const performAsyncAction = async (req, res, next) => {
    try {
        await axios.get('https://picsum.photos/id/0/info');
        next();
    } catch (err) {
        next(err);
    };
};