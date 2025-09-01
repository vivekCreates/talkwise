import { NextFunction, Request, Response } from "express"
import { ApiError } from "../utils/apiError";
import prisma from "../config/postgres";
import { ApiResponse } from "../utils/apiResponse";
import { IConversation } from "../interfaces/conversation.interface";


export class ConversationController {

    static async createConversation(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const { title }: { title: string } = req.body;

            const newConversation: IConversation = await prisma.conversation.create({
                data: {
                    userId: req.user?.id!,
                    title,
                },
            });
            return res.status(201).json(
                new ApiResponse(201, newConversation, 'Conversation created successfully')
            );
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async deleteConversation(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const { id } = req.params;

            const conversation: IConversation | null = await prisma.conversation.findUnique({
                where: { id },
            });

            if (!conversation) {
                throw new ApiError(404, 'Conversation not found');
            }

            if (conversation.userId !== req.user?.id) {
                throw new ApiError(403, 'Forbidden');
            }

            await prisma.conversation.delete({
                where: { id },
            });

            return res.status(200).json(
                new ApiResponse(200, null, 'Conversation deleted successfully')
            );
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async getConversation(req: Request, res: Response, next: NextFunction)
    :Promise<any> {
        try {
            const { id } = req.params;

            const conversation: IConversation | null = await prisma.conversation.findUnique({
                where: {
                    id
                }
            })

            if (!conversation) {
                throw new ApiError(404, "conversation not found")
            }

            return res.status(200).json(
                new ApiResponse(200, conversation, "conversation fetch successfully")
            )
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async getAllConversations(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const converstions: IConversation[] = await prisma.conversation.findMany({
                where: {
                    userId: req.user?.id
                }
            })

            if (converstions.length == 0) {
                return res.status(200).json(new ApiResponse(200, [], "conversations not found"));
            }

            return res.status(200).json(
                new ApiResponse(
                    200,
                    converstions,
                    "conversation fetch successfully"
                )
            )

        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}