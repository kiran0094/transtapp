import {Router}from "express"
import { UserRouter } from "./userRoute.js";
import { AccoutRouter } from "./account.js";

export const router=Router();
router.use("/user",UserRouter);
router.use("/account",AccoutRouter);

