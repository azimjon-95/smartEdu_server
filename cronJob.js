const updateIndebtedness = require('./service/paymentService');

const checkMonthlyUpdate = () => {
    const today = new Date();
    console.log(today.getDate());
    if (today.getDate() === 23 || today.getDate() === 2 || today.getDate() === 3) {
        updateIndebtedness();
    }
};
// Hozirgi vaqtdan ertaga 00:00 ga qadar bo'lgan vaqtni hisoblash
const now = new Date();
const nextMidnight = new Date(now);
nextMidnight.setHours(24, 0, 0, 0); // Ertaga 00:00
// nextMidnight.setHours(0, 0, 0, 0); // Ertaga 00:00
const timeToMidnight = nextMidnight - now;

// Dastlabki setTimeout orqali birinchi 00:00 vaqtini kutamiz, keyin har 24 soatda tekshiramiz
setTimeout(() => {
    checkMonthlyUpdate();
    setInterval(checkMonthlyUpdate, 86400000); // 86400000ms = 24 soat
    // setInterval(checkMonthlyUpdate, 8000); // 86400000ms = 8 sekund
}, timeToMidnight);
