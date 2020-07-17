const router = require('express').Router();
const UserController = require('../controllers/userController');
const { validateAuthBody, validateAccess, validatePin } = require('../middleware/validator');

router.post('/login', validateAccess, validateAuthBody, (req, res) => {
    UserController.fetch(req, res);
});

router.post('/signup', validateAccess, validateAuthBody, (req, res) => {
    UserController.create(req, res);
});

router.get('/user/:username/pins', validateAccess, (req,res)=>{
    UserController.fetchPins(req,res);
});

router.put('/user/:username', validateAccess, (req,res)=>{
    UserController.update(req,res);
})

router.post('/user/:username/pin', validateAccess, validatePin, (req,res)=>{
    UserController.addFav(req,res);
});

module.exports = router;