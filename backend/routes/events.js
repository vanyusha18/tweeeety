const router = require('express').Router();
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all events (with optional search and filter)
router.get('/', async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) {
            query.category = category;
        }

        const events = await Event.find(query).sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new event (Protected)
router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newEvent = new Event({
            ...req.body,
            organizer: req.user,
            organizerName: user.name
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user's events (Protected)
router.get('/user/me', auth, async (req, res) => {
    try {
        const events = await Event.find({ organizer: req.user }).sort({ date: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an event (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Verify user owns the event
        if (event.organizer.toString() !== req.user) {
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// RSVP to an event (Protected)
router.post('/:id/rsvp', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Check if user already RSVP'd
        if (event.rsvps.includes(req.user)) {
            return res.status(400).json({ message: 'Already RSVP\'d to this event' });
        }

        event.rsvps.push(req.user);
        event.rsvpCount = event.rsvps.length;
        await event.save();

        res.json({ message: 'RSVP successful', rsvpCount: event.rsvpCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
