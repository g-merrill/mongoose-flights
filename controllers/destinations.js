const Flight = require('../models/flight');
const moment = require('moment');

module.exports = {
    create
};

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        req.body.arrival = new Date(req.body.arrival);
        flight.destinations.push(req.body);
        flight.save(function(err) {
            if (err) {
                console.log(err);
                return res.redirect(`/flights/${flight._id}`);
            }
            // let formattedFlight = {};
            // formattedFlight._id = flight._id;
            // formattedFlight.airline = flight.airline;
            // formattedFlight.flightNo = flight.flightNo;
            // formattedFlight.departs = moment(flight.departs).format("dddd, MMMM Do YYYY, h:mm a");
            // formattedFlight.airport = flight.airport;
            // formattedFlight.destinations = flight.destinations;
            // let defaultArriveDate = moment(flight.departs).add(3, 'hours').format('YYYY-MM-DDTHH:mm');
            // console.log(formattedFlight)
            // res.render('flights/show', { flight: formattedFlight, defaultArriveDate }
            res.redirect(`/flights/${flight._id}`);
        });
    });
}