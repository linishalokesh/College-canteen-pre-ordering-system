
import express from "express";

import {
    getAllFoods,
    getFoodById,
    addFood,
    updateFood,
    deleteFood
} from "../controllers/foodController.js";

const router = express.Router();

// GET all food items
router.get("/", getAllFoods);

// GET a specific food item
router.get("/:id", getFoodById);

// ADD a new food item
router.post("/", addFood);

// UPDATE a food item
router.put("/:id", updateFood);

// DELETE a food item
router.delete("/:id", deleteFood);

export default router;
