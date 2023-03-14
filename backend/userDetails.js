const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true,
            unique: true
        },
        dob: {
            type: String,
            required: true
        },
        pass: {
            type: String,
            required: true
        },
        conPass: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
    },
    {
        collection: 'UserInfo',
    }
);

mongoose.model('UserInfo', UserDetailSchema)