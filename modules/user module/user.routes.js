import { Router } from "express";
import { validation } from "../../middlewere/validation.js";
import { passchangevalidator } from "../../utils/passchangevalidation.js";
import { resetvalidator } from "../../utils/resetvalidation.js";
import { updatevalidator } from "../../utils/update.js";
import { signupvalidator } from "../../utils/uservalidation.js";
import * as usercontroller from './user.controller.js'
const userrouter = Router()

userrouter.post('/adduser',validation(signupvalidator),usercontroller.signup)
userrouter.get ('/conformationemail/:token',usercontroller.conformition)
userrouter.post('/login',usercontroller.login)
userrouter.post ("/resetemail",usercontroller.resetemail)
userrouter.post('/resetpassword',validation(resetvalidator),usercontroller.resetpassword)
userrouter.post ("/logout",usercontroller.logout)
userrouter.post ("/logout",usercontroller.logout)
userrouter.put ("/update",validation(updatevalidator),usercontroller.update)
userrouter.delete('/delete',usercontroller.deleteuser)
userrouter.put('/updatepass',validation(passchangevalidator),usercontroller.changepass)
export default userrouter