const express=require("express");
const connection=require("./db");
const authRoute=require("./routes/auth.routes");
const userRoute=require("./routes/user.routes");
const postMiddleware=require("./middlewares/post.middleware");
const cors=require("cors");
require("dotenv").config();

const app=express();
app.use(express.json());
app.use(cors());
app.use("/users",authRoute);
app.use(postMiddleware);
app.use("/posts", userRoute);



app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("connected to db");
    } catch (error) {
        console.log("not able to connect to db");
        console.log(error.message);
    }
    console.log(`server is running at port ${process.env.port}`);
})

