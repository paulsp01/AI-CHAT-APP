
import express from "express"
import morgan from "morgan" 
import connectDB from "./db/db.js"
import userRouter from "./routes/user.routes.js"
import cors from "cors"

connectDB();


const app = express()
app.use(cors())
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('This is a dummy route');
});

app.use("/users",userRouter)

export default app;