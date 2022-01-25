const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "No name specified"]
    },
    email:{
        type: String,
        required: [true, "No email specified"],
        unique: [true, "Email has been used"]
    },

    password:{
        type: String,
        required: [true, "No password specified"]
    }
})

mongoose.model('User', userSchema);
