import express from "express";
import cors from "cors";
import foodRoutes from "./routes/foodRoutes.js";

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

app.use("/api/foods", foodRoutes);

export default app;