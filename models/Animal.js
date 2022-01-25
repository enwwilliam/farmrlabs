const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "No name specified"],

    },
    integerOnly: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        alias: 'i'
    },
    schedule:{
        type: Date, 
        default: Date.now
    }, 
    intervalFood:{
        type: Number
    },
    createdAt:{
        type: Date, 
        default: Date.now
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

mongoose.model("Animal", animalSchema);