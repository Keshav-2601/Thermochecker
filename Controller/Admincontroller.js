import React from "react";
import AdminRepository from "../Repository/AdminRepository";
export default class AdminController{
    async adddata(req,res){
        try {
            const body={
                firstname:req.body.name,
                age:req.body.age,
                email:req.body.email,
                temperature:req.body.temperature
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