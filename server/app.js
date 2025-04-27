import express from "express";
import mongoose from "mongoose";
import dotenv  from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app  = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin : "http://localhost:3000",
        credentials : true
    })
);


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connection Error:", err));



app.use("/api/profile", userRoutes);  



app.get("/", (req, res) => {
    res.send("Agrimart APP is running.");
});

    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
