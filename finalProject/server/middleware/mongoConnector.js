const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
    .connect(url, options)
    .then(db => console.log(`conncted to: ${db.connection.name}`))
    .catch(err => console.log(`connection error:`, err))

module.exports = mongoose;