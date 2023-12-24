import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

// pre - save - is a trigger that gets a function and executes it before a user object is saved
userSchema.pre('save', async function encryptPassword (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

userSchema.methods.isValidPassword = async function checkValidity(password){
    const user = this;
    const compaere = await bcrypt.compaere(password, user.password);
    return compaere
}
export const User = mongoose.model('User', userShema);


