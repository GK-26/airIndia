import passport from "passport";
import { Strategy as localStrategy} from "passport-local";
import User from "../models/user.model";


passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
async (email, password, done) =>{
    try {
        const user = await User.create({email, password});
        return done(null, user)
    } catch (error) {
        console.log(error)
        done(error)
    }
}
));

passport.user('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
async (email, password, done) =>{
    try {
      const user = await User.findOne({email})
      if(!user){
        return done(null, false, {message: "user not found"});
      }  
      const validate = await user.isValidPassword(password);
      if(!validate){
        return done(null, false, {message: "wrong password"})
      }
      return done(null, user, {message: "logged in Successfully"});
    } catch (error) {
        console.log(error);
        return done(error)
    }
}
))