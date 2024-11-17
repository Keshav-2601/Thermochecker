import React from "react";
import AdminRepository from "../Repository/AdminRepository.js";
export default class AdminController{
    async adddata(req,res){
        console.log("firstname is: ",req.body.firstname);
        try {
            const body={
                firstname:req.body.firstname,
                age:req.body.age,
                temperature:req.body.temperature,
                priority:req.body.priority
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
}