const express = require('express');
const routes = express.Router();

const taskModel = require('../models/todo');

const authMiddleware = require('../middleware.js/authmiddleware');

routes.get('/getuserTasks',authMiddleware, async(req,res)=>{
    const userid = req.headers.tokenData.userid || req.body.userid;
    req.body.userId = userid;

    try {

        const result = await taskModel.find({
            userId:userid,
        })
        res.status(200).send({
            data: result
        })
    } catch (error) {
        console.log(`error ${error}`)
        res.status(400).send({
            message: error
        })
    }
})

routes.get('/getTaskById/:id',authMiddleware, async(req,res)=>{
    try {
        const id = req.params.id;
        if(!id){
            throw ('id is required')
        }
        const result = await taskModel.findOne({ _id:id});
        // console.log("result",result)
        if(result){
            res.status(200).send({
                data: result
            })
        }else{
            res.status(400).send({
                data: "no Data found"
            })
        }
       
    } catch (error) {
        console.log(`error ${error}`)
        res.status(400).send({
            message: "some error occur"
        })
    }
})

routes.delete('/deleteById/:id',authMiddleware, async(req,res)=>{
    try {
        const id = req.params.id;
        if(!id){
            throw ('id is required')
        }
        const result = await taskModel.deleteOne({ _id:id});
        if(result.acknowledged){
            res.status(200).send({
                data: 'successfully Deleted'
            })
        }else{
            res.status(400).send({
                data: "Some error ocurr"
            })
        }
       
    } catch (error) {
        console.log(`error ${error}`)
        res.status(400).send({
            message: "some error occur"
        })
    }
})

routes.delete('/deleteAllUserTask',authMiddleware, async(req,res)=>{
    try {
        const userid = req.headers.tokenData.userid || req.body.userid;
        const result = await taskModel.deleteOne({ userId: userid});
        if(result.acknowledged){
            res.status(200).send({
                data: 'successfully Deleted'
            })
        }else{
            res.status(400).send({
                data: "Some error ocurr"
            })
        }
       
    } catch (error) {
        console.log(`error ${error}`)
        res.status(400).send({
            message: "some error occur"
        })
    }
})

routes.put('/updateTask',authMiddleware, async(req,res)=>{
    try {
        const result = await taskModel.updateOne(req.body);
        if(result.acknowledged){
            res.status(200).send({
                data: 'successfully updated'
            })
        }else{
            res.status(400).send({
                data: "Some error ocurr"
            })
        }
       
    } catch (error) {
        console.log(`error ${error}`)
        res.status(400).send({
            message: "some error occur"
        })
    }
})


routes.post('/create', authMiddleware, async(req,res)=>{
    const userid = req.headers.tokenData.userid || req.body.userid;
    req.body.userId = userid;
    try {
        const result = await taskModel.create(req.body)
        res.status(200).send({result})
    } catch (error) {
        console.log(`error ${error}`)
        res.status(400).send({
            message: error
        })
    }
    
});

module.exports = routes;