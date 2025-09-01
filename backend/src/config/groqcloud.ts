import Groq from "groq-sdk";


const groq = new Groq({
    apiKey: process.env.GROQCLOUD_API_KEY || "",
});

export default groq;