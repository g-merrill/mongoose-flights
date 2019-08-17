const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create
};

function newTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        console.log(flight._id);
        res.render('tickets/new', { flight });
    });
}

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        if (err) console.log('flight find error', err);
        console.log(flight);
        Ticket.findById(flight._id, function(err, tickets) {
            if (err) console.log('ticket find error', err);
            console.log(tickets);
            req.body.flight = flight._id;
            !tickets ? tickets = new Ticket(req.body) : tickets.push(req.body);
            console.log(tickets);
            tickets.save(function(err) {
                if (err) console.log('ticket save error', err);
                res.redirect(`/flights/${flight._id}`);
            });
        });
    });
}