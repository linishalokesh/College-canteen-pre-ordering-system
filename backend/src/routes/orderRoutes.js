
import express from "express";
import {
  getOrders,
  getOrderById,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();
router.patch("/:orderId/status", updateOrderStatus);
// Retrieve all orders
router.get("/", getOrders);

// Retrieve a specific order
router.get("/:orderId", getOrderById);

export default router;
