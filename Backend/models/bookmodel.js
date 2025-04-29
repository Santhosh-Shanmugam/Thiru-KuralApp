import mongoose from "mongoose";

const bookschema = mongoose.Schema(
    {
        title : {
            type : String,
            required: true,
        },
        author : {
            type : String,
            required: true,
        },
        publishYear: {
            type: Number,
            required : true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, // assuming it references a user document
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps : true
    }
);


export const Book = mongoose.model('cats', bookschema);