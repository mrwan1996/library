import express from 'express'
import connection from './db/connection.js'
import * as allroutes from './index.routes.js'
// import schedule from'node-schedule'
// import { nonconformid } from './modules/user module/user.controller.js'
const app = express()
// const job = schedule.scheduleJob('1 1 4 * * *', nonconformid
// );
const baseurl = '/api/v1'
const port = 3000
app.use (express.json())
connection()
app.use (`${baseurl}/books`,allroutes.booksrouter)
app.use (`${baseurl}/user`,allroutes.userrouter)
app.listen(port, console.log('server is running......'))