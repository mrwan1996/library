import { Schema } from "mongoose";
import mongoose from "mongoose";
const booksschema = new Schema({
    name:String,
    section:String,
    Borrowed:{
        type:Boolean,
        default:false
    },
    borrowedby:{
        type:Schema.Types.ObjectId,
        ref:'usermodel'
    },
    borrowedate:{
        type:Date
    },
    returndate:Date,
    late:{
        type:Number,
    },
   fine:{
    type:Number,
    }
})
export const booksmoedl =  mongoose.model('book',booksschema)