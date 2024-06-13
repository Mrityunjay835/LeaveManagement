import express from "express"
import employeeRouter from './routers/EmployeeRouter.js';
import adminRouter from './routers/AdminRouter.js';
import cookieParser from "cookie-parser";

import { config } from "dotenv";


config({
    path:"./data/config.env"
})


export const app = express()
//use of middleware
app.use(express.json())
app.use(cookieParser())
app.use("/employees",employeeRouter)
app.use("/admin",adminRouter)

//code for the home url
app.get("/", (req,res)=>{
    res.send("Nice Working")
});


