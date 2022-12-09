const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Room = new Schema(
    {
        id1: { type: String },
        id2: { type: String },
        id1Name: {type: String},
        id2Name: {type: String},
        messages: {type: Array}
    },
    {
        timestamps: true,
    },
);


module.exports = mongoose.model('Room', Room);
