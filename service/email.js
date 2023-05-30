import nodemailer from 'nodemailer'
export const sendemail = async ({ to ="", message ="", subject ="" })=>
{
let transporter = nodemailer.createTransport({
    host: "127.0.0.1",
    port: 587,
    secure: false, 
    service:"gmail",
    auth: {
        user: "engmrwanmaged@gmail.com", 
        pass: "uwbgpgodtxcgiysg", 
}});

let info = await transporter.sendMail({
    from: "engmrwanmaged@gmail.com", 
    to,
    subject,
    html: message, 
})
console.log(info);
if (info.accepted.length)
{
  return true
}
return false
};