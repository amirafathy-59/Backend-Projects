const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");

// const { INSUFFICIENT_SPACE_ON_RESOURCE } = require('http-status-codes');

const userScheam = new mongoose.Schema({
    
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum:['Male','Female'],
        default:"Male"
    },
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    followings:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    profilePic: String,
    coverPic: Array,
    gallery: Array,
    online: { type: Boolean, default: false },
    isBlocked: { type: Boolean , default:false },
    emailConfirm: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default:"User"
        
    },
    QRCode: {
        type: String,
        required: false
    },
    socialLinks:Array,
    pdfLink: String,
    code:String,
     
}, {
    timestamps: true
})


userScheam.pre('save', async function (next) { // hook pre (before saving data in DB)
    console.log(this);
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound)/* to measure strength of password*/ )
    console.log(this);
    next()
})

userScheam.pre('findOneAndUpdate',async function (next){
    console.log(this.model,this.getQuery());
    const hookData= await this.model.findOne(this.getQuery()).select("__v");
    console.log(hookData);
    this.set({__v:hookData.__v+1});
    next();
})

const userModel = mongoose.model('User', userScheam); 
module.exports = userModel