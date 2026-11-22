/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const CanteenDataContext = createContext(null);

export const FOOD_IMAGES = {
  dosa: "https://images.unsplash.com/photo-1743615467204-8fdaa85ff2db?auto=format&fit=crop&w=900&q=85",
  sandwich: "https://images.unsplash.com/photo-1641848421637-713a3eb9c6cc?auto=format&fit=crop&w=900&q=85",
  coffee: "https://images.unsplash.com/photo-1763142165538-75c2e0604868?auto=format&fit=crop&w=900&q=85",
  rice: "https://images.unsplash.com/photo-1762305194795-5e2ad8a146a3?auto=format&fit=crop&w=900&q=85",
  brownie: "https://images.unsplash.com/photo-1777647364657-2319b02095de?auto=format&fit=crop&w=900&q=85"
};

const categoryImages = {
  "South Indian": FOOD_IMAGES.dosa,
  "North Indian": FOOD_IMAGES.rice,
  "Quick Bites": FOOD_IMAGES.sandwich,
  "Beverages": FOOD_IMAGES.coffee,
  "Main Course": FOOD_IMAGES.rice,
  "Desserts": FOOD_IMAGES.brownie
};

const initialCategories = [
  { id: 1, name: "South Indian", description: "Traditional flavours and regional favourites.", emoji: "🥞", color: "cat-sage", image: FOOD_IMAGES.dosa },
  { id: 2, name: "North Indian", description: "Comforting meals packed with flavour.", emoji: "🍛", color: "cat-peach", image: FOOD_IMAGES.rice },
  { id: 3, name: "Quick Bites", description: "Perfect little bites between classes.", emoji: "🥪", color: "cat-lavender", image: FOOD_IMAGES.sandwich },
  { id: 4, name: "Beverages", description: "Refreshing sips for every mood.", emoji: "🥤", color: "cat-yellow", image: FOOD_IMAGES.coffee },
  { id: 5, name: "Desserts", description: "A little sweetness to finish your meal.", emoji: "🍰", color: "cat-pink", image: FOOD_IMAGES.brownie },
  { id: 6, name: "Main Course", description: "Wholesome meals for hungry students.", emoji: "🍱", color: "cat-blue", image: FOOD_IMAGES.rice }
];

const initialFoods = [
  { id: 1, name: "Masala Dosa", category: "South Indian", price: 80, available: true, emoji: "🥞", color: "food-peach", image: FOOD_IMAGES.dosa },
  { id: 2, name: "Veg Sandwich", category: "Quick Bites", price: 65, available: true, emoji: "🥪", color: "food-sage", image: FOOD_IMAGES.sandwich },
  { id: 3, name: "Cold Coffee", category: "Beverages", price: 50, available: true, emoji: "☕", color: "food-lavender", image: FOOD_IMAGES.coffee },
  { id: 4, name: "Paneer Roll", category: "Quick Bites", price: 90, available: false, emoji: "🌯", color: "food-yellow", image: FOOD_IMAGES.sandwich },
  { id: 5, name: "Veg Fried Rice", category: "Main Course", price: 110, available: true, emoji: "🍚", color: "food-sage", image: FOOD_IMAGES.rice },
  { id: 6, name: "Chocolate Brownie", category: "Desserts", price: 70, available: true, emoji: "🍫", color: "food-peach", image: FOOD_IMAGES.brownie }
];

const initialOrders = [
  { id: "CN2041", customer: "Aarav Sharma", items: "2 × Masala Dosa", total: 160, time: "10:42 AM", date: "21 Nov 2026", status: "Received" },
  { id: "CN2042", customer: "Ananya Rao", items: "1 × Veg Sandwich", total: 65, time: "10:48 AM", date: "21 Nov 2026", status: "Preparing" },
  { id: "CN2043", customer: "Rohan Kumar", items: "2 × Cold Coffee", total: 100, time: "10:53 AM", date: "21 Nov 2026", status: "Ready" },
  { id: "CN2044", customer: "Meera Nair", items: "1 × Paneer Roll", total: 90, time: "11:02 AM", date: "21 Nov 2026", status: "Completed" },
  { id: "CN2045", customer: "Diya Kapoor", items: "1 × Veg Fried Rice", total: 110, time: "11:10 AM", date: "21 Nov 2026", status: "Rejected" },
  { id: "CN2046", customer: "Ishaan Rao", items: "1 × Chocolate Brownie", total: 70, time: "11:15 AM", date: "21 Nov 2026", status: "Completed" }
];

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() =>
    readStorage(key, initialValue)
  );

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Could not save canteen data:", error);
    }
  }, [key, value]);

  return [value, setValue];
}

