const express = require("express");
require("dotenv").config();
const students = require('./routes/students');
const groups = require('./routes/groups');
const teacher = require('./routes/teacher');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const DATABASE = () => {
    // Using .catch()
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB connected successfully');
        }).catch(err => {
            console.error('MongoDB connection error:', err);
        });
}
DATABASE();

// Register route
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.use("/api", students);
app.use("/api", groups);
app.use("/api", teacher);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
