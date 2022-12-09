const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Workstation = new Schema(
    {
        name: { type: String },
        status: { type: Number },
    },
    {
        timestamps: true,
    },
);


module.exports = mongoose.model('Workstation', Workstation);
