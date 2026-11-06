import { Router } from "express";
import { usermiddleware } from "../middleware/usermiddleware.js";
import { accountModal } from "../models/accounts.js";
import * as z from 'zod'
import { UserModel } from "../models/user.js";
import mongoose from "mongoose";

export const AccoutRouter=Router();
const transferShema=z.object({
    'to':z.string().email(),
    'amount':z.number(),
})

AccoutRouter.get('/balance',usermiddleware,async(req,res)=>{
    try{
        const currentaccount = await accountModal.findOne({User_id:req.headers.userid});
        res.status(200).json({
            "balance":currentaccount?.balance
        })


    }
    catch(e){
        res.status(500).json({
            'message':"error fetching balance"
        })

    }
})
AccoutRouter.post('/transfer',usermiddleware,async(req,res)=>{
    try{

        const transreq=transferShema.safeParse(req.body);
        if(!transreq.success){
        res.status(400).json({
            "message":"invaild data formate"
        })
        return;
        }
    const session= await mongoose.startSession();
     session.startTransaction();
    const {to,amount}=transreq.data
    const senderacc=await accountModal.findOne({User_id:req.headers.userid}).session(session);
    if(!senderacc?.balance || senderacc?.balance<amount){
        await session.abortTransaction();
        res.status(422).json({
            "message":"inSuffect balance"
        })
        return;
    }
     const receiveracc=await accountModal.findOne({User_id:to}).session(session);
    if(!receiveracc){
        await session.abortTransaction();
        res.status(422).json({
            "message":"TO account does not exist"
        })
        return;
    }

    await accountModal.updateOne({User_id:req.headers.userid},{$inc:{balance:-amount}}).session(session);
    await accountModal.updateOne({User_id:to},{$inc:{balance:+amount}}).session(session);

    session.commitTransaction();

    res.status(200).json({
        "message":"transerfered succesfully",
    });   
}
catch(e){
    res.status(500).json({
        "message":"transfer error something went worng"
    })

}
})

