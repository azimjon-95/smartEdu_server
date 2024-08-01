const express = require("express");
require("dotenv").config();
const students = require('./routes/students');
const groups = require('./routes/groups');
const teacher = require('./routes/teacher');
const attendanceRoutes = require('./routes/davomatRoures');
const payStudentStoryRoutes = require('./routes/payStudentStoryRoutes');
const balansRoutes = require('./routes/balansRoutes');
require('./cronJob'); // Cron jobni yuklaymiz
require('./controller/bot'); // Cron jobni yuklaymiz



const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const DATABASE = () => {
  // Using .catch()
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};
DATABASE();

// Register route
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/api", students);
app.use("/api", groups);
app.use("/api", teacher);
app.use("/balans", balansRoutes);
app.use("/api/attendances", attendanceRoutes);
// Talabalar to'lov marshrutlari
app.use("/api/payments", payStudentStoryRoutes);

const token = '7199689740:AAGcNe6PQGVX0EnQ-jqTGabOd1-z2UVmbAE';
const fileUpload = require('express-fileupload');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');



app.use(fileUpload());
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  const filePath = __dirname + '/' + file.name;
  // console.log(file);
  file.mv(filePath, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    try {
      const formData = new FormData();
      formData.append('document', fs.createReadStream(filePath));

      const response = await axios.post(`https://api.telegram.org/bot${token}/sendDocument`, formData, {
        headers: formData.getHeaders(),
        params: {
          chat_id: 39464759,
        },
      });
      // console.log(response);

      res.send('File uploaded and sent to Telegram bot successfully!');
    } catch (error) {
      res.status(500).send('Error sending file to Telegram bot.');
    } finally {
      fs.unlinkSync(filePath);
    }
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




