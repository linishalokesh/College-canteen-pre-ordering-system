import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Grabbit Backend!");
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Grabbit backend is running!"
    });
});

export default app;