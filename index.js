import express  from "express";  // this package returns a function, using which we can initiate a new express application object

import {v1Routes as apiRouter} from "./routes/index.js";
const app = express(); // executing the function returned a new express application


app.use("/api", apiRouter);

app.get('/', (req, res)=>{
    res.status(200).send({
        success: true,
        message: `sucessfully hitting the API`
    });
});

app.listen(3000, ()=>{
    console.log(`server started successfully`)
})
