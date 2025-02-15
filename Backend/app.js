import express from "express"
import morgan from "morgan" 
import connectDB from "./db/db.js"
import userRouter from "./routes/user.routes.js"
import projectRouter from "./routes/project.routes.js"
import aiRouter from "./routes/ai.routes.js"
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"; // Import cookie-parser
const corsOptions = {
    origin: "https://ai-chat-app-1-lo0k.onrender.com", // Replace with your actual frontend URL
    credentials: true, // Allow sending cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

connectDB();

const app = express()
//app.use(cors(corsOptions))
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



app.use(express.static(path.join(__dirname,'public')));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public', 'dist','index.html'));
}) 
app.use(cors({
    origin: 'https://localhost:5173', // Replace with your frontend domain
    credentials: true,
  }));

export default app;