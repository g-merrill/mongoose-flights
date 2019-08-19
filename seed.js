// run `node seed.js` from the root of this project folder

// boot up mongo
require('./config/database');

// require moment
const moment = require('moment');

// require all models
const Flight = require('./models/flight');
const Ticket = require('./models/ticket');

const freshFlights = [
    {
        airline: 'Southwest',
        flightNo: 482,
        departs: moment(new Date()).add(3, 'years').subtract(2, 'months'),
        airport: 'LAX',
        destinations: [{
            airport: 'SEA',
            arrival: moment(new Date()).add(3, 'years').subtract(2, 'months').add(3, 'hours')
        }]
    },
    {
        airline: 'Southwest',
        flightNo: 467,
        departs: moment(new Date()).subtract(1, 'years'),
        airport: 'DAL',
        destinations: [{
            airport: 'LAX',
            arrival: moment(new Date()).subtract(1, 'years').add(3, 'hours')
        }]
    }
];

module.exports = {
    deleteTickets,
    deleteFlights,
    seedFlights
};

function deleteTickets() {
    Ticket.deleteMany({}, err => {
        console.log('Cleared tickets from database');
    });
}

function deleteFlights() {
    Flight.deleteMany({}, err => {
        console.log('Cleared flights from database');
    });
}

function seedFlights() {
    Flight.create(freshFlights, err => {
        console.log('Seed flights: ', freshFlights);
    });
}