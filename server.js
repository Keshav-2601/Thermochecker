import express from 'express';
import UserRouter from './Router/userrouter.js';
import mongodbconnection from './config/mongodb.js';
import dotenv from 'dotenv';
import { Adminrouter } from './Router/AdminRouter.js';
import { Homepagerouter } from './Router/HomepageRouter.js';
import cors from 'cors';
dotenv.config();
const server=express();
server.use(cors());
// server.use(cors({
//     origin: '*', 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true, 
// }));
server.use(express.json());  
server.use('/user',UserRouter);
server.use('/admin',Adminrouter);
server.use('/Homepage',Homepagerouter);
server.listen(3000,()=>{
    console.log("server is running at 3000");
    mongodbconnection();
});