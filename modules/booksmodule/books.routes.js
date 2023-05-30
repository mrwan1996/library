import { Router } from "express";
import { booksvalidator } from "../../utils/books validation.js";
import { validation } from "../../middlewere/validation.js";
import * as bookscontroller from './bookscontroller.js'
const booksrouter = Router()
booksrouter.post('/addbook' ,validation(booksvalidator),bookscontroller.addbook)
booksrouter.put('/borrow/:_id',bookscontroller.borrowbook)
booksrouter.put('/return/:_id',bookscontroller.returnbook)
booksrouter.get('/book',bookscontroller.bookbyname)
booksrouter.get('/late',bookscontroller.NotReturnedBooks)
export default booksrouter