import mongoose, { Schema, Types } from "mongoose";
const AccountUserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required field!'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required field'],
        minlength: [6, 'Password length must greater 6']
    },
    createat: {type: Date, default: Date.now},
    updateat: {type: Date, default: null},
    deleteat: {type: Date, default: null},
    deleted: {type: Number, default: 0},
    roleId:  {type: String },
    refreshToken: {
        type: String,
        default: null
    }
}, {id: true});

export default mongoose.model('accountusers', AccountUserSchema)

























