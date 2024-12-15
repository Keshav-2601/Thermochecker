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
server.use(cors({
    origin: 'https://thermochecker-frontend.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],           
    allowedHeaders: ['Content-Type', 'Authorization'],    
    credentials: true                                      
}));
server.use(express.json());  
server.use('/user',UserRouter);
server.use('/admin',Adminrouter);
server.use('/Homepage',Homepagerouter);
server.get('/', (req, res) => {
    res.send('Backend is working!');
});
server.listen(3200,()=>{
    console.log("server is running at 3200");
    mongodbconnection();
});