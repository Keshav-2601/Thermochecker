import React from "react";
import AdminRepository from "../Repository/AdminRepository.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AdminController{
    async adddata(req,res){
        console.log("firstname is: ",req.body.firstname);
        try {
            const body={
                firstname:req.body.firstname,
                age:req.body.age,
                temperature:req.body.temperature,
                humidity:req.body.humidity,
                priority:req.body.priority,
                preferedHumidity:req.body.preferedHumidity,
                preferedTemperature:req.body.preferedTemperature,
                mintemp:req.body.mintemp,
                maxtemp:req.body.maxtemp
            }
            const result= await AdminRepository.collectdata_in_db(body)
            if(result){
                return res.status(200).send("User added succesfully");
            }
            return res.status(400).send("Database can not be created");
        } catch (error) {
            console.log("No data found",error);
            return res.status(404).send("data not recieved");
        }
    }
    async login(req, res) {
        try {
            if (req.body.email === process.env.ADMIN_EMAIL) {
                const isPasswordValid = await bcrypt.compare(req.body.password, process.env.ADMIN_PASSWORD);
    
                if (isPasswordValid) {
                    const jwtadmintoken = jwt.sign({ email: process.env.ADMIN_EMAIL,role:"Admin" }, process.env.JWT_KEY, { expiresIn: '7d' });
                    return res.status(200).json({ message: "Admin login successful", token: jwtadmintoken });
                } else {
                    return res.status(403).json({ message: "Incorrect password" });
                }
            } else {
                return res.status(403).json({ message: "Admin email not recognized" });
            }
        } catch (error) {
            console.log("Check the request:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async update(req,res){
        try {
            const body={
                ID:req.body._id,
                firstname:req.body.firstname,
                age:req.body.age,
                preferedHumidity:req.body.preferedHumidity,
                preferedTemperature:req.body.preferedTemperature,
            }
            const result=await AdminRepository.updatedata(body);
            if(result){
                return res.status(200).send("Succefully Updated !!");
            }
            else{
                return res.status(400).send("Not succefullly updated");
            }
        } catch (error) {
            console.log("Error ,request can't be reached ",error);
        }
    }
    async delete(req,res){
        try {
            const Id=req.body.Id;
            const Result=await AdminRepository.Deletedata(Id);
            if(Result){
                return res.status(200).send(Result);
            }
            else{
                return res.status(200).send("Unsuccessfull in deleting item");
            }
        } catch (error) {
            console.log("Check ur request some error occur",error);
        }
    }
}