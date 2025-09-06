import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express"
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse"
import prisma from "../config/postgres";
import jwt from "jsonwebtoken";
import uploadImageOnCloudinary from '../utils/uploadOnCloudinary';
import { IUser } from '../interfaces/user.interface';

const options: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "strict" | "lax" | "none";
    maxAge: number;
} = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
};


export class UserController {

    static async signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                throw new ApiError(400, "All Fields are Required");
            }

            if (password.length < 6) {
                throw new ApiError(400, "Password must be atleast 6 characters.");
            }

            if (!email.includes("@gmail.com")) {
                throw new ApiError(400, "Email must be contain @gmail.com ");
            }

            const userExists = await prisma.user.findFirst({
                where: {
                    email
                }
            })

            if (userExists) {
                throw new ApiError(409, "User already exists");
            }

            const avatarLocalPath = req.file?.path;
            let avatar;
            if (avatarLocalPath) {
                avatar = await uploadImageOnCloudinary(avatarLocalPath);
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const user: IUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    avatar: avatar?.url,
                    password: hashPassword
                }
            })


            return res
                .status(201)
                .json(
                    new ApiResponse(201, user, "user signUp successfully")
                )
        } catch (error: any) {
            console.log(error);
            next(error);
        }
    }

    static async signIn(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new ApiError(400, "All Fields are Required");
            }

            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!user) {
                throw new ApiError(404, "User not found")
            }

            const isPasswordCorrect = await bcrypt.compare(password, user?.password)


            if (!isPasswordCorrect) {
                throw new ApiError(401, "email or password is invalid")
            }

            const token = jwt.sign(
                { id: user?.id },
                process.env.JWT_SECRET_KEY! as string,
                { expiresIn: "7d" }
            );


            return res
                .status(201)
                .cookie("token", token, options)
                .json(
                    new ApiResponse(201, {user,token}, "user signIn successfully")
                )
        } catch (error: any) {
            console.log(error);
            next(error);
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            return res
                .status(200)
                .clearCookie("token", options)
                .json(
                    new ApiResponse(200, {}, "user logout successfully")
                )
        } catch (error: any) {
            console.log(error);
            next(error);
        }


    }

    static async getCurrentUser(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const user: IUser | null = await prisma.user.findUnique({
                where: {
                    id: req.user?.id
                }
            })

            return res
                .status(200)
                .json(
                    new ApiResponse(200, user, "user profile fetch successfully")
                )
        } catch (error: any) {
            console.log(error);
            next(error);
        }


    }
}