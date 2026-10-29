import {Router}from "express"
import { UserRouter } from "./userRoute.js";

export const router=Router();
router.use("/user",UserRouter);
