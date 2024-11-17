import express from 'express';
import { getdb } from '../config/mongodb.js';
export default class HomePageRepository{
    static async  getdata(){
        try {
            const db=getdb();
            const collection=db.collection('Patients_Table');
            const Data=await collection.find({}).toArray();
            return Data;
        } catch (error) {
            console.log("Not able to get the data from db",error);
        }
    }
}