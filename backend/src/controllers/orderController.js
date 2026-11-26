
import { orders, generateOrderId } from "../data/orderData.js";
import { foods } from "../data/foods.js";
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
  Pending: ["Preparing"],
  Preparing: ["Ready"],
  Ready: ["Completed"],
  Completed: []
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

export const createOrder = (req, res) => {
  try {
    const { studentId, items } = req.body ?? {};

    // Validate student ID
    if (
      typeof studentId !== "string" ||
      studentId.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid studentId is required"
      });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item"
      });
    }

    const orderItems = [];

    for (const item of items) {
      // Validate food ID and quantity
      if (
        !item ||
        !Number.isInteger(item.foodId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Each item must have a valid foodId and positive integer quantity"
        });
      }

      // Find food item
      const food = foods.find(
        (foodItem) => foodItem.id === item.foodId
      );

      if (!food) {
        return res.status(404).json({
          success: false,
          message: `Food item with ID ${item.foodId} not found`
        });
      }

      // Check availability
      if (!food.available) {
        return res.status(400).json({
          success: false,
          message: `${food.name} is currently unavailable`
        });
      }

      const subtotal = food.price * item.quantity;

      orderItems.push({
        foodId: food.id,
        name: food.name,
        quantity: item.quantity,
        price: food.price,
        subtotal
      });
    }

    // Calculate total amount
    const totalAmount = orderItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    // Create order
    const order = {
      id: generateOrderId(),
      studentId: studentId.trim(),
      items: orderItems,
      totalAmount,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    orders.push(order);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: { order }
    });
  } catch (error) {
    console.error("Error creating order:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to place order"
    });
  }
};
