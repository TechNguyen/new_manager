import mongoose , {Schema }  from "mongoose";
const Role = new Schema({
    roleName: {
        type: String,
        required: [true, "Role required"],
        unique: true,
    },
    deleted: {type: Boolean, default: false},

},  {id: true, timestamps: true})


export default mongoose.model('role', Role)