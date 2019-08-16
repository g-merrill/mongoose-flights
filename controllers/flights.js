const Flight = require('../models/flight');
const moment = require('moment');

module.exports = {
    index,
    new: newFlight,
    show,
    create
};

function index(req, res) {
    let formattedflights = [];
    Flight.find({}, function(err, flights) {
        flights.forEach(flight => {
            let formattedFlight = {};
            formattedFlight._id = flight._id;
            formattedFlight.airline = flight.airline;
            formattedFlight.flightNo = flight.flightNo;
            formattedFlight.departs = moment(flight.departs).format("dddd, MMMM Do YYYY, h:mm a");
            formattedFlight.airport = flight.airport;
            // formattedFlight.destinations.airport = flight.destinations.airport;
            // formattedFlight.destinations.arrival = flight.destinations.arrival;
            formattedflights.push(formattedFlight);
        });
        res.render('flights/index', { flights: formattedflights });
    });
}

function newFlight(req, res) {
    let defaultDepartDate = moment().add(1, 'years').format('YYYY-MM-DDTHH:mm');
    res.render('flights/new', { defaultDepartDate });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        let formattedFlight = {};
        formattedFlight._id = flight._id;
        formattedFlight.airline = flight.airline;
        formattedFlight.flightNo = flight.flightNo;
        console.log(flight.departs);
        formattedFlight.departs = moment(flight.departs).format("dddd, MMMM Do YYYY, h:mm a");
        console.log(formattedFlight.departs);
        formattedFlight.airport = flight.airport;
        // *************************
        if (flight.destinations.length) {
            formattedFlight.destinations = flight.destinations;
            for (let i = 0; i < formattedFlight.destinations.length; i++) {
                console.log(formattedFlight.destinations[i].arrival);
                formattedFlight.destinations[i].arrival = moment(formattedFlight.destinations[i].arrival).format("dddd, MMMM Do YYYY, h:mm a");
                console.log(formattedFlight.destinations[i].arrival);
            }
            // formattedFlight.destinations.forEach(destination => {
            //     destination.arrival = moment(destination.arrival).format("dddd, MMMM Do YYYY, h:mm a");
            // });
        }
        // ***********************
        let defaultArriveDate = moment(flight.departs).add(3, 'hours').format('YYYY-MM-DDTHH:mm');
        // console.log(formattedFlight)
        res.render('flights/show', { flight: formattedFlight, defaultArriveDate });
    });
}

function create(req, res) {
    req.body.flightNo = parseInt(req.body.flightNo);
    req.body.departs = new Date(req.body.departs);
    let flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) {
            console.log(err);
            return res.redirect('/flights');
        }
        console.log(flight);
        res.redirect('/flights');
    });
}