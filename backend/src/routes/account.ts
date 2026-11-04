import { Router } from "express";
import { usermiddleware } from "../middleware/usermiddleware.js";
import { accountModal } from "../models/accounts.js";

export const AccoutRouter=Router();

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

