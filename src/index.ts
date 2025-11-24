import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/auth-routes";
import { sampleMiddleware } from "./middlewears/auth-middlewears";
import dotenv from "dotenv"
import mongoose from "mongoose";
import { error } from "console";
dotenv.config()


const SERVER_PORT = process.env.SERVER_PORT
const MONGO_URI = process.env.MONGO_URI as string
const app: Application = express();

// Built-in middleware
app.use(express.json());

// Third-party middleware (CORS)
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Global middleware
app.use((req, res, next) => {
  console.log(`[global Middleware] ${req.method} ${req.url}`);
  next();
});

// Sample route middleware
app.use("/api/v1/auth", sampleMiddleware, authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Smart Blog Backend Running ");
});
mongoose.connect(MONGO_URI).then(() =>{
    console.log("DB connected")
})
.catch((err) => {
    console.error(`DB Connection fail:,{err}`)
    process.exit(1)
})
// Server start
app.listen(5000, () => console.log(" Server running on port 5000"));