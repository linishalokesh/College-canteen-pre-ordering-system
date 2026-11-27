
export let foods = [
    {
        id: 1,
        name: "Masala Dosa",
        category: "South Indian",
        price: 80,
        available: true,
        emoji: "🥞",
        color: "food-peach",
        image: "https://images.unsplash.com/photo-1743615467204-8fdaa85ff2db?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 2,
        name: "Veg Sandwich",
        category: "Quick Bites",
        price: 65,
        available: true,
        emoji: "🥪",
        color: "food-sage",
        image: "https://images.unsplash.com/photo-1641848421637-713a3eb9c6cc?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 3,
        name: "Cold Coffee",
        category: "Beverages",
        price: 50,
        available: true,
        emoji: "☕",
        color: "food-lavender",
        image: "https://images.unsplash.com/photo-1763142165538-75c2e0604868?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 4,
        name: "Paneer Roll",
        category: "Quick Bites",
        price: 90,
        available: false,
        emoji: "🌯",
        color: "food-yellow",
        image: "https://images.unsplash.com/photo-1641848421637-713a3eb9c6cc?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 5,
        name: "Veg Fried Rice",
        category: "Main Course",
        price: 110,
        available: true,
        emoji: "🍚",
        color: "food-sage",
        image: "https://images.unsplash.com/photo-1762305194795-5e2ad8a146a3?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 6,
        name: "Chocolate Brownie",
        category: "Desserts",
        price: 70,
        available: true,
        emoji: "🍫",
        color: "food-peach",
        image: "https://images.unsplash.com/photo-1777647364657-2319b02095de?auto=format&fit=crop&w=900&q=85"
    }
];

export function setFoods(updatedFoods) {
    foods = updatedFoods;
}