export function CanteenDataProvider({ children }) {
  const [foods, setFoods] = usePersistentState(
    "grabbit-foods-v2",
    initialFoods
  );

  const [categories, setCategories] = usePersistentState(
    "grabbit-categories-v2",
    initialCategories
  );

  const [orders, setOrders] = usePersistentState(
    "grabbit-orders-v2",
    initialOrders
  );

  // FOOD MANAGEMENT

  const addFood = food => {
    const newFood = {
      ...food,
      id: Date.now(),
      available: true,
      color: "food-sage",
      image: food.image || categoryImages[food.category] || ""
    };

    setFoods(old => [...old, newFood]);
  };

  const updateFood = (id, changes) => {
    setFoods(old =>
      old.map(food => {
        if (food.id !== id) return food;

        const updated = { ...food, ...changes };

        if (changes.category && changes.category !== food.category) {
          updated.image =
            categoryImages[changes.category] || food.image;
        }

        return updated;
      })
    );
  };

  const removeFood = id => {
    setFoods(old => old.filter(food => food.id !== id));
  };

  const toggleFoodAvailability = id => {
    setFoods(old =>
      old.map(food =>
        food.id === id
          ? { ...food, available: !food.available }
          : food
      )
    );
  };

  // CATEGORY MANAGEMENT

  const addCategory = category => {
    const name = category.name.trim();

    if (
      categories.some(
        item => item.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return { success: false, message: "Category already exists." };
    }

    setCategories(old => [
      ...old,
      {
        ...category,
        id: Date.now(),
        name,
        color: category.color || "cat-sage",
        image: category.image || categoryImages[name] || ""
      }
    ]);

    return { success: true };
  };

  const updateCategory = (id, changes) => {
    const existing = categories.find(category => category.id === id);

    if (!existing) {
      return { success: false, message: "Category not found." };
    }

    const name = changes.name.trim();

    const duplicate = categories.some(
      category =>
        category.id !== id &&
        category.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      return { success: false, message: "Category already exists." };
    }

    setCategories(old =>
      old.map(category =>
        category.id === id
          ? {
              ...category,
              ...changes,
              name,
              image: categoryImages[name] || category.image
            }
          : category
      )
    );

    // Update the category name in every food item using it.
    if (existing.name !== name) {
      setFoods(old =>
        old.map(food =>
          food.category === existing.name
            ? {
                ...food,
                category: name,
                image: categoryImages[name] || food.image
              }
            : food
        )
      );
    }

    return { success: true };
  };

  const removeCategory = id => {
    const category = categories.find(item => item.id === id);

    if (!category) {
      return { success: false, message: "Category not found." };
    }

    const linkedFoods = foods.filter(
      food => food.category === category.name
    );

    if (linkedFoods.length > 0) {
      return {
        success: false,
        message: `Move the ${linkedFoods.length} food item(s) in this category to another category before deleting it.`
      };
    }

    setCategories(old =>
      old.filter(item => item.id !== id)
    );

    return { success: true };
  };

  // ORDER MANAGEMENT

  const updateOrderStatus = (id, status) => {
    const order = orders.find(item => item.id === id);

    if (!order) return false;

    const allowedTransitions = {
      Received: ["Preparing", "Rejected"],
      Preparing: ["Ready"],
      Ready: ["Completed"],
      Completed: [],
      Rejected: []
    };

    if (!allowedTransitions[order.status]?.includes(status)) {
      return false;
    }

    setOrders(old =>
      old.map(item =>
        item.id === id
          ? { ...item, status }
          : item
      )
    );

    return true;
  };

  return (
    <CanteenDataContext.Provider
      value={{
        foods,
        categories,
        orders,
        addFood,
        updateFood,
        removeFood,
        toggleFoodAvailability,
        addCategory,
        updateCategory,
        removeCategory,
        updateOrderStatus
      }}
    >
      {children}
    </CanteenDataContext.Provider>
  );
}

export function useCanteenData() {
  const context = useContext(CanteenDataContext);

  if (!context) {
    throw new Error(
      "useCanteenData must be used inside CanteenDataProvider"
    );
  }

  return context;
}
