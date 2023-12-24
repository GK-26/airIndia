import express  from "express";  // this package returns a function, using which we can initiate a new express application object
import {User}  from "./src/models/user.model.js"
import {router as apiRouter} from "./src/routes/index.js";
import {connect as connectDb} from "./src/configs/database.config.js"
const app = express(); // executing the function returned a new express application


app.use("/api", apiRouter);

app.get('/', (req, res)=>{
    res.status(200).send({
        success: true,
        message: `sucessfully hitting the API`
    });
});

app.listen(3000, async ()=>{
    console.log(`server started successfully`)
    await connectDb();
    await User.deleteMany()
    console.log(`mongodb connected sucessfully`)
    let user = await User.create({
        email: "gajelli.kiransai@gmail.com",
        userName: "GK",
        password: 12345
    })

    console.log("user Created:  ", user)
})
