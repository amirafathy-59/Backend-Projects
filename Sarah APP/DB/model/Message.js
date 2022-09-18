const mongoose = require('mongoose');

const messageScheam = new mongoose.Schema({
    messageBody: {
        type: String,
        required: true
    },
    reciverId  : {
        type :mongoose.Schema.Types.ObjectId ,
        ref : "User", /// to make relation with user collection
        required : true
    },
    senderId  : {
        type :mongoose.Schema.Types.ObjectId ,
        ref : "User"
    },
}, {
    timestamps: true
})

const messageModel = mongoose.model('Message', messageScheam);
module.exports = messageModel