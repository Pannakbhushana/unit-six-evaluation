const {Router}=require("express");
const AuthModel = require("../models/auth.model");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const authRoute=Router();

authRoute.post("/register", async(req,res)=>{
    const {name,email,gender,password}=req.body
   
   try {
    bcrypt.hash(password, 3, async(err, hash)=> {
        if(err){
            res.status(400).send({"msg":err.message});
        }
            const user=new AuthModel({name,email,gender,password:hash});
            await user.save();
            res.status(200).send({"msg":"user SignUp successfully"});
    });
   } catch (error) {
    res.status(400).send({"msg":error.message});
   }
})


authRoute.post("/login", async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await AuthModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                if(result){
                    res.status(200).send({"msg":"Login Successful","token":jwt.sign({"name":user._id},"bruce")});
                }
                else{
                    res.status(400).send({"msg":"Wronge credentials"});
                }
            });
        }
        else{
            res.status(400).send({"msg":"user not found ! SignUp first"});
        }
        
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})


module.exports=authRoute;