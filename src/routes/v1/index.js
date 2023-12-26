import express from "express";
import passport  from "passport";
import {jsonwebtoken as jwt} from "jsonwebtoken"
import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
const router = express.Router();
import { helpDetails } from "../../controllers/help.controller.js";

router.get("/help", helpDetails);

router.post('/signup', passport.authenticate('signup', {sessioin: false},
 async (req, res)=>{
    res.status(200).send({
        success: true,
        message: 'Signup successfull',
        data: {
            user: req.user
        }
    })
}))

router.post('/login', 
    async (req, res)=>{
    passport.authenticate('login', 
        async (err, user, info) =>{
            try {
                if(err || !user){
                    const error = new Error('something went wrong');
                    return next(error);
                }
                req.login(
                    user,
                    {session: false},
                    async (err)=>{
                        if(err) return next(err);
                        const body = {_id: user._id, email, user.email};
                        const token = jwt.sign({user:body}, 'TOP_SECRET')
                        res.status(200).json({token, success: true, message: "successfully signed in"})
                    }
                )
            } catch (error) {
                console.log(error);
                return next(error)
            }
        })
})

export {router};

