import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { JWT_SECRET } from "./config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    console.log(header);
    
    // console.log(header);
    const array = header?.split(" ")

    // if(array && array[0] !== "Bearer"){
    //     res.status(403).json({
    //         message: "You are not logged in"            
    //     })
    //     return;
    // }
    
    
    const decoded = jwt.verify(header?.split(" ")[1] as string,process.env.JWT_SECRET!)
    // console.log("eereferfe343434343434");
    
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;    
        }
        // @ts-ignore
        req.userId = (decoded as JwtPayload).id;
        next()
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}