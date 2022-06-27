const mongoose = require('mongoose');
const mongoURL = process.env.MONOGOCONNECTIONURL ||"mongodb://localhost:27017/admin"

const mongoDb = async() => {
    try {
        // mongoose.set('useCreateIndex',true);
        await mongoose.connect(mongoURL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(()=>{
            console.log(`MongoDB Connection established`)
        })
    } catch (error) {
        console.log(`mongo Connect got an ${error}`)
    }
    
}

module.exports = mongoDb;