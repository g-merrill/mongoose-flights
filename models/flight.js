const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        // need to change this default to a function, that returns date that = current - 1 yr
        default: function() {
            let currentDate = new Date();
            let nextYearString = `${currentDate.getFullYear() + 1}-${currentDate.getMonth()}-${currentDate.getDay()}T${currentDate.getHours()}:${currentDate.getMinutes()}`;
            return nextYearString;
        }
    }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;