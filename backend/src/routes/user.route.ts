import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import verifyJWT from "../middlewares/auth.middleware";
import upload from "../middlewares/multer.middleware";

const router  = Router();


router.route("/sign-up").post(upload.single("avatar"),UserController.signUp);
router.route("/sign-in").post(UserController.signIn);
router.route("/logout").post(verifyJWT,UserController.logout);
router.route("/me").get(verifyJWT,UserController.getCurrentUser);



export default router;