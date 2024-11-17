import express from 'express';
import HomePageRepository from '../Repository/HomepageRepository.js';
export default class HomepageController{
      async getdata(req,res) {
        try {
            const result=await HomePageRepository.getdata();
            if(result){
                return res.status(200).json({message:"Fetch data successfully",data:result});
            }
            return res.status(400).send("Can't fetch data successfully");
        } catch (error) {
            console.log("request has not reached to controller",error);
            return res.status(403).send(" Error!!!Bad Request");
        }
        
    }
}