const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    // createdBy: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User', // Reference to the User model
    //     required: true
    // },
    participants: [{
        type: String,//Schema.Types.ObjectId,
        ref: 'User' // Array of user references
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);
