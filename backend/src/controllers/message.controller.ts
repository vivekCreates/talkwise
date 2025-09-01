import { ApiError } from "../utils/apiError"
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from "../utils/apiResponse";
import { aboutAssistant, aiModel, AiRoles } from "../constants";
import groq from "../config/groqcloud";
import prisma from "../config/postgres";

type ChatCompletionMessageParam = {
    role: "system" | "user" | "assistant";
    content: string;
};

export class MessageController {
    static async generateChat(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { prompt }: { prompt: string } = req.body;
            const { conversationId } = req.params;


            if (!prompt) {
                throw new ApiError(400, "Prompt is required");
            }

            const history = await prisma.message.findMany({
                where: { conversationId },
                orderBy: { createdAt: "asc" }
            });



            const Allmessages: ChatCompletionMessageParam[] = [
                { role: AiRoles.SYSTEM as "system", content: aboutAssistant }
            ];

            history.forEach((msg) => {
                Allmessages.push({ role: AiRoles.USER as "user", content: msg.content });
                if (msg.answer) {
                    Allmessages.push({ role: AiRoles.ASSISTANT as "assistant", content: msg.answer });
                }
            });

            Allmessages.push({ role: AiRoles.USER as "user", content: prompt });

            console.log("messages:", Allmessages);

            const response = await groq.chat.completions.create({
                model: aiModel,
                messages: Allmessages!,
                temperature: 0,

            })

            if (!response) {
                throw new ApiError(404, "chat not found")
            }

            const answer = response.choices[0].message.content || "No answer";

            const conversation = await prisma.conversation.findUnique({
                where: { id: conversationId }
            });

            if (!conversation) {
                throw new ApiError(404, "Conversation not found");
            }
            const message = await prisma.message.create({
                data: {
                    userId: req.user?.id!,
                    conversationId,
                    content: prompt,
                    answer


                }
            })

            return res.status(200).json(
                new ApiResponse(
                    200,
                    message,
                    "chat generated successfully"
                )
            )
        } catch (error: any) {
            console.error(error);
            next(error);
        }

    }

    static async getMessages(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { conversationId } = req.params;

            const messages = await prisma.message.findMany({
                where: { conversationId },
                orderBy: { createdAt: "asc" }
            });

            if (messages.length === 0) {
                return res.status(200).json(new ApiResponse(404, [], "No messages found"));
            }

            return res.status(200).json(
                new ApiResponse(
                    200,
                    messages,
                    "Messages fetched successfully"
                )
            )
        } catch (error: any) {
            console.error(error);
            next(error);
        }
    }

    static async deleteMessage(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { messageId } = req.params;

            const message = await prisma.message.findUnique({
                where: { id: messageId }
            });

            if (!message) {
                throw new ApiError(404, "Message not found");
            }

            if (message.userId !== req.user?.id) {
                throw new ApiError(403, "You are not authorized to delete this message");
            }

            await prisma.message.delete({
                where: { id: messageId }
            });

            return res.status(200).json(
                new ApiResponse(
                    200,
                    null,
                    "Message deleted successfully"
                )
            )
        } catch (error: any) {
            console.error(error);
            next(error);
        }
    }
}