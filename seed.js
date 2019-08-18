// run `node seed.js` from the root of this project folder

// boot up mongo
require('./config/database');

// require moment
const moment = require('moment');

// require all models
const Flight = require('./models/flight');
const Ticket = require('./models/ticket');

const freshFlight = [
    {
        airline: 'Southwest',
        flightNo: 482,
        departs: moment(new Date()).add(3, 'years'),
        airport: 'LAX',
        destinations: [{
            airport: 'SEA',
            arrival: moment(new Date()).add(3, 'years').add(3, 'hours')
        }]
    }
];

Flight.deleteMany({}, err => {
    console.log('Cleared flights from database');
    Flight.create(freshFlight, err => {
        console.log(freshFlight);
        if (err) {
            console.log(err) 
        }
        return;
    });
});