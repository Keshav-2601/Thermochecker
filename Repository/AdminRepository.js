import React from "react";
import { getdb } from "../config/mongodb";

export default class AdminRepository{
    static async collectdata_in_db(body){
        try {
            const db=getdb();
            const collection=db.collection("Patients_Table");
            const result=await collection.insertOne(body);
            return result.acknowledged;//this will return true if succesfullful otherwise false.
        } catch (error) {
            console.log("some error occured data can not be created");
        }
    }
}