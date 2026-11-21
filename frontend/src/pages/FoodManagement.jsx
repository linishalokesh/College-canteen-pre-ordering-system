
import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Package,
  Eye,
  EyeOff
} from "lucide-react";

import { useCanteenData } from "../context/CanteenDataContext";

function FoodManagement() {
  const {
    foods,
    categories,
    addFood,
    updateFood,
    removeFood,
    toggleFoodAvailability
  } = useCanteenData();

  const categoryNames = categories.map(category => category.name);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Items");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: categoryNames[0] || "",
    price: "",
    emoji: "🍽️"
  });

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All Items" || food.category === category)
  );

  const availableCount = foods.filter(food => food.available).length;
  const soldOutCount = foods.length - availableCount;

  const openAddForm = () => {
    setEditingId(null);
    setMessage("");

    setForm({
      name: "",
      category: categoryNames[0] || "",
      price: "",
      emoji: "🍽️"
    });

    setShowForm(true);
  };

  const openEditForm = food => {
    setEditingId(food.id);
    setMessage("");

    setForm({
      name: food.name,
      category: food.category,
      price: food.price,
      emoji: food.emoji
    });

    setShowForm(true);
  };

  const saveFood = e => {
    e.preventDefault();
    setMessage("");

    const name = form.name.trim();
    const price = Number(form.price);

    if (!name || !form.category || !Number.isFinite(price) || price <= 0) {
      setMessage("Enter a valid food name, category and price.");
      return;
    }

    const duplicate = foods.some(food =>
      food.name.toLowerCase() === name.toLowerCase() &&
      food.id !== editingId
    );

    if (duplicate) {
      setMessage("A food item with this name already exists.");
      return;
    }

    const foodData = {
      ...form,
      name,
      price
    };

    if (editingId) {
      updateFood(editingId, foodData);
    } else {
      addFood(foodData);
    }

    setShowForm(false);
  };

  const handleDeleteFood = id => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      removeFood(id);
    }
  };

  return (
    <div className="food-page">
      <section className="food-heading">
        <div>
          <span className="date-label">YOUR MENU, YOUR WAY</span>
          <h1>Food <span>Management.</span></h1>
          <p>Keep your menu fresh, organised and ready to serve.</p>
        </div>

        <button
          className="primary-button"
          onClick={openAddForm}
          disabled={categoryNames.length === 0}
        >
          <Plus size={17} />
          Add new item
        </button>
      </section>

      <section className="food-summary">
        <div className="food-summary-card">
          <div className="summary-icon sage-icon">
            <Package size={20} />
          </div>
          <div>
            <span>Total menu items</span>
            <strong>{foods.length}</strong>
          </div>
        </div>

        <div className="food-summary-card">
          <div className="summary-icon peach-icon">
            <Eye size={20} />
          </div>
          <div>
            <span>Available items</span>
            <strong>{availableCount}</strong>
          </div>
        </div>

        <div className="food-summary-card">
          <div className="summary-icon yellow-icon">
            <EyeOff size={20} />
          </div>
          <div>
            <span>Sold out</span>
            <strong>{soldOutCount}</strong>
          </div>
        </div>
      </section>

      <section className="food-catalog">
        <div className="catalog-heading">
          <div>
            <span className="eyebrow">THE GOOD STUFF</span>
            <h2>Your food collection</h2>
          </div>

          <div className="food-search">
            <Search size={16} />
            <input
              placeholder="Find a dish..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="category-filters">
          {["All Items", ...categoryNames].map(item => (
            <button
              key={item}
              className={category === item ? "category-chip selected" : "category-chip"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="food-grid">
          {filteredFoods.map(food => (
            <article className="food-card" key={food.id}>
              <div className="food-image">
                {food.image ? (
                  <img
                    className="food-photo"
                    src={food.image}
                    alt={food.name}
                    loading="lazy"
                  />
                ) : (
                  <span className="food-fallback">{food.emoji}</span>
                )}

                <span className={`availability ${food.available ? "available" : "unavailable"}`}>
                  {food.available ? "Available" : "Sold Out"}
                </span>

                <button
                  className="food-delete"
                  title="Delete item"
                  onClick={() => handleDeleteFood(food.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="food-card-content">
                <span className="food-category">{food.category}</span>
                <h3>{food.name}</h3>

                <div className="food-card-bottom">
                  <strong>₹{food.price}</strong>

                  <div className="food-actions">
                    <button
                      title="Edit item"
                      onClick={() => openEditForm(food)}
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      title={food.available ? "Mark sold out" : "Mark available"}
                      onClick={() => toggleFoodAvailability(food.id)}
                    >
                      {food.available ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="food-empty">
            <Package size={30} />
            <h3>No dishes found</h3>
            <p>Try another search or category.</p>
          </div>
        )}
      </section>

      {showForm && (
        <div
          className="food-modal-backdrop"
          onClick={() => setShowForm(false)}
        >
          <form
            className="food-modal"
            onSubmit={saveFood}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <span className="eyebrow">MENU EDITOR</span>
                <h2>{editingId ? "Edit food item" : "Add something delicious"}</h2>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                <X size={19} />
              </button>
            </div>

            <label>Food name</label>
            <input
              required
              placeholder="e.g. Paneer Sandwich"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <label>Category</label>
            <select
              required
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              {categoryNames.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <label>Price (₹)</label>
            <input
              required
              type="number"
              min="1"
              placeholder="Enter price"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />

            <label>Food emoji</label>
            <input
              value={form.emoji}
              onChange={e => setForm({ ...form, emoji: e.target.value })}
              placeholder="🥗"
            />

            {message && (
              <p className="food-form-error">{message}</p>
            )}

            <button className="primary-button modal-submit" type="submit">
              {editingId ? "Save changes" : "Add to menu"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FoodManagement;
