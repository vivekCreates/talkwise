import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/postgres';
import { ApiError } from '../utils/apiError';

interface JwtPayload {
    id:string;
}

const verifyJWT = async(req:Request, res:Response, next:NextFunction) => {
  
    try {
        const token  = req?.cookies?.token || req?.headers["authorization"]?.split(" ")[1];

        if(!token){
            throw new ApiError(400,"Invalid user");
        }
        console.log("token",token)

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
        
        if(!decoded){
            throw new ApiError(401,"Invalid Token");
        }
        const user = await prisma.user.findFirst({
            where:{
                id:decoded.id
            }
        })
        req.user = user;
        next();
    } catch (error:any) {
        console.log(error);
        next(error);

    }
};
              
export default verifyJWT