import express from 'express';
import UserRouter from './Router/userrouter.js';
import mongodbconnection from './config/mongodb.js';
import dotenv from 'dotenv';
import { Adminrouter } from './Router/AdminRouter.js';
import { Homepagerouter } from './Router/HomepageRouter.js';
dotenv.config();
const server=express();
server.use(express.json());  
server.use('/user',UserRouter);
server.use('/patient',Adminrouter);
server.use('/Homepage',Homepagerouter);
server.listen(3000,()=>{
    console.log("server is running at 3000");
    mongodbconnection();
});