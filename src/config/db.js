const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connection established');
    } catch (err) {
        console.log('There was a mistake');
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;