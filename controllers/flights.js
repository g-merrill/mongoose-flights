const Flight = require('../models/flight');
const Ticket = require('../models/ticket');
const moment = require('moment');

module.exports = {
    index,
    new: newFlight,
    show,
    create
};

let title;

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
        title = 'flights#index';
        res.render('flights/index', { flights: formattedflights, title });
    });
}

function newFlight(req, res) {
    let defaultDepartDate = moment().add(1, 'years').format('YYYY-MM-DDTHH:mm');
    title = 'flights#new';
    res.render('flights/new', { defaultDepartDate, title });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        if (err) console.log('flightsCtrl flight find error', err);
        let formattedFlight = {};
        formattedFlight._id = flight._id;
        formattedFlight.airline = flight.airline;
        formattedFlight.flightNo = flight.flightNo;
        formattedFlight.departs = moment(flight.departs).format("dddd, MMMM Do YYYY, h:mm a");
        formattedFlight.airport = flight.airport;
        formattedFlight.destinations = [];
        if (flight.destinations.length) {
            for (let i = 0; i < flight.destinations.length; i++) {
                // setup a new dest object
                let dest = {};
                // add all needed properties to that object 
                dest.airport = flight.destinations[i].airport;
                dest.arrival = moment(flight.destinations[i].arrival).format("dddd, MMMM Do YYYY, h:mm a");
                // push the object into the empty array
                formattedFlight.destinations.push(dest);
            }
        }
        let defaultArriveDate = moment(flight.departs).add(3, 'hours').format('YYYY-MM-DDTHH:mm');
        Ticket.find({flight: flight._id}, function(err, tickets) {
            if (err) console.log('flightsCtrl ticket find error', err);
            console.log('flight: ', formattedFlight, `defaultArriveDate: ${defaultArriveDate}`, 'tickets: ', tickets);
            title = 'flights#show';
            res.render('flights/show', { flight: formattedFlight, defaultArriveDate, tickets, title });
        });
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