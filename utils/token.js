import jwt from "jsonwebtoken"
export const tokenfunction = (
{
payload = {},
signuture = "key",
genrate = true
}
)=>{
if (genrate , typeof payload == 'object')
{
   const token = jwt.sign(payload,signuture)
   return token 
}else{
    const decode = jwt.verify (payload,signuture)
    return decode

}
}