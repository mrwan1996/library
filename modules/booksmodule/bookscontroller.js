import { booksmoedl } from "../../db/booksmodel.js"
import { tokenfunction } from "../../utils/token.js"
import moment from 'moment';
export const addbook = async (req,res)=>
{
try {
    const {name,section}= req.body
    const newbook = new booksmoedl ({name,section})
    const saved =await  newbook.save()
    saved
    ?    res.json ({message:'done',data:newbook})
    :    res.json ({message:' error'})

} catch (error) {
    res.json ({message:'catch error'})
    console.log(error);
}
}
export const borrowbook = async (req,res)=>{
try {
    const {token}=req.headers
    const {_id}=req.params
    const {borrowedate,returndate}=req.body
    const user = tokenfunction({payload:token,genrate:false})
    console.log(user);
    const book = await booksmoedl.findById({_id})
    if (book.Borrowed==true) {
        res.json ({message:'book is already borrowed'})
    } else {
        const borrow= await book.updateOne({Borrowed:true,borrowedby:user.id,borrowedate,returndate})
        borrow
        ?res.json ({message:'done'})
        :res.json ({message:'error'})
    }
} catch (error) {
    res.json ({message:'catch error'})
    console.log(error);
} 
}
export const returnbook = async (req,res)=>{
    try {
        const {_id}=req.params
        const book = await booksmoedl.findById({_id})
        if (!book.Borrowed==true) {
            res.json ({message:'book is already returned'})
        } else {
            const returned = await book.replaceOne({name:book.name,section:book.section,Borrowed:false})
            returned
            ?res.json ({message:'done'})
            :res.json ({message:'error'})
            
        }
    } catch (error) {
        res.json ({message:'catch error'})
        console.log(error);
    } 
}
export const bookbyname = async (req,res)=>
{
    try {
        const {token}=req.headers
        const {name}=req.body
        const user = tokenfunction({payload:token,genrate:false})
        const book = await booksmoedl.find({borrowedby:user.id,name})
        book.length
        ?res.json ({data:book})
        :res.json ({message:'cant find the required book'})
    } catch (error) {
        res.json ({message:'catch error'})
        console.log(error);     
    }
}
export const NotReturnedBooks = async (req,res)=>
{
    try {
        const {token}=req.headers
        const {name}=req.body
        const user = tokenfunction({payload:token,genrate:false})
        const book = await booksmoedl.find({borrowedby:user.id})
        if(book.length)
        {
            for (const books of book) {
                const {dayrate,date}=req.body
                var today = moment(date);
                var returrn =moment(`${books.returndate}`);
                var diff = today.diff(returrn,"days");
                console.log(diff);
                if (diff>0){
                    let charge = diff*dayrate
                    const updatelate = await books.updateOne ({late:diff,fine:charge})
                }else
                {
                    const updatelate = await books.updateOne ({late:0,fine:0}) 
                }
            }
            const newbook = await booksmoedl.find({borrowedby:user.id})
            res.json ({data:newbook})
        }else{
        
        res.json ({message:'cant find the required book'})

        }
    } catch (error) {
        res.json ({message:'catch error'})
        console.log(error);     
    }
}