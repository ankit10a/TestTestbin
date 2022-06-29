const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
        userName:{
            type: String,
        },
        firstName:{
            type: String,
        },
        lastName:{
            type: String,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default: Date.now()
        }
})
module.exports = mongoose.model('users',userSchema);