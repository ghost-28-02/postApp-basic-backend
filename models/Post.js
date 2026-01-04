const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 100
        },

        content: {
            type: String,
            required: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },

        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],

        dislikes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],

        comments: [
            {
                User: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                text: {
                    type: String,
                    required: true
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        tags: [String],

        isEdited: {
            type: Boolean,
            default: false
        },

        visiblity: {
            type: String,
            enum: ["public","private"],
            default: "public"
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post",postSchema);