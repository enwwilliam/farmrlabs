const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
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
    createdAt:{
        type: Date, 
        default: Date.now
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

mongoose.model("Resource", resourceSchema);