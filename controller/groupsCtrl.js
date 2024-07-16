const Groups = require('../models/groups');


// Create a new registration
exports.createRegistration = async (req, res) => {
    try {
        const newRegistration = new Groups(req.body);
        await newRegistration.save();
        res.status(201).json(newRegistration);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all registrations
exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Groups.find();
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single registration
exports.getRegistration = async (req, res) => {
    try {
        const registration = await Groups.findById(req.params.id);
        if (!registration) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json(registration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRegistration = async (req, res) => {
    console.log(req.params.id);
    try {
        const registration = await Groups.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(registration);
        if (!registration) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json(registration);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Delete a registration
exports.deleteRegistration = async (req, res) => {
    try {
        const registration = await Groups.findByIdAndDelete(req.params.id);
        if (!registration) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json({ message: 'Registration deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
