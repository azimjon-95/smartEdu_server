const express = require('express');
const router = express.Router();
const payStudentStoryController = require('../controller/payStudentStoryController');

router.post('/', payStudentStoryController.createPayment);
router.get('/', payStudentStoryController.getPayments);
router.get('/:id', payStudentStoryController.getPaymentById);
router.put('/:id', payStudentStoryController.updatePayment);
router.delete('/:id', payStudentStoryController.deletePayment);

module.exports = router;

