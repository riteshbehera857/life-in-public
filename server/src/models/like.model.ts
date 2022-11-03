import { Schema, model, Model } from "mongoose";
import Post from './post.model'
import User from './auth.model'

const likesSchema = new Schema({
    post: {
        type: "ObjectID",
        ref: "Post"
    },
    user: {
        type: "objectID",
        ref: "User"
    }
}, {
    timestamps: true
})

const Likes = model("Likes", likesSchema)

export default Likes