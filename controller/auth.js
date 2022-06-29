const express = require('express');
const routes = express.Router();

const {checkEmpty, regexForEmail} = require('../utils/helper');
const {genSalt,hash,compare} = require('bcryptjs');
const {sign} = require('jsonwebtoken');
const userModel = require('../models/user');

const userJwtSecret = process.env.JWTSECRET || "abc@123"
const authMiddleware = require('../middleware.js/authmiddleware');

routes.post('/signup',async(req,res)=>{
    const body = req.body;
    const {isValid,error} = checkEmpty(body);
    try{
        if(isValid){
            if(regexForEmail.test(body.email)){
                const isUserExist = await userModel.findOne({
                    $or:[
                        {
                            email: {
                                $regex:`^${body.email}$`,
                                $options:"i"
                            },
                        },
                        {   userName : {
                                $regex:`^${body.email}$`,
                                $options:"i"
                             },
                        },
                    ]
                    // email:body.email
                   
                }) 
               if(!isUserExist){
                    
                    const salt = await genSalt(10);
                    const hashedPassword = await hash(body.password,salt);
                    if(hashedPassword){
                        req.body.password = hashedPassword;
                        const userData = new userModel(req.body);
                        const saveData = await userData.save();
                        if(saveData){
                            res.status(200).send({
                                msg:"user successfully registered"
                            })
                        }
                    }


                }else{
                    res.status(400).send({
                        msg:"User is already Exist"
                    })
                }
            }else{
                res.status(400).send({
                    msg:"Email is not valid"
                })
            }  
        }
        else{
            res.status(400).send({
                msg:"some field are empty",
                error:error
            })
        }
    }catch(err){
        console.log(`sign in userRoutes found error ${err}`);
        res.status(400).send({
            msg:"some error occured"
        })
    }
    
});
routes.post('/login',async(req,res)=>{
    const body = req.body;
    const {isValid,error} = checkEmpty(body);
    try{
        if(isValid){
            const isUserExist = await userModel.findOne({
                $or:[
                    {
                        email: {
                            $regex:`^${body.userName}$`,
                            $options:"i"
                        },
                    },
                    {   userName : {
                            $regex:`^${body.userName}$`,
                            $options:"i"
                         },
                    },
                ]
            })
            if(isUserExist){
                const isMatch = await compare(body.password,isUserExist.password);
                if(isMatch){
                    const payload = {
                        userid:isUserExist.id
                    }
                    const token = await sign(payload,userJwtSecret,{
                        expiresIn:'200h'
                    });
                    res.status(200).send({
                        msg:"successfully login",
                        token:token,
                        userid:isUserExist.id
                    })
                }else{
                    res.status(400).send({
                        msg:"Please enter correct Password"
                    })
                }
            }else{
                res.status(400).send({
                    msg:"User not found"
                })
            }
        }
        else{
            res.status(400).send({
                msg:"some fields are empty",
                error:error
            })
        }
    }catch(err){
        console.log(`login in userroute get err${err}`);
        res.status(400).send({
            msg:"some error is occured"
        })
    }
    
})

routes.get('/getprofile', authMiddleware,async(req,res)=>{
    const id = req.headers.tokenData.userid || req.body.userid;
    try{
        const profile_data = await userModel.findById({
            _id:id
        }).select('-password');
        if(profile_data){
            res.status(200).send({
                profile_data:profile_data
            })
        }
    }catch(err){
        console.log(`get profile found error in userroutes ${err}`);
        res.status(400).send({
            msg:"Some error found in updation"
        })
    }
   
});


routes.post('/updateProfile',authMiddleware,async(req,res)=>{
    const id = req.headers.tokenData.userid || req.body.userid;
    try{
        const body = req.body;
        delete body.password;
        const updateData = await userModel.updateOne({
            _id:id
        },body);
        // console.log(updateData,body)
        if(updateData.acknowledged=1){
            res.status(200).send({
                code:200,
                msg:"Profile is updated"
            })
        }else{
            res.status(400).send({
                msg:"Some error found in updation"
            })
        }
    }catch(err){
        console.log(`update profile got and error ${err}`)
        res.status(400).send({
            msg:"Some error found in updation"
        })
    }
})


module.exports = routes;
