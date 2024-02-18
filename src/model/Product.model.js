import mongoose,{ Schema } from "mongoose";
const product = new Schema({
    productName: {
        type: String,
        required: [true, "Product Name required"]
    },
    quanlity: {type: Number},
    price: {type: Number},
    description: {type: String},
    user_manual: {type: String},
    Ingredient: {type: String},
    Preserve: {type: String},
    brandId: {type: String},
    origin: {type: String},
    views: {type: Number},
    EvaluteCount: {type: Number},
    InputDay_warehouse: {type: Date},
    package: {type: String},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date},
    updated: {type: Boolean},
    deleted: {type: Boolean, default: false},
    deleteAt: {type: Date}
}, {id: true})


export default mongoose.model('Products', product);
