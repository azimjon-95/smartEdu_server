const express = require('express');
const groups = express.Router();
const registrationController = require('../controller/groupsCtrl');

groups.post('/groups/', registrationController.createRegistration);
groups.get('/groups/', registrationController.getAllRegistrations);
groups.get('/groups/:id', registrationController.getRegistration);
groups.put('/groups/:id', registrationController.updateRegistration);
groups.delete('/groups/:id', registrationController.deleteRegistration);

module.exports = groups;



