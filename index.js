const express = require("express")  // this package returns a function using which we can initiate a express application

const app = express();

const apiRouter = require("./src/routes");

app.use('/api', apiRouter)
app.get('/', (req, res)=>{
    res.send("hello there")
}).listen(3000, ()=>{
    console.log('server starte sucessfully at 3000');
})