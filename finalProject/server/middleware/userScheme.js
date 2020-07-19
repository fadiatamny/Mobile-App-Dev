const mongoose = require('./mongoConnector');
const { pinScheme } = require('./pinScheme');

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pins: []
}, {
    timestamps: true,
    collection: 'Users'
});

userScheme.static('getUser', async function (username) {
    return await this.find({ username: username }, (err, res) => {
        if (err) throw err;
    });
});

userScheme.static('updateUser', async function (obj) {
    return await this.updateOne({ _id: obj._id }, obj);
});

userScheme.method('exists', async function () {
    return await this.model('User').find({ username: this.username }, (err, res) => {
        if (err) throw err;
    })
});

const userModel = mongoose.model('User', userScheme);

module.exports = { userModel, userScheme };