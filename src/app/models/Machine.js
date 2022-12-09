const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Machine = new Schema(
    {
        workstation: {type: String},
        CPUData: {type: String},
        application: {type: String},
        profinetInfomation: {type: String},
        profibusAddress: {type: String},
        analogInput: {type: String},
        analogOutput: {type: String},
        digitalInput: {type: String},
        digitalOutput: {type: String},
        otherInfo: {type: String},
        status: {type: Number},
    },
    {
        timestamps: true,
    },
);


module.exports = mongoose.model('Machine', Machine);
