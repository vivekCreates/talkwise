import {Router} from "express"
import verifyJWT from "../middlewares/auth.middleware";
import { MessageController } from "../controllers/message.controller";


const router = Router();

router.use(verifyJWT);

router.route("/:conversationId").post(MessageController.generateChat);
router.route("/:conversationId").get(MessageController.getMessages);
router.route("/:messageId").delete(MessageController.deleteMessage);


export default router