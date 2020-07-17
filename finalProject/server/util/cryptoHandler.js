const crypto = require('crypto');

const genHash = (val, salt) => {
    const genSalt = (val) => crypto.createHash('sha256').update(val, 'utf8').digest();
    return crypto.createHash('sha256').update(val, 'utf8').update(genSalt(salt)).digest('base64');
};

module.exports = { genHash };