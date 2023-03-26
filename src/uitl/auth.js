const passport = require('passport');
const JwtStrategy = require('passport-jwt/lib/strategy');
const JWTStrategy = require('passport-jwt').Strategy;
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');


passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, done)=>{
        try{
            const user = await User.create({email, password});
            return done(null, user);
        }catch(err){
            console.log(err);
            done(err)
        }
    }
));

passport.use('signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
async (email, password, done)=>{
    try {
        const user = await User.findOne({email})
        if(!user){
            return done(null, false, {message: 'user not found'});
        }
        const validate = await User.isValidPassword(password);
        if(!validate){
            return done(null, false, {message: 'wrong password'})
        }
        return done(null, user, {message: 'logged in success'})
    } catch (error) {
        console.log(error);
        return done(error)
    }
}),
)

passport.use(new JWTStrategy(
    {
        secretOrKey: 'SECRET',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done)=>{
        try {
            return done(null, token.user);
        }catch(error){
            console.log(error);
            done(error)
        }
    }
))