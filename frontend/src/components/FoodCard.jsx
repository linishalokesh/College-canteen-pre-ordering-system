
function FoodCard({ food, onAddToCart }) {
  const hasImage =
    typeof food.image === "string" &&
    (food.image.startsWith("http") ||
      food.image.startsWith("/") ||
      food.image.startsWith("data:"));

  return (
    <article className="student-food-card">
      <div
        className="student-food-image"
        style={{ backgroundColor: food.color || "#f5eee2" }}
      >
        {hasImage ? (
          <img src={food.image} alt={food.name} />
        ) : (
          <span className="student-food-emoji">
            {food.emoji || food.image || "🍽️"}
          </span>
        )}

        <span
          className={`student-food-status ${
            food.available ? "is-available" : "is-unavailable"
          }`}
        >
          {food.available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="student-food-details">
        <span className="student-food-category">{food.category}</span>

        <h3>{food.name}</h3>

        <div className="student-food-bottom">
          <span className="student-food-price">₹{food.price}</span>

          <span
            className={`student-food-availability ${
              food.available ? "available-text" : "unavailable-text"
            }`}
          >
            {food.available ? "Ready to order" : "Currently unavailable"}
          </span>
        </div>

        <button
          type="button"
          className="student-add-cart-button"
          onClick={() => onAddToCart(food)}
          disabled={!food.available}
        >
          {food.available ? "＋ Add to Cart" : "Unavailable"}
        </button>
      </div>
    </article>
  );
}

export default FoodCard;
