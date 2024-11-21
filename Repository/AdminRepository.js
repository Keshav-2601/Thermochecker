import React from "react";
import { getdb } from "../config/mongodb.js";
import { ObjectId } from "mongodb";
export default class AdminRepository {
    static async collectdata_in_db(body) {
        try {
            const db = getdb();
            const collection = db.collection("Patients_Table");
            const result = await collection.insertOne(body);
            return result.acknowledged;//this will return true if succesfullful otherwise false.
        } catch (error) {
            console.log("some error occured data can not be created");
        }
    }
    static async updatedata(body) {
        try {
            const db=getdb();
            const collection = db.collection("Patients_Table");
            const filter = { _id: new ObjectId(body.ID) }; 


            const update = {
                $set: {
                    firstname: body.firstname,
                    age: body.age,
                    preferedHumidity: body.preferedHumidity,
                    preferedTemperature: body.preferedTemperature,
                },
            };


            const result = await collection.updateOne(filter, update);
            if (result.matchedCount > 0 && result.modifiedCount > 0) {
                return { success: true, message: "Document updated successfully." };
            } else if (result.matchedCount > 0) {
                return { success: false, message: "No changes were made to the document." };
            } else {
                return { success: false, message: "Document not found." };
            }

        } catch (error) {
            console.error("Error while updating the document:", error);
            throw new Error("Unable to update the document.");
        }
    }
    static async Deletedata(id){
        try {
            const db=getdb();
            const collection=db.collection("Patients_Table");
            const filterdata= {_id:new ObjectId(id)};
            const deletedata=await collection.deleteOne(filterdata);
            if (result.deletedCount > 0) {
                return "Successfully Deleted";
            } else {
                return "No matching document found to delete";
            }
        } catch (error) {
            console.log("Data not getting passed some error coems ",error);
        }
    }
}