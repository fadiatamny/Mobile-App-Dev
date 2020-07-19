const mongoose = require('./mongoConnector');

const pinScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: 'Pins'
});

pinScheme.static('getPins', async function () {
    return await this.find({}, (err, res) => {
        if (err) throw err;
    });
});

pinScheme.static('getPin', async function (longitude, latitude) {
    return await this.find({ longitude: longitude, latitude: latitude }, (err, res) => {
        if (err) throw err;
    });
});

pinScheme.static('getPinById', async function (id) {
    return await this.find({ _id: id }, (err, res) => {
        if (err) throw err;
    });
});
pinScheme.static('updatePin', async function (obj) {
    return await this.updateOne({ _id: obj._id }, obj);
});

pinScheme.method('exists', async function () {
    return await this.model('User').find({ longitude: this.longitude, latitude: this.latitude }, (err, res) => {
        if (err) throw err;
    })
});

pinScheme.static('deletePin', async function (id) {
    return await this.deleteOne({ _id: id }, (err) => {
        if (err) throw err;
    });
});

const pinModel = mongoose.model('Pin', pinScheme);

module.exports = { pinModel, pinScheme };