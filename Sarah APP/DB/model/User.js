const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");

// const { INSUFFICIENT_SPACE_ON_RESOURCE } = require('http-status-codes');

const userScheam = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    messagesArray:[{type:mongoose.Schema.Types.ObjectId,ref:'Message'}],
    age: Number,
    phone: String,
   
    profilePic: String,
    coverPic: Array,
    loginStatus: { type: Boolean, default: false },
    lastseen: { type: String },
    emailConfirm: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        
    },
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
})
userScheam.pre('findOne',async function (result,next){
    if(result.phone){
        result.phone= CryptoJS.AES.decrypt(result.phone,process.env.encKey).toString(CryptoJS.enc.Utf8)
        console.log(result.phone);
        next();
    }
    else{
        next();
    }
    
})
const userModel = mongoose.model('User', userScheam); 
module.exports = userModel