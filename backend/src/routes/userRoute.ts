import {Router}from "express"
import {z} from "zod"
import { UserModel } from "../models/user.js"
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import { MongoServerError } from 'mongodb';
import { usermiddleware } from "../middleware/usermiddleware.js";
import { accountModal } from "../models/accounts.js";


export const UserRouter=Router()

const signupschema=z.object({
    username :z.string().email(),
    password:z.string().min(8),
    firstName:z.string().max(10),
    lastName:z.string().max(10)

})
const signinschema = signupschema.omit({
  firstName: true,
  lastName: true,
});
const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})


UserRouter.post('/signup',async(req,res)=>{
    try{        
        const parseduser= signupschema.safeParse(req.body)
        if(!parseduser.success){
            return res.status(400).json({
                "message":"missing user feilds",
                "data":parseduser
            })
        }
        const {username,password,firstName,lastName}=parseduser.data;
        const hashedPassword= await argon2.hash(password)
        console.log(hashedPassword);
        const newuser=await UserModel.create({username,password:hashedPassword,firstName,lastName})
        const newaccount=await accountModal.create({User_id:newuser._id,balance:1+Math.random()*10000})
        res.status(201).json({
            "message":"user successfully added",
            "user":newuser,
            "account":newaccount,
        })
    }
    catch(e){
        if (e instanceof MongoServerError && e.code === 11000) {

             const duplicateField =Object.keys(e.keyPattern || {})[0] || 'field';
                         
            return res.status(400).json({
                message: `The ${duplicateField} '${e.keyValue[duplicateField]}' is already taken. Please choose another one.`
            });
        }
        res.status(500).json({
            "message":"Unable to create the user",
            "error":e
        })

    }

})

UserRouter.post('/signin',async(req,res)=>{
     try{        
        const parseduser= signinschema.safeParse(req.body)
        if(!parseduser.success){
            return res.status(400).json({
                "message":"missing user feilds"
            })
        }
        const {username,password}=parseduser.data;
        const exsingUser=await UserModel.findOne({username})
        if(!exsingUser){
            return res.status(301).json({
                "message":"User is not found",
            })
        }

        const storedPassword = exsingUser.password as string;
        const isPasswordValid = await argon2.verify(storedPassword,password);
        if(!isPasswordValid){
            return res.status(401).json({
                "message":"Invalid credentials"
            })
        }

        const jwtSecret = process.env.JWT_SECRET ?? process.env.JWT_SCRET;
        if(!jwtSecret){
            return res.status(500).json({
                "message":"JWT secret is not configured"
            })
        }

        const token=jwt.sign({ userId: exsingUser._id.toString() }, jwtSecret, { expiresIn: "7d" });

        return res.status(200).json({
            "message":"User signed in successfully",
            "token" :token
        })
    }
    catch(e){       

        res.status(500).json({
            "message":"Unable to authirization"
        })

    }


})

UserRouter.patch('/',usermiddleware,async(req,res)=>{
    const id =req.headers.userid;
    const data=updateBody.safeParse(req.body);
    if(!data.success){
        return res.status(400).json({
            message:"Invalid update fields",
            errors:data.error
        });
    }
    const existingUser=await UserModel.findOneAndUpdate({_id:id},data.data,{new:true});
    return res.status(200).json({
        message:"User updated successfully",
        data:existingUser
    });


})
UserRouter.get('/bulk',async(req,res)=>{
    const search=req.body.search;
    const data=await UserModel.find(
        {
            $or:[{
                firstName:{
                    "$regex":search,
                }
            },{
                lastName:{
                    "$regex":search,
                }
            }]
        }
    )
    res.send(200).json({
        "message":"the data matched data",
        user: data.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id}))
    })

})