var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights');

/* GET flights listing. */
router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);
router.get('/sort', flightsCtrl.sort);

router.get('/seed', flightsCtrl.seed);
router.get('/delete', flightsCtrl.delete);

router.get('/:id', flightsCtrl.show);
router.post('/', flightsCtrl.create);


module.exports = router;
