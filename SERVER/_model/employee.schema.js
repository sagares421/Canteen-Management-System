var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Schema_Employee = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        default: 'test'
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        enum: [0, 1],
        default: 0
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    created_by: {
        type: ObjectId
    },
    updated_at: {
        type: Date,
        default: null
    },
    updated_by: {
        type: ObjectId,
        required: false,
        ref: 'Employee',
        default: null
    }
});
module.exports = mongoose.model('Employee', Schema_Employee);