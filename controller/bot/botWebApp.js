const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

// Telegram bot tokeningizni bu yerga joylashtiring
const token = process.env.YOUR_BOT_TOKEN;
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


// Function to check if a phone number is associated with a Telegram user
// const checkPhoneNumber = async (phoneNumber) => {
//     try {
//         const response = await axios.post(`https://api.telegram.org/bot${bot.token}/getContact`, {
//             phone_number: phoneNumber,
//         });
//         return response.data.ok;
//     } catch (error) {
//         console.error('Error checking phone number:', error);
//         return false;
//     }
// };

// const setMessage = async (phoneNumber, message) => {
//     // const isUserValid = await checkPhoneNumber(phoneNumber);
//     // if (isUserValid) {
//     try {
//         await bot.sendMessage(phoneNumber, message);
//         console.log(`Message sent to ${phoneNumber}`);
//     } catch (error) {
//         console.error(`Error sending message to ${phoneNumber}:`, error);
//     }
//     // } else {
//     //     console.log(`Phone number ${phoneNumber} is not associated with a Telegram user.`);
//     // }
// };

// const sendMessages = async (req, res) => {
//     const { students, message } = req.body;
//     for (const student of students) {
//         await setMessage(student.studentPhoneNumber, message);
//         await setMessage(student.parentPhoneNumber, message);
//     }
//     res.send('Messages sent');
// };
const sendMessages = async (req, res) => {
    const { students } = req.body;

    const promises = students.map(student => {
        if (student.debt > 0) {
            const message = `Hurmatli ${student.name}, sizning qarzingiz: ${student.debt} so'm.`;
            const url = `https://api.telegram.org/bot${token}/sendMessage`;
            return axios.post(url, {
                chat_id: student.telegramUsername,
                text: message,
            })
                .catch(error => {
                    console.error(`Error sending message to ${student.telegramUsername}:`, error.response ? error.response.data : error.message);
                });
        }
    });

    try {
        await Promise.all(promises);
        res.status(200).send('Messages sent');
    } catch (error) {
        console.error('Error sending messages:', error);
        res.status(500).send('Error sending messages');
    }
};

// -----------------------
// Create Certificate
const CertificateModel = require('../../models/certificateModel'); // MongoDB model

const sendCertificate = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const filePath = `${__dirname}/${file.name}`;

    // Foydalanuvchi ma'lumotlarini olish
    const { fullName, date, teacherFullName, directorFullName, level } = req.body;

    file.mv(filePath, async (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        try {
            // PDF faylni Telegram botiga yuborish
            const formData = new FormData();
            formData.append('document', fs.createReadStream(filePath));

            const response = await axios.post(`https://api.telegram.org/bot${bot.token}/sendDocument`, formData, {
                headers: formData.getHeaders(),
                params: {
                    chat_id: 39464759,
                },
            });

            // Ma'lumotlarni MongoDB'ga saqlash
            const newCertificate = new CertificateModel({
                fileName: file.name,
                filePath: filePath,
                fullName,
                date,
                teacherFullName,
                directorFullName,
                level
            });
            await newCertificate.save();

            res.send('File uploaded, saved to MongoDB, and sent to Telegram bot successfully!');
        } catch (error) {
            res.status(500).send('Error processing file or saving to MongoDB.');
        } finally {
            fs.unlinkSync(filePath);
        }
    });
};

module.exports = { sendMessages, sendCertificate };

