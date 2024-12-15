import expres from 'express';
import UserRepository from '../Repository/UserRepository.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import PubNub from 'pubnub';
dotenv.config();
 export default  class Usercontroller{
    async getdata(req,res){
        console.log("Reached to controller get function")
        console.log("Request body in getdata:", req.body);  
        try {
            var data={
                firstname:req.body.firstname,
                password:req.body.password,
                email:req.body.email,
                address:req.body.address
            }
            const sendata=await UserRepository.storedata(data);
            if(sendata){
                return res.status(200).send("Login is created succesfully");
            }
            else{
                return res.status(404).send("Unsuccessful in creating the Login");
            }
        } catch (error) {
            console.log('Problem in creating Login',error);
        }
    }
    async login(req,res){
        try {
            const data={
                email:req.body.email,
                password:req.body.password
            }
            const Logininfo=await UserRepository.logindata(data)
            if(Logininfo){
                const jwtkey=process.env.JWT_KEY;
                const token=jwt.sign(
                    {
                        userID: Logininfo._id,
                        email: data.email,
                        role:"User",
                        password: data.password,
                    },
                    jwtkey,
                    { expiresIn: '7d' }
                );
                return res.status(200).json({ message: 'Login successful', token });
            }
            else{
                return res.status(404).send('not an authentic user');
            }
        } catch (error) {
            console.error("Error in login:", error);
            return res.status(500).send('Internal server error');
        }
    }

    async grandusertoken(){
        try {
            const pubnub = new PubNub({
                            subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
                            publishKey: process.env.PUBNUB_PUBLISH_KEY,
                            secretKey:process.env.PUBNUB_SECRET_KEY,
                            userId: process.env.PUBNUB_USER_ID,
                            ssl: process.env.PUBNUB_SSL === 'true',
                            cryptoModule: PubNub.CryptoModule.aesCbcCryptoModule({ cipherKey: 'pubnubenigma' })
                        })
                        const token = await pubnub.grantToken({
                            ttl: 60,
                            authorized_uuid: process.env.PUBNUB_USER_ID,
                            resources: {
                                channels: {
                                    "pi_channel": {
                                        read: true,
                                        write: false,
                                        manage: false
                                    }
                                }
                            }
                        })
                        console.log('Generated Token:', token);
                        if (token) {
                            return res.status(200).json({ "Pubnub_user_token": token });
                        }
            
                        return res.status(403).send("No token created some error occured");
            
        } catch (error) {
            console.log("some error occured can not make user pubnub token ",error);
            res.status(500).send("Internl server error");
        }
    }
   
}
