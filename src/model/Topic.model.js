import mongoose, { Schema } from "mongoose";

const topic = new Schema(
    {
        topicName: {type: String},
        parentTopic: {type: String, default: null},
        createat: {type: Date, default: Date.now},
        updateat: {type: Date},
        deleteat: {type: Date},
        update: {type: Boolean, default: false},
        delete: {type: Boolean, default: false},
    },  
    {id: true}
)

export default mongoose.model('Topics', topic)