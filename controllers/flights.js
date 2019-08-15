const Flight = require('../models/flight');
const moment = require('moment');

module.exports = {
    index,
    new: newFlight,
    create
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { flights });
    });
}

function newFlight(req, res) {
    res.render('flights/new', { moment });
}

function create(req, res) {
    res.send(req.body);
}