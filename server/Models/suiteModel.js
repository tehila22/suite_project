const mongoose = require('mongoose');


const suiteSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    floor: {
        type: Number
    },
    numRooms: {
        type: Number,
        required: true,

    },
    numBeds: {
        type: Number,
        required: true,
    },

    nightPrice: {
        type: Number,
        required: true,

    },
    pool: {
        type: Boolean,//לבדוק
    },

    jacuzzi: {
        type: Boolean
    },

    image: {
        type: String,
    },
})
const Suite = mongoose.model('Suite', suiteSchema);

module.exports = Suite;