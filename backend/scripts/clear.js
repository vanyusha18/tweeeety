require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Event = require('../models/Event');

const clearData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for clearing data');

        // Clear existing data
        await User.deleteMany({});
        await Event.deleteMany({});
        console.log('Existing data cleared. The database is now empty.');

        process.exit(0);
    } catch (err) {
        console.error('Clearing error:', err);
        process.exit(1);
    }
};

clearData();
