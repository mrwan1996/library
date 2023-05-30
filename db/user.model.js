import mongoose, { Schema } from "mongoose";
const userschema = new Schema ({
    name : {
        type:String,
        require:true,
    },
    email :{
        type: String,
        require:true ,
        unique:true 
    },
    password:{
        type:String,
        require:true
    },
    number:{
        type:String,
        require:true  
    },
    confermed:{
        type : Boolean,
        default:false
    },
    logedin:{
        type : Boolean,
        default:false   
    }
},

{
    timestamps:true
})

const usermodel = mongoose.model('user',userschema )
export default usermodel