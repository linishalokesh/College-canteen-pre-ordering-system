
import { foods, setFoods } from "../data/foods.js";

// Validate food details
function validateFood(data) {
    const { name, price, category, image, available, description, tag } = data;

    if (
        !name?.trim() ||
        price === undefined ||
        category === undefined ||
        !image?.trim() ||
        typeof available !== "boolean" ||
        !description?.trim() ||
        !tag?.trim()
    ) {
        return "All food fields are required.";
    }

    if (typeof price !== "number" || price <= 0) {
        return "Price must be a positive number.";
    }

    if (
        typeof category !== "string" ||
        typeof image !== "string" ||
        typeof description !== "string" ||
        typeof tag !== "string"
    ) {
        return "Invalid food field types.";
    }

    return null;
}

// GET: Retrieve all foods
export const getAllFoods = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Food items retrieved successfully",
        data: foods
    });
};

// GET: Retrieve one food
export const getFoodById = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid food ID"
        });
    }

    const food = foods.find(item => item.id === id);

    if (!food) {
        return res.status(404).json({
            success: false,
            message: "Food item not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Food item retrieved successfully",
        data: food
    });
};

// POST: Add a new food
export const addFood = (req, res) => {
    const error = validateFood(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }

    const newFood = {
        id: foods.length
            ? Math.max(...foods.map(item => item.id)) + 1
            : 1,
        ...req.body
    };

    setFoods([...foods, newFood]);

    res.status(201).json({
        success: true,
        message: "Food item added successfully",
        data: newFood
    });
};

// PUT: Update an existing food
export const updateFood = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid food ID"
        });
    }

    const index = foods.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Food item not found"
        });
    }

    const error = validateFood(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }

    const updatedFood = {
        id,
        ...req.body
    };

    const updatedFoods = [...foods];
    updatedFoods[index] = updatedFood;

    setFoods(updatedFoods);

    res.status(200).json({
        success: true,
        message: "Food item updated successfully",
        data: updatedFood
    });
};

// DELETE: Delete a food
export const deleteFood = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid food ID"
        });
    }

    const food = foods.find(item => item.id === id);

    if (!food) {
        return res.status(404).json({
            success: false,
            message: "Food item not found"
        });
    }

    setFoods(foods.filter(item => item.id !== id));

    res.status(200).json({
        success: true,
        message: "Food item deleted successfully",
        data: food
    });
};
