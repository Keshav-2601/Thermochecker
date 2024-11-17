import express from 'express';
import { Router } from 'express';
import HomepageController from '../Controller/HomepageContoller.js';
const Homepagerouter=express.Router();
const Homecontrol=new HomepageController();
Homepagerouter.get('/',(req,res)=>{
    Homecontrol.getdata(req,res);
})

export {Homepagerouter}