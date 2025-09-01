import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(cors({ 
        origin:
        process.env.FRONTEND_URL,
         credentials: true 
    }
))

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


import userRoutes from "./routes/user.route";
import conversationRoutes from "./routes/conversation.route";
import messageRoutes from "./routes/message.route";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/chat", messageRoutes);







app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});