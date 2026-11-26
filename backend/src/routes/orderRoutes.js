
import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} from "../controllers/orderController.js";
const router = express.Router();
router.patch("/:orderId/status", updateOrderStatus);
// Retrieve all orders
router.get("/", getOrders);

router.post("/", createOrder);

// Retrieve a specific order
router.get("/:orderId", getOrderById);

export default router;
