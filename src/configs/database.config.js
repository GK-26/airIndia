import { error } from "console"
import mongoose from "mongoose"

const  connect =  () =>{
    console.log(`mongodb connection requested`)
    return mongoose.connect('mongodb://localhost/airIndia')
}

export {connect}