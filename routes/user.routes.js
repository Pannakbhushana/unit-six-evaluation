const {Router}=require("express");
const UserModel=require("../models/users.model");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const userRoute=Router();


userRoute.post("/add", async(req,res)=>{

    if(req.headers.authorization===undefined){
        res.status(400).send({"msg":"Invalid token"});
    }
    const token=req.headers.authorization;
   try {
    
    const decoded=jwt.verify(token,"bruce");
    if(decoded){
        const post= new UserModel(req.body);
        await post.save();
        res.status(200).send({"msg":"New post has been added"});
    }
    else{
        res.status(400).send({"msg":"wronge token"});
    }
   } catch (error) {
    res.status(400).send({"msg":error.message});
   }
})


userRoute.get("/", async(req,res)=>{
    if(req.headers.authorization===undefined){
        res.status(400).send({"msg":"Invalid token"});
    }
    const token=req.headers.authorization;
   try {
    
    const decoded=jwt.verify(token,"bruce");
    if(decoded){
        const posts= await UserModel.find({userID:decoded.name});
        res.status(200).send(posts);
    }
    else{
        res.status(400).send({"msg":"wronge token"});
    }
   } catch (error) {
    res.status(400).send({"msg":error.message});
   }
})


userRoute.patch("/update/:postID", async(req,res)=>{

    if(req.headers.authorization===undefined){
        res.status(400).send({"msg":"Invalid token"});
    }
    const {postID}=req.params;
    const {title,body,device}=req.body;
    const token=req.headers.authorization;
   try {
    
    const decoded=jwt.verify(token,"bruce");
    if(decoded){
        const posts= await UserModel.findByIdAndUpdate(postID,{title,body,device});
        res.status(200).send({"msg":"Post details updated successfully"});
    }
    else{
        res.status(400).send({"msg":"wronge token"});
    }
   } catch (error) {
    res.status(400).send({"msg":error.message});
   }
})


userRoute.delete("/delete/:postID", async(req,res)=>{

    if(req.headers.authorization===undefined){
        res.status(400).send({"msg":"Invalid token"});
    }
    const {postID}=req.params;
    
    const token=req.headers.authorization;
   try {
    
    const decoded=jwt.verify(token,"bruce");
    if(decoded){
        const posts= await UserModel.findByIdAndDelete(postID);
        res.status(200).send({"msg":"Post details deleted successfully"});
    }
    else{
        res.status(400).send({"msg":"wronge token"});
    }
   } catch (error) {
    res.status(400).send({"msg":error.message});
   }
})






module.exports=userRoute;