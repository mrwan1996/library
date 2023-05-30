import usermodel from "../../db/user.model.js";
import bcrypt from 'bcryptjs'
import { sendemail } from "../../service/email.js";
import { tokenfunction } from "../../utils/token.js";
export const signup = async(req,res,next)=>
{
try {
    const {name,email,number,password,cpassword}=req.body
    const emailcheck = await usermodel.findOne({email})
    if (emailcheck){
        res.json({message:'email is allready used'})
    }else{
        
        const hashedpassword= bcrypt.hashSync(password,8)
        const newuser= new usermodel({
            name,
            email,
            number,
            password:hashedpassword,
        })
        const token = tokenfunction({payload:{user:newuser}})
        const conformationemail = `${req.protocol}://${req.headers.host}/api/v1/user/conformationemail/${token}`
        sendemail({to:newuser.email,
            message:`'<a href = ${conformationemail}> click to confirm </a>`,
            subject:'conformation email'})
        if(sendemail){
            res.json({ message: 'done', data: newuser })
        }else{
            res.json({ message: 'unknownn error' })
        }
    }

} catch (error) {
    if (error.code == 11000) {
        return res.json({ message: 'mail is allready used' })
    }
    console.log(error);
    res.json({ message: "catch error" })
}
}
export const conformition = async (req,res)=>{
    const {token}=req.params
    const decode = tokenfunction({payload:token,genrate:false})
    const conformiduser = new usermodel({...decode.user})
     await conformiduser.save()
    const conferm = await usermodel.findByIdAndUpdate (decode.user._id,{confermed:true})
    res.json ({message:'done try to log in'})
}
// export const nonconformid = async (req,res)=>
// {
//     const users= await usermodel.deleteMany({confermed:false})
//     if(users.deletedCount){
//         console.log('unconformid users deleted');
//     }
//     else{
//         console.log('all users are conformid');
//     }
// }
export const login = async (req,res)=>
{
    const {email,password}=req.body
    const user = await usermodel.findOne({email})
    if(user){
        console.log(user);
        if(!user.confermed){
            res.json ({message:'pleasee confirm ur email'})
        }else{ const passwordcheck = bcrypt.compareSync(password, user.password)
            if (passwordcheck) {
                const log = await user.updateOne({logedin:true})
               const token =  tokenfunction({payload:{id:user._id},})
               res.json ({message:'wellcome back',token:token})
            } else  {
                res.json ({message:'wrong pass information'})
            }
        }}else{
            res.json ({message:'wrong information'})
        }

}
export const resetemail = async (req,res)=>
{
    const {email}=req.body
    const user = await usermodel.findOne({email})
    if(!user){
        res.json ({message:'invalid email'})
    }else{
        const token = tokenfunction({payload:{user:user}})
    const resetemail = `${req.protocol}://${req.headers.host}/api/v1/user/resetemail/${token}`
    sendemail({to:user.email,
        message:`'<a href = ${resetemail}> click to reset </a>`,
        subject:'reset password email'})
    if(sendemail){
        res.json({ message: 'please check your email' })
    }else{
        res.json({ message: 'unknownn error' })
    }}
}
export const resetpassword = async(req,res)=>
{
try {
    const {_id}=req.headers
    const { newpassword,cpassword }= req.body
    const hashedpassword = bcrypt.hashSync(newpassword,8)
    const user = await usermodel.findByIdAndUpdate ({_id},{password:hashedpassword})
    if (user) {
        res.json({ message: "done" })
    } else {
        res.json({ message: "error" })
    }
} catch (error) {
    console.log(error);
    res.json({ message: "catch error" })
}
}
export const logout = async(req,res)=>{
 try {
    const {token}=req.headers
    const user = tokenfunction({payload:token,genrate:false})
    console.log(user);
    const userout = await usermodel.findByIdAndUpdate(user.id,{logedin:false})
    if (userout) {
        res.json({ message: "done"})
    }else{
        res.json({ message: "error"})
    }
 } catch (error) {
    console.log(error);
    res.json({ message: "catch error" })
 }}
 export const update = async (req,res)=>
 {
try {
    const {token} = req.headers
    const {name , number } = req.body
    const user = tokenfunction({payload:token,genrate:false})
    const updateuser = await usermodel.findOneAndUpdate({_id:user.id,logedin:true},{name,number}, {new:true})
    updateuser
    ?    res.json({ message: "done",data:updateuser })
    :    res.json({ message: "error"})
} catch (error) {
    console.log(error);
    res.json({ message: "catch error" })
}
}
export const deleteuser = async (req,res)=>{
    try {
        const {token}=req.headers
        const user = tokenfunction({payload:token,genrate:false})
        const deleteuser = await usermodel.findByIdAndDelete ({_id:user.id,logedin:true})
        if (deleteuser) {
            res.json({ message: "done"})
        } else {
            res.json({ message: "error"})
        }
    } catch (error) {
        console.log(error);
        res.json({ message: "catch error" })  
    }
   

}
export const changepass = async (req,res)=>
{
try {
    const {token}=req.headers
    const {password ,newpassword,cpassword}=req.body
    const decode = tokenfunction({payload:token,genrate:false})
    const user = await usermodel.findOne({_id:decode.id,logedin:true})
    const passwordcheck = bcrypt.compareSync(password,user.password)
    if (passwordcheck)
    {
        const hachedpass= bcrypt.hashSync(newpassword,8)
        const updated = await user.updateOne({password:hachedpass})
        updated
        ? res.json({ message: "done" })
        : res.json({ message: "error2" })
   }else{
    res.json({ message: "error" })
   }
} catch (error) {
    console.log(error);
    res.json({ message: "catch error" })  
}
}