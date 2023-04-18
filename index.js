const express = require("express")  // this package returns a function using which we can initiate a express application
const {connect} = require('./src/config/database');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}))
const User = require('./src/models/user')
const apiRouter = require("./src/routes");

const passport = require('passport')



const authRouter = require('./src/routes/authRoutes')

app.use('/', authRouter)
app.use('/api', passport.authenticate('jwt', {session: false}), apiRouter)

require('./src/uitl/auth')
app.use(function (err, req, res, next){
    res.status(err.status || 500);
    res.json({
        success: false,
        error: err
    })
})

app.listen(3000, async ()=>{
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