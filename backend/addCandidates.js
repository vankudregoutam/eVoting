const mongoose = require('mongoose');

const addCandidateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        partyname: {
            type: String,
            required: true
        },
        // symbol: {
        //     type: ,
        //     required: true
        // },
        date: {
            type: Date,
            default: Date.now
        },
    },
    {
        collection: 'CandidateInfo',
    }
);

mongoose.model('CandidateInfo', addCandidateSchema)