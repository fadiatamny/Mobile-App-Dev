const { userModel } = require('../middleware/userScheme');
const { genHash } = require('../util/cryptoHandler');
const ErrHandler = require('../util/errorHandler');

class UserController {

    static async fetch(req, res) {
        console.log(req.body);
        try {
            let user = await userModel.getUser(req.body.username);
            if (user.length == 0) throw {
                status: 404,
                message: 'User does not exist'
            }
            user = user[0];
            if (user.password != genHash(req.body.password, req.body.username)) throw {
                status: 401,
                message: 'Incorrect Password'
            }

            res.status(200).json({ username: user.username, name: user.name });
        } catch (e) {
            ErrHandler.handle(res, e);
        }
    }

    static async fetchPins(req, res) {
        try {
            let user = await userModel.getUser(req.params.username);
            if (user.length == 0) throw {
                status: 404,
                message: 'User does not exist'
            }
            user = user[0];

            res.status(200).json(user.pins);
        } catch (e) {
            ErrHandler.handle(res, e);
        }
    }

    static async create(req, res) {
        console.log(req.body);
        try {
            const user = userModel({
                username: req.body.username,
                password: genHash(req.body.password, req.body.username),
                name: req.body.name ? req.body.name : req.body.username
            });

            if ((await user.exists()).length != 0) throw {
                status: 409,
                message: 'User already exists'
            };

            await user.save();
            res.status(200).send('Successfully created');
        } catch (e) {
            ErrHandler.handle(res, e);
        }
    }

    static async addFav(req, res) {
        try {
            let user = await userModel.getUser(req.params.username);
            if (user.length == 0) throw {
                status: 404,
                message: 'User does not exist'
            }
            user = user[0];

            user.pins.append(req.body.pin);
            await user.updateUser(user);
            res.status(200).send('Successfully created');
        } catch (e) {
            ErrHandler.handle(res, e);
        }
    }

    static async update(req, res) {
        try {
            let user = await userModel.getUser(req.params.username);
            if (user.length == 0) throw {
                status: 404,
                message: 'User does not exist'
            }
            user = user[0];

            if(req.body.name) user.name = req.body.name;
            if(req.body.pins) user.pins = req.body.pins;;
            
            await userModel.updateUser(user);
            res.status(200).send('Successfully Updated');
        } catch (e) {
            ErrHandler.handle(res, e);
        }
    }
}

module.exports = UserController;