const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");

// const { INSUFFICIENT_SPACE_ON_RESOURCE } = require('http-status-codes');

const commentScheam = new mongoose.Schema({
    
   text: String,
  
   createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
   likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],// type of array
   
   reply:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}],// type of array
   postId:{type:mongoose.Schema.Types.ObjectId,ref:"Post"},
   isDeleted:{type:Boolean,default:false},
   deletedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},


     
}, {
    timestamps: true
})





const commentModel = mongoose.model('Comment', commentScheam); 
module.exports = commentModel