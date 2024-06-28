const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

// Ustozlar uchun schema
const teacherSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    middleName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Erkak', 'Ayol']
    },
    nationality: {
        type: String,
        required: true,
        enum: [
            'O‘zbekiston', 'Rossiya', 'AQSH', 'Birlashgan Qirollik', 'Germaniya', 'Fransiya', 'Xitoy', 'Yaponiya', 'Boshqa'
        ]
    },
    maritalStatus: {
        type: String,
        required: true,
        enum: ['Single', 'Married', 'Divorced', 'Widowed']
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        enum: [
            'algebra', 'geometriya', 'matematik-analiz', 'fizika', 'kimyo', 'biologiya', 'tarix', 'geografiya', 'sotsiologiya',
            'ingliz-tili-kattalarga', 'ingliz-tili-bolalarga', 'rus-tili', 'fransuz-tili', 'nemis-tili', 'koreys-tili', 'adabiyot',
            'ona-tili', 'webdasturlash', 'mental-arifmetika'
        ]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true
    },
    balans: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    teachersId: {
        type: String
    }
}, {
    timestamps: true
});

// Saqlashdan oldin parolni hashlash
teacherSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

// Parolni tekshirish metodi
teacherSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Teacher modelini yaratish
const Teacher = mongoose.model('Teacher', teacherSchema);

// Teacher modelini eksport qilish
module.exports = Teacher;




