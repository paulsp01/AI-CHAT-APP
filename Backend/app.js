import express from "express"
import morgan from "morgan" 
import connectDB from "./db/db.js"
import userRouter from "./routes/user.routes.js"
import projectRouter from "./routes/project.routes.js"
import aiRouter from "./routes/ai.routes.js"
import { fileURLToPath } from "url";

import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"; // Import cookie-parser

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('Current Directory: ', __dirname);

const app = express()

app.use(morgan('dev'))
app.use(cookieParser()); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('This is a dummy route');
});

app.use("/users",userRouter)
app.use("/projects",projectRouter)
app.use("/ai", aiRouter)



app.use(express.static(path.join(__dirname, "public", "dist"))); // Adjust if needed
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

app.use(cors({
    origin: 'https://ai-chat-app-1-lo0k.onrender.com', // Replace with your frontend domain
    credentials: true,
  }));
 

export default app;