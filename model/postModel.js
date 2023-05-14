const  mongoose = require("mongoose")

const Schema = mongoose.Schema
 const postSchema = new Schema({
    title: {
        type: String,
        required: 'Title should not be blank'
    },
    user_id: {
        type: String,
        required: 'Description should not be blank'
    },
    description: {
        type: String,
        required: 'Description should not be blank'
    },
    likes: {
        type: Number,
        default: 0
    },
    usersLiked: {
        type: [String],
        default: 0
    },
    comments: {
        type: [Object],
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
})
module.exports= postSchema