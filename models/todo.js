const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
        content: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        complete:{
            type: Boolean
        },
        userId: {
            ref:"userId",
            type: mongoose.Schema.Types.ObjectId
        }
    })
module.exports = mongoose.model('TodoTask',todoTaskSchema);