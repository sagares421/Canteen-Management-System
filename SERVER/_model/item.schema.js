var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Schema_Item = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: [0, 1],
        required: true,
        default: 0
    },
    is_active: {
        type: Boolean,
        required: true,
        default: false
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    created_by: {
        type: ObjectId,
        required: true,
        ref: 'Employee',
        default: null
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
module.exports = mongoose.model('Item', Schema_Item);