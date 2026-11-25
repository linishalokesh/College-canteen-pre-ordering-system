
import { useState } from "react";
import { useCanteenData } from "../context/CanteenDataContext";
import FoodCard from "../components/FoodCard";
import grabbitLogo from "../assets/grabbit-logo.png";
import "../styles/student-menu.css";

function StudentMenu() {
  const { foods = [], categories = [] } = useCanteenData();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);

  const categoryNames = categories.map((category) =>
    typeof category === "string" ? category : category.name
  );

  // Filter food items by category and search query.
  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  // Add an available food item to the cart.
  const addToCart = (food) => {
    if (!food.available) return;

    setCart((oldCart) => {
      const existingItem = oldCart.find(
        (item) => item.foodId === food.id
      );

      if (existingItem) {
        return oldCart.map((item) =>
          item.foodId === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...oldCart, { foodId: food.id, quantity: 1 }];
    });
  };

  // Increase item quantity.
  const increaseQuantity = (foodId) => {
    setCart((oldCart) =>
      oldCart.map((item) =>
        item.foodId === foodId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity or remove the item when quantity reaches zero.
  const decreaseQuantity = (foodId) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.foodId === foodId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Empty the entire cart.
  const emptyCart = () => {
    setCart([]);
  };

  // Get the latest food details for cart items.
  const cartItems = cart
    .map((item) => {
      const food = foods.find((food) => food.id === item.foodId);

      return food ? { ...food, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  // Calculate cart item count and total price.
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="student-menu">
      <header className="student-header">
        <div className="student-brand">
          <img src={grabbitLogo} alt="Grabbit logo" />
        </div>

        <div className="student-header-message">
          <span className="student-header-dot"></span>
          Your campus food stop
        </div>
      </header>

      <section className="student-welcome">
        <div className="student-welcome-content">
          <span className="student-eyebrow">
            GOOD FOOD. ZERO WAITING.
          </span>

          <h1>
            Hey there,
            <br />
            <span>Hungry student!</span>
          </h1>

          <p>
            Your favourite campus meals are just a few clicks away.
            Explore the menu and find something delicious today!
          </p>

          <div className="student-tagline">
            <span>Skip the Queue.</span> Grab Your Food.
          </div>
        </div>

        <div className="student-welcome-decoration" aria-hidden="true">
          <div className="student-decoration-circle">
            <span>🐰</span>
          </div>
          <span className="student-decoration-sparkle sparkle-one">✦</span>
          <span className="student-decoration-sparkle sparkle-two">✳</span>
          <span className="student-decoration-sparkle sparkle-three">✦</span>
        </div>
      </section>

      <section className="student-menu-section">
        <div className="student-section-heading">
          <div>
            <span className="student-eyebrow">MADE FRESH FOR YOU</span>
            <h2>Explore the Menu<span>.</span></h2>
            <p>Discover something tasty for your next campus break.</p>
          </div>

          <div className="student-menu-count">
            <strong>{filteredFoods.length}</strong>
            <span>{filteredFoods.length === 1 ? "item" : "items"}</span>
          </div>
        </div>

        {/* Food Search */}
        <div className="student-search">
          <input
            type="text"
            placeholder="Search for your favourite food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="student-category-section">
          <h3>Browse Categories</h3>

          <div className="student-category-list">
            <button
              type="button"
              className={`student-category-chip ${
                selectedCategory === "All" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("All")}
            >
              <span>🍽️</span>
              All Items
            </button>

            {categoryNames.map((category) => (
              <button
                type="button"
                key={category}
                className={`student-category-chip ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "South Indian" && <span>🥞</span>}
                {category === "North Indian" && <span>🍛</span>}
                {category === "Quick Bites" && <span>🥪</span>}
                {category === "Beverages" && <span>🥤</span>}
                {category === "Desserts" && <span>🍰</span>}
                {category === "Main Course" && <span>🍱</span>}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Food Cards */}
        <div className="student-food-grid">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onAddToCart={addToCart}
              />
            ))
          ) : (
            <div className="student-empty-state">
              <span>🍽️</span>
              <h3>No items found</h3>
              <p>
                No food items match your search or selected category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                View all items
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Shopping Cart */}
      <section className="student-cart-section" id="student-cart">
        <div className="student-cart-heading">
          <div>
            <span className="student-eyebrow">YOUR SELECTION</span>
            <h2>Your Cart<span>.</span></h2>
          </div>

          <div className="student-cart-count">
            {cartCount} {cartCount === 1 ? "item" : "items"}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="student-cart-empty">
            <span>🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add something delicious from the menu to get started!</p>
          </div>
        ) : (
          <>
            <div className="student-cart-items">
              {cartItems.map((item) => (
                <div className="student-cart-item" key={item.id}>
                  <div className="student-cart-item-details">
                    <h3>{item.name}</h3>
                    <span>₹{item.price} each</span>
                  </div>

                  <div className="student-cart-quantity">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  <strong className="student-cart-item-total">
                    ₹{item.price * item.quantity}
                  </strong>
                </div>
              ))}
            </div>

            <div className="student-cart-summary">
              <span>Total Amount</span>
              <strong>₹{cartTotal}</strong>
            </div>

            {/* Empty Cart Button */}
            <div className="student-cart-actions">
              <button
                type="button"
                className="student-empty-cart-button"
                onClick={emptyCart}
              >
                Empty Cart
              </button>
            </div>
          </>
        )}
      </section>

      <footer className="student-footer">
        <img src={grabbitLogo} alt="" />
        <p>Good food, less waiting. Made for campus life.</p>
        <span>© Grabbit</span>
      </footer>
    </main>
  );
}

export default StudentMenu;
