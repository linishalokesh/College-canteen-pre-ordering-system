
import { useState } from "react";
import { useCanteenData } from "../context/CanteenDataContext";
import FoodCard from "../components/FoodCard";
import grabbitLogo from "../assets/grabbit-logo.png";
import "../styles/student-menu.css";

function StudentMenu() {
  const { foods = [], categories = [] } = useCanteenData();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryNames = categories.map((category) =>
    typeof category === "string" ? category : category.name
  );

  const filteredFoods =
    selectedCategory === "All"
      ? foods
      : foods.filter((food) => food.category === selectedCategory);

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

        <div className="student-food-grid">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))
          ) : (
            <div className="student-empty-state">
              <span>🍽️</span>
              <h3>No items found</h3>
              <p>There are no food items in this category right now.</p>
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
              >
                View all items
              </button>
            </div>
          )}
        </div>
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
