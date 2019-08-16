var express = require('express');
var router = express.Router();
const destinationsCtrl = require('../controllers/destinations');

/* POST destination */
router.post('/flights/:id', destinationsCtrl.create);


module.exports = router;
