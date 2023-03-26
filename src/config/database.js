const mongoose = require('mongoose');

const  connect = ()=>{
    console.log('mongo connection requested');
    return mongoose.connect('mongodb://172.17.0.2/airIndia')
}


module.exports = {
    connect
}