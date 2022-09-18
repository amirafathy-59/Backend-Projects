const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");

// const { INSUFFICIENT_SPACE_ON_RESOURCE } = require('http-status-codes');

const postScheam = new mongoose.Schema({
    
   text: String,
   image:{type:Array,required:true},
   createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
   likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],// type of array
   comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}],
   share:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],// type of array
   isDeleted:{type:Boolean,default:false},
   
   deletedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},


     
}, {
    timestamps: true
})





const postModel = mongoose.model('Post', postScheam); 
module.exports = postModel