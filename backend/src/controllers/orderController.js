
import { orders } from "../data/orderData.js";

// GET /api/orders
export const getOrders = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: {
        orders
      }
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve orders"
    });
  }
};

// GET /api/orders/:orderId
export const getOrderById = (req, res) => {
  try {
    const { orderId } = req.params;

    const order = orders.find(
      (item) => item.id === orderId
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: {
        order
      }
    });
  } catch (error) {
    console.error("Error retrieving order:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve order"
    });
  }
};


const allowedTransitions = {
  Received: ["Preparing", "Rejected"],
  Preparing: ["Ready"],
  Ready: ["Completed"],
  Completed: [],
  Rejected: []
};

// PATCH /api/orders/:orderId/status
export const updateOrderStatus = (req, res) => {
  try {
    const { orderId } = req.params;
    const status = req.body?.status;

    if (!status || typeof status !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid status is required"
      });
    }

    const order = orders.find(
      (item) => item.id === orderId
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const permittedStatuses = allowedTransitions[order.status];

    if (!permittedStatuses || !permittedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot change order status from ${order.status} to ${status}`
      });
    }

    order.status = status;

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: {
        order
      }
    });
  } catch (error) {
    console.error("Error updating order status:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order status"
    });
  }
};
