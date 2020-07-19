const router = require('express').Router();
const Validator = require('../middleware/validator');
const PinController = require('../controllers/pinController');

router.post('/', Validator.validateAccess, Validator.validatePin, (req, res) => {
    PinController.create(req, res);
});

router.get('/', Validator.validateAccess, (req, res) => {
    PinController.fetchAll(req, res);
});

router.delete('/:id', Validator.validateAccess, (req,res)=>{
    PinController.delete(req,res);
});

module.exports = router;