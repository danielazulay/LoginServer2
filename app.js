require('dotenv').config()

const express = require('express')

const app = express()

app.use(express.json())

const cors = require('cors')

const connectToDb = require('./db/db.config')
const userRouter = require('./router/user.router')


app.use(cors())
async function init(){

const db = await connectToDb()

app.use("/",userRouter)

app.listen(process.env.PORT,()=>{

    console.log('conectado na porta '+process.env.PORT)
})
}

init()