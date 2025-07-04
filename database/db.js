const mongoose  = require('mongoose');
require('dotenv').config();

const connectToDB = async()=>{
    try {
        await mongoose.connect('mongodb+srv://dellaama123:dellaama12345@cluster0.2oxvb0w.mongodb.net/');
        console.log('mongodb database connected successfully!');
    } catch (e) {
        console.error('Mongodb connection failed', e);
        process.exit(1)
    }
}

module.exports = connectToDB;