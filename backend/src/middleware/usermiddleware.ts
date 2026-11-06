import jwt from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express";


export const usermiddleware=async(req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            "message":"token is missing accesss",
            "authHeader":authHeader
        })
    }
    const token=authHeader.split(" ")[1];
    console.log(token);
    
    const isVaild= await jwt.verify(token as string,process.env.JWT_SCRET!)
    if(!isVaild){
        res.status(401).json({
            "message":"invaild token",
        })
        
    }
    console.log(isVaild)
    const userId = (isVaild as jwt.JwtPayload).userId;

    req.headers.userid=userId;
    next();    
}