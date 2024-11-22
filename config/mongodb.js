import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
const url=process.env.MONGO_DB;

let client;
const mongodbconnection=async()=>{
    try{
        await MongoClient.connect(url).then((res)=>{
            client=res;//establish the connection 
            console.log("mongodb is connected")
        })
        
    }catch(err){
        console.log("error is ",err);
    }
   
}
const getdb=()=>{
    return client.db();//return the actaul db that is ecom i would be working on since default db taken from url.
}
export default mongodbconnection;

export {getdb};