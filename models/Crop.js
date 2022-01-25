const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "No name specified"],
    },
    quantity: {
        type: Number,
    },
    unit: {
        type: String
    }, 
    schedule:{
        type: Date, 
        default: Date.now
    }, 
    intervalGive:{
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
});

mongoose.model("Crop", cropSchema);