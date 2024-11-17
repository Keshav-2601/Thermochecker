import express from 'express';
import { Router } from "express";
import AdminController from "../Controller/Admincontroller.js";
const  Adminrouter=express.Router();
const AdminContorl=new AdminController();
Adminrouter.post('/',(req,res)=>{
    AdminContorl.adddata(req,res);
})
export{Adminrouter}

