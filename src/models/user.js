const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userShcema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
},
{timestamps: true});

// pre --save-- is a trigger  that gets a function  and exectues before the object is saved

userShcema.pre('save', encryptPassword = async (next)=>{
    const user = this
    const hash = await bcrypt.hash(this.password, 10 );
    this.password = hash;
    next();
})

userShcema.methods.isValidPassword = async function checkValidity(password){
    const user = this
    const compare = await bcrypt.compare(password, user.password);
    return compare
}

const User = mongoose.model('User', userShcema);


module.exports = User;