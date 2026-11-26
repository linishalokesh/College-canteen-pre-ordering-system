import express from "express";
import cors from "cors";
<<<<<<< Updated upstream
import foodRoutes from "./routes/foodRoutes.js";
=======
import orderRoutes from "./routes/orderRoutes.js";
>>>>>>> Stashed changes

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/orders", orderRoutes);

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