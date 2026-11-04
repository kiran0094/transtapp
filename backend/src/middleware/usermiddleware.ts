import jwt from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express";


export const usermiddleware=(req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || authHeader.startsWith("Bearer")){
        res.status(401).json({
            "message":"token is missing accesss"
        })
    }
    const token=authHeader?.split(" ")[1];
    
    const isVaild=jwt.verify(token as string,process.env.JWT_SCRET!)
    if(!isVaild){
        res.status(401).json({
            "message":"invaild token",
        })
        
    }
    const userId = (isVaild as jwt.JwtPayload).userId;
    req.headers.userid=userId;
    next();    
}