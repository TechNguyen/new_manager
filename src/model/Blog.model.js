import mongoose,{ Schema } from "mongoose";
const blog = new Schema({
    Title: {
        type: String,
    },
    DesCription: {
        type: String,
    },
    Content: {
        type: String,
    },
    BlogImages: {type: String},
    AuthorId: {type: String},
    Topic: {type: String},
    updated: {type: Boolean},
    deleted: {type: Boolean, default: false},
    deleteAt: {type: Date}
}, {id: true, timestamps: true})


export default mongoose.model('BlogNews', blog);
