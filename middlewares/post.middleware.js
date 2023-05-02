const jwt=require("jsonwebtoken");

const postMiddleware=(req,res,next)=>{
    if(req.headers.authorization===undefined){
        return res.status(400).send({"msg":"invalid token"})
    }
    const token=req.headers.authorization;
    const decoded=jwt.verify(token,"bruce");
  
    if(decoded){
        req.body.userID=decoded.name;
        next();
    }
    else{
        return res.status(400).send({"msg":"wrong token"})
    }
}

module.exports=postMiddleware;