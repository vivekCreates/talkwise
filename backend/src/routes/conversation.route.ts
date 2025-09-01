import { Router } from "express";
import { ConversationController } from "../controllers/conversation.controller";
import verifyJWT from "../middlewares/auth.middleware";

const router = Router();

router.use(verifyJWT);

router.route("/create").post(ConversationController.createConversation);
router.route("/all").get(ConversationController.getAllConversations);
router.route("/:id")
.get(ConversationController.getConversation)
.delete(ConversationController.deleteConversation);



export default router;