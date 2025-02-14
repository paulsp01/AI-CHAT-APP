import express from "express"
import morgan from "morgan" 
import connectDB from "./db/db.js"
import userRouter from "./routes/user.routes.js"
import projectRouter from "./routes/project.routes.js"
import aiRouter from "./routes/ai.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"; // Import cookie-parser

connectDB();

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser()); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('This is a dummy route');
});

app.use("/users",userRouter)
app.use("/projects",projectRouter)
app.use("/ai",aiRouter)

export default app;