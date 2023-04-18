const express = require('express')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express();

router.post('/signup',
passport.authenticate('signup', {session: false}),
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
                passport.authenticate(
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
                )(req, res, next)
            })


module.exports = router
