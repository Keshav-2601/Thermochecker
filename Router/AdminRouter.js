import express from 'express';
import { Router } from "express";
import AdminController from "../Controller/Admincontroller.js";
import { jsonAuthentication_Authorization } from '../middlewares/JwtAuthentication_Authorization.js';
const  Adminrouter=express.Router();
const AdminContorl=new AdminController();
Adminrouter.post('/patient',(req,res)=>{
    AdminContorl.adddata(req,res);
})
export{Adminrouter}

Adminrouter.post('/adminlogin',(req,res)=>{
    AdminContorl.login(req,res);
});
Adminrouter.get('/pubnub',(req,res)=>{
    AdminContorl.grandtoken(req,res);
})
Adminrouter.put('/update',(req,res)=>{
    AdminContorl.update(req,res);
})
Adminrouter.delete('/delete',(req,res)=>{
    AdminContorl.delete(req,res);
})