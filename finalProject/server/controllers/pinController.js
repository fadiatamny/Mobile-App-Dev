const { pinModel } = require('../middleware/pinScheme');
const ErrHandler = require('../util/errorHandler');
class PinController {

    static async fetchAll(req, res) {
        try {
            res.status(200).json(await pinModel.getPins());
        } catch (e) {
            ErrHandler.handle(res, e);
        }
    }

    static async create(req, res) {
        try {
            const pin = pinModel({
                name: req.body.name,
                city: req.body.city,
                country: req.body.country,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                available: true
            });

            if ((await pin.exists()).length != 0) throw {
                status: 409,
                message: 'Pin already exists'
            };

            await pin.save();

            res.status(200).send('Successfully inserted');
        } catch (e) {
            ErrHandler.handle(res, e);
        }
    }

    static async delete(req, res) {
        try {
            let pin = await pinModel.getPinById(req.params.id);
            if (pin.lengh == 0) throw {
                status: 404,
                message: 'Pin does not exist'
            };
            pin = pin[0];
            await pinModel.deletePin(pin._id);
            res.status(200).send('Successfully Deleted');
        } catch (e) {
            ErrHandler.handle(res, e);
        }
    }
};

module.exports = PinController;