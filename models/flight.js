const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {
        type: String
    },
    flightNo: {
        type: Number
    },
    departs: {
        type: Date
    }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;