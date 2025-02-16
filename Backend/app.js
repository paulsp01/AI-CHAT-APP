// import express from "express"
// import morgan from "morgan" 
// import connectDB from "./db/db.js"
// import userRouter from "./routes/user.routes.js"
// import projectRouter from "./routes/project.routes.js"
// import aiRouter from "./routes/ai.routes.js"
// import { fileURLToPath } from "url";

// import cors from "cors"
// import path from "path"
// import cookieParser from "cookie-parser"; // Import cookie-parser

// connectDB();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log('Current Directory: ', __dirname);

// const app = express()

// app.use(morgan('dev'))
// app.use(cookieParser()); 
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cors({
//     origin: 'https://ai-chat-app-1-lo0k.onrender.com', // Replace with your frontend domain
//     credentials: true,
//   }));

// app.get('/', (req, res) => {
//     res.send('This is a dummy route');
// });

// app.use("/users",userRouter)
// app.use("/projects",projectRouter)
// app.use("/ai", aiRouter)





// app.get("/test-static", (req, res) => {
//     console.log("Received request for /test-static");
//     // res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
//     // res.setHeader("Pragma", "no-cache");
//     // res.setHeader("Expires", "0");
    
//     const filePath = path.join(__dirname, "public", "dist", "index.html");
//     console.log("Serving file from: ", filePath); // Debugging
//     res.sendFile(filePath, (err) => {
//         if (err) {
//             console.error("Error sending file:", err);
//             res.status(500).send("Error serving the file.");
//         }
//     });
// });
// app.get("*", (req, res) => {
//     console.log("Route not found: ", req.url);
//     res.status(404).send("Route not found");
// });


// app.use(express.static(path.join(__dirname, "public", "dist"))); // Adjust if needed
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
// });
// console.log('Static path:', path.join(__dirname, "public", "dist"));

 

// export default app;




import express from "express";
import morgan from "morgan"; 
import connectDB from "./db/db.js";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import aiRouter from "./routes/ai.routes.js";
import { fileURLToPath } from "url";

import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser"; 

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('Current Directory:', __dirname);

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend domain
    credentials: true,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
}
    
));


app.use(express.static(path.join(__dirname, "public", "dist")));
console.log('Static path:', path.join(__dirname, "public", "dist"));






app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/ai", aiRouter);

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    next();
});




app.get("*", (req, res) => {
    console.log("Frontend route:", req.url);
    res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

export default app;
