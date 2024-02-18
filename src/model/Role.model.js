import mongoose , {Schema }  from "mongoose";
const Role = new Schema({
    roleName: {
        type: String,
        required: [true, "Role required"],
        unique: true,
    },
    createat: {type: Date, default: Date.now},
    updateat: {type: Date, default: null},
    deleteat: {type: Date, default: null},
    deleted: {type: Number, default: 0},

},  {id: true})


export default mongoose.model('role', Role)