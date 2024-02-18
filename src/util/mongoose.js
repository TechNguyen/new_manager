export default {
    mutipleMongooseToObject : (mongooses) => {
        return mongooses.map(mongoose => mongoose.ToObject())
    },
    mongooseToObject :  (mongoose) => {
        return mongoose ? mongoose.ToObject() : mongoose
    }
}