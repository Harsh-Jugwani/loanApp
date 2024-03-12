const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const user = require('./models/user')
const loan = require('./models/loan')
require("dotenv").config();
const app = express()
app.use(express.json())
app.use(cookieParser())


app.use(cors());
app.use(express.urlencoded({extended:false}))

app.use('/api/v1',require('./routes/authRoutes'))
app.use('/api/v1',require('./routes/loanRoutes'))

mongoose.connect(process.env.MOGODB)
        .then(()=>console.log("Database Connected"))
        .catch((error)=>console.log("data base not connected",error))

const start = async()=>{
    try{
    
        app.listen(8000,()=>console.log('I am listening..'))
    }
    catch(error){
        console.log(error);
    }
}
start()