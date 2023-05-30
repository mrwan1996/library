import mongoose from "mongoose";
const  connection = async()=>
{ return await mongoose
.connect('mongodb://127.0.0.1:27017/library')
  .then(() => console.log('Connected!'))
  .catch((error)=>console.log('db error',error))
}
  export default connection