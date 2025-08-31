import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});