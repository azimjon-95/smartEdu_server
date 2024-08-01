const TelegramBot = require('node-telegram-bot-api');

// Telegram bot tokeningizni bu yerga joylashtiring
const token = '7199689740:AAGcNe6PQGVX0EnQ-jqTGabOd1-z2UVmbAE';
const webUrl = 'https://smart-edu-pearl.vercel.app/';

// Botni yaratish
const bot = new TelegramBot(token, { polling: true });

// Start komandasi uchun handler
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Assalomu alaykum! Quyidagi tugmani bosing:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Menu", web_app: { url: webUrl } }]
            ]
        }
    });
});

// Boshqa handlerlar
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    // Agar bu yerda boshqa xabarlar uchun javob berish kerak bo'lsa, yozishingiz mumkin
});
