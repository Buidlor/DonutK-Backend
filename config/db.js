const mongoose = require('mongoose');

// Connect to the Mongo DB
const connectDB = async (connectionString) => {
    try {
        await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;