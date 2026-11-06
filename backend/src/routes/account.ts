import { Router } from "express";
import { usermiddleware } from "../middleware/usermiddleware.js";
import { accountModal } from "../models/accounts.js";
import * as z from 'zod'
import { UserModel } from "../models/user.js";

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
    const {to,amount}=transreq.data
    const recevier=await UserModel.findOne({username:to});
    if(!recevier){
        res.status(400).json({
            "message":"invaild recevier "
        })
        return;
    }
    const recevieraccounts=await accountModal.findOne({User_id:recevier?._id});
    if (recevieraccounts?.balance == null) {
        res.status(404).json({
            "message": "receiver account not found"
        });
        return;
    }
    const senderaccounts=await accountModal.findOne({User_id:req.headers.userId})
    if (senderaccounts?.balance == null) {
        res.status(404).json({
            "message": "receiver account not found"
        });
        return;
    }
    const senderAmount=await accountModal.findOneAndUpdate({User_id:req.headers.userId},{...senderaccounts,balance:senderaccounts.balance-amount,})    
    const receiverAmount=await accountModal.findOneAndUpdate({User_id:recevier._id},{...recevieraccounts,balance:recevieraccounts.balance+amount,})
    res.status(200).json({
        "message":"transcation successfully",
        "updateAmount":receiverAmount,
    })
}
catch(e){

}
})

