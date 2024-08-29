const express = require('express');
const bot = express.Router();
const { sendMessages, sendCertificate } = require('../controller/bot/botWebApp');

bot.post('/send-messages', sendMessages);
bot.post('/upload', sendCertificate);

module.exports = bot;