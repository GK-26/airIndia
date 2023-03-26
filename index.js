const express = require("express")  // this package returns a function using which we can initiate a express application
const {connect} = require('./src/config/database');
const app = express();
const User = require('./src/models/user')
const apiRouter = require("./src/routes");

app.use('/api', apiRouter)
app.get('/', (req, res)=>{
    res.send("hello there")
}).listen(3000, async ()=>{
    console.log('server started sucessfully at 3000');
    try{
        await connect();
    console.log("db connected sucessfully");
    let user = await User.create({
        email: "sri@example.com",
        password: "123456",
        username: "sri"
    })

    console.log(user);
    }catch(err){
        console.log(err.message);

    }
    
})