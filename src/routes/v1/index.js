const express = require('express');
const { Passport } = require('passport/lib');
const router = express.Router();
const helpController = require("../../controllers/help.controller")
const jwt = require('jsonwebtoken');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

router.get("/help", helpController.helpDetails);

router.post('/signup', 
            Passport.authenticate('signup', {session: false}),
            async (req, res) =>{
                res.status(200).send({
                    sucess: true,
                    message: "Signup sucessful",
                    data: {
                        user: req.user
                    }
                })
            })


router.post('/signin', 
            async (req, res)=>{
                Passport.authenticate(
                    'login',
                    async(err, user, info)=>{
                        try {
                            if(err || !user){
                                const error = new Error('something went wrong')
                                return next(error)
                            }
                            req.login(
                                user,
                                {session: false},
                                async (err)=>{
                                    if(err) return next(err);
                                    const body = {_id: user._id, email: user.email};
                                    const token = jwt.sign({user: body}, 'SECRET');
                                    return res.status(200).json({
                                        success: true,
                                        message: 'sucessfully signed in',
                                        token})
                                }
                            )

                        } catch (error) {
                            console.log(error);
                            return next (error);
                        }
                    }
                )
            })


module.exports = router