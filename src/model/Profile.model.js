import mongoose, { Schema } from "mongoose";

const Profile = new Schema({
    account_id: {type: String},
    firstname: {type: String, default: null},
    lastname: {type: String, default: null},
    address: {type: String, default: null},
    phoneNumber: {type: String, default: null},
    avatar: {type: String, default: null},
    update: {type: Boolean, default: false},
    delete: {type: Boolean, default: false},
}, {id: true, timestamps: true})


export default mongoose.model('profiles', Profile)