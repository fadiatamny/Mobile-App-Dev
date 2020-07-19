const ErrHandler = require('../util/errorHandler');

const validateAuthBody = (req, res, next) => {
    if (!req.body.username || !req.body.password) ErrHandler.handle(res, { status: 403, message: 'Missing Variables' });
    else { if (next) next(); }
};

const validateAccess = (req, res, next) => {
    if (req.headers['api-key'] != process.env.API_KEY) ErrHandler.handle(res, { status: 401, message: 'Incorrect API KEY' });
    else { if (next) next(); }
};

const validateFav = (req, res, next) => {
    if (!req.body.pin) ErrHandler.handle(res, { status: 403, message: 'Missing Variables' });
    else { if (next) next(); }
};

const validatePin = (req, res, next) => {
    if (!req.body.name || !req.body.city || !req.body.country || !req.body.latitude || !req.body.longitude ) ErrHandler.handle(res, { status: 403, message: 'Missing Variables' });
    else { if (next) next(); }
};

module.exports = { validateAccess, validateAuthBody, validatePin };