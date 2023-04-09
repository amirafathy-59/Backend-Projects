
import { Schema, model } from "mongoose";


const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    image: String,
    confirmEmail: {
        type: Boolean,
        default: false
    },
    accountType: {
        type: String,
        default: 'system',
        enum: ['system', 'google']
    }
}, {
    timestamps:true
})

const userModel =  model("User" , userSchema)
export  default userModel