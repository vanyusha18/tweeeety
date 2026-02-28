require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Event = require('../models/Event');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding');

        // Clear existing data
        await User.deleteMany({});
        await Event.deleteMany({});
        console.log('Existing data cleared');

        // Create a dummy user
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash('password123', salt);
        const user = new User({
            name: 'Jane Doe',
            email: 'jane@example.com',
            password: passwordHash
        });
        const savedUser = await user.save();
        console.log('Dummy user created');

        // Create events
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const events = [
            {
                name: 'Local Tech Meetup',
                description: 'Join us for a discussion on the latest in web development and AI.',
                date: tomorrow,
                location: 'Downtown Tech Hub',
                category: 'Tech',
                organizer: savedUser._id,
                organizerName: savedUser.name,
                rsvpCount: 45, // Simulation for trending
                rsvps: [] // Usually would be ObjectIds of users
            },
            {
                name: 'Community Art Exhibition',
                description: 'See amazing artwork from local talents. Free entry for everyone.',
                date: nextWeek,
                location: 'City Gallery',
                category: 'Arts',
                organizer: savedUser._id,
                organizerName: savedUser.name,
                rsvpCount: 12,
                rsvps: []
            },
            {
                name: 'Weekend Soccer Game',
                description: 'Casual pickup soccer game at the main park. Bring your own cleats!',
                date: tomorrow,
                location: 'Central Park',
                category: 'Sports',
                organizer: savedUser._id,
                organizerName: savedUser.name,
                rsvpCount: 20,
                rsvps: []
            }
        ];

        await Event.insertMany(events);
        console.log('Dummy events created');

        console.log('Seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedData();
