import {Schema,model} from "mongoose";
import { required } from "zod/v4-mini";

const accountSchema=new Schema({
    User_id:{
       type: Schema.Types.ObjectId,
       ref:'users',
       required:true,
    },
    balance:Number
})
export const accountModal= model("account",accountSchema)