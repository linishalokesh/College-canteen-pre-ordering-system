
import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Tags,
  ArrowUpRight
} from "lucide-react";

import { useCanteenData, FOOD_IMAGES } from "../context/CanteenDataContext";

const categoryImages = {
  "South Indian": FOOD_IMAGES.dosa,
  "North Indian": FOOD_IMAGES.rice,
  "Quick Bites": FOOD_IMAGES.sandwich,
  "Beverages": FOOD_IMAGES.coffee,
  "Main Course": FOOD_IMAGES.rice,
  "Desserts": FOOD_IMAGES.brownie
};

function CategoryManagement() {
  const {
    categories,
    foods,
    addCategory,
    updateCategory,
    removeCategory
  } = useCanteenData();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    emoji: "🍽️"
  });

  const categoryList = categories.map(category => ({
    ...category,
    count: foods.filter(food => food.category === category.name).length
  }));

  const filteredCategories = categoryList.filter(category =>
    `${category.name} ${category.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openAddForm = () => {
    setEditingId(null);
    setMessage("");
    setForm({
      name: "",
      description: "",
      emoji: "🍽️"
    });
    setShowForm(true);
  };

  const openEditForm = category => {
    setEditingId(category.id);
    setMessage("");
    setForm({
      name: category.name,
      description: category.description,
      emoji: category.emoji
    });
    setShowForm(true);
  };

  const saveCategory = e => {
    e.preventDefault();
    setMessage("");

    const name = form.name.trim();

    if (!name) {
      setMessage("Enter a category name.");
      return;
    }

    const categoryData = {
      ...form,
      name,
      image: categoryImages[name] || ""
    };

    const result = editingId
      ? updateCategory(editingId, categoryData)
      : addCategory(categoryData);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setShowForm(false);
  };

  const handleDelete = id => {
    const result = removeCategory(id);

    if (!result.success) {
      window.alert(result.message);
    }
  };

  const totalFoodItems = foods.length;

  return (
    <div className="category-page">
      <section className="category-heading">
        <div>
          <span className="date-label">A PLACE FOR EVERY FLAVOUR</span>
          <h1>Food <span>Categories.</span></h1>
          <p>Organise your menu into little collections of goodness.</p>
        </div>

        <button className="primary-button" onClick={openAddForm}>
          <Plus size={17} />
          Add category
        </button>
      </section>

      <section className="category-overview">
        <div className="category-overview-card">
          <div className="category-overview-icon cat-icon-sage">
            <Tags size={20} />
          </div>
          <div>
            <span>Total categories</span>
            <strong>{categories.length}</strong>
          </div>
        </div>

        <div className="category-overview-card">
          <div className="category-overview-icon cat-icon-peach">
            <span>🍽️</span>
          </div>
          <div>
            <span>Total food items</span>
            <strong>{totalFoodItems}</strong>
          </div>
        </div>

        <div className="category-overview-card">
          <div className="category-overview-icon cat-icon-lavender">
            <span>✨</span>
          </div>
          <div>
            <span>Menu collections</span>
            <strong>{categories.length} collections</strong>
          </div>
        </div>
      </section>

      <section className="category-catalog">
        <div className="category-catalog-heading">
          <div>
            <span className="eyebrow">CURATED FOR YOUR MENU</span>
            <h2>Explore collections</h2>
            <p>Every dish deserves its own little place.</p>
          </div>

          <div className="category-search">
            <Search size={16} />
            <input
              placeholder="Search categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="category-grid">
          {filteredCategories.map(category => (
            <article className="category-card" key={category.id}>
              <div className={`category-art ${category.color}`}>
                {category.image ? (
                  <img
                    className="category-photo"
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                  />
                ) : (
                  <span className="category-emoji">
                    {category.emoji}
                  </span>
                )}

                <span className="category-number">
                  {String(category.id).padStart(2, "0")}
                </span>

                <div className="category-card-actions">
                  <button
                    title="Edit category"
                    onClick={() => openEditForm(category)}
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    title="Delete category"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="category-card-content">
                <div className="category-card-title">
                  <h3>{category.name}</h3>
                  <ArrowUpRight size={16} />
                </div>

                <p>{category.description}</p>

                <div className="category-card-footer">
                  <span>MENU COLLECTION</span>
                  <strong>{category.count} items</strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="category-empty">
            <Tags size={30} />
            <h3>No categories found</h3>
            <p>Try a different search term.</p>
          </div>
        )}
      </section>

      {showForm && (
        <div
          className="category-modal-backdrop"
          onClick={() => setShowForm(false)}
        >
          <form
            className="category-modal"
            onSubmit={saveCategory}
            onClick={e => e.stopPropagation()}
          >
            <div className="category-modal-heading">
              <div>
                <span className="eyebrow">COLLECTION EDITOR</span>
                <h2>{editingId ? "Edit collection" : "Create a collection"}</h2>
              </div>

              <button
                type="button"
                className="category-modal-close"
                onClick={() => setShowForm(false)}
              >
                <X size={19} />
              </button>
            </div>

            <label>Category name</label>
            <input
              required
              placeholder="e.g. Breakfast Specials"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <label>Description</label>
            <textarea
              required
              placeholder="A short description of this collection..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
            />

            <label>Category emoji</label>
            <input
              value={form.emoji}
              onChange={e => setForm({ ...form, emoji: e.target.value })}
              placeholder="🍽️"
            />

            {message && (
              <p className="food-form-error">{message}</p>
            )}

            <button className="primary-button category-modal-submit" type="submit">
              {editingId ? "Save changes" : "Create category"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CategoryManagement;
