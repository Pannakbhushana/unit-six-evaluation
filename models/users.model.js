const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userID:String
})

const UserModel=mongoose.model("post",userSchema);

module.exports=UserModel;