
import { useState } from "react";
import {
  Search,
  EyeOff,
  CheckCircle2,
  Package
} from "lucide-react";

import { useCanteenData } from "../context/CanteenDataContext";

function AvailabilityManagement() {
  const { foods, toggleFoodAvailability } = useCanteenData();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredFoods = foods.filter(food => {
    const matchesSearch =
      `${food.name} ${food.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Available" && food.available) ||
      (filter === "Sold Out" && !food.available);

    return matchesSearch && matchesFilter;
  });

  const available = foods.filter(food => food.available).length;
  const soldOut = foods.length - available;

  return (
    <div className="av-page">
      <section className="av-heading">
        <div>
          <span className="date-label">KEEP YOUR MENU UPDATED</span>
          <h1>Food <span>Availability.</span></h1>
          <p>One little switch keeps your customers in the loop.</p>
        </div>
      </section>

      <section className="av-stats">
        <div className="av-stat">
          <div className="av-stat-icon av-green">
            <Package size={20} />
          </div>
          <div>
            <span>Total food items</span>
            <strong>{foods.length}</strong>
          </div>
        </div>

        <div className="av-stat">
          <div className="av-stat-icon av-sage">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span>Available now</span>
            <strong>{available}</strong>
          </div>
        </div>

        <div className="av-stat">
          <div className="av-stat-icon av-peach">
            <EyeOff size={20} />
          </div>
          <div>
            <span>Sold out</span>
            <strong>{soldOut}</strong>
          </div>
        </div>
      </section>

      <section className="av-catalog">
        <div className="av-catalog-heading">
          <div>
            <span className="eyebrow">LIVE MENU STATUS</span>
            <h2>Availability control</h2>
            <p>Update your menu as the kitchen gets busy.</p>
          </div>

          <div className="av-search">
            <Search size={16} />
            <input
              placeholder="Find a food item..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="av-filters">
          {["All", "Available", "Sold Out"].map(item => (
            <button
              key={item}
              className={filter === item ? "av-filter active" : "av-filter"}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="av-list">
          {filteredFoods.map(food => (
            <div className="av-item" key={food.id}>
              <div className="av-food-image">
                {food.image ? (
                  <img
                    className="av-food-photo"
                    src={food.image}
                    alt={food.name}
                    loading="lazy"
                  />
                ) : (
                  <span>{food.emoji}</span>
                )}
              </div>

              <div className="av-food-details">
                <strong>{food.name}</strong>
                <span>{food.category} · ₹{food.price}</span>
              </div>

              <span className={`av-status ${food.available ? "is-available" : "is-soldout"}`}>
                <span />
                {food.available ? "Available" : "Sold Out"}
              </span>

              <button
                className={`av-toggle ${food.available ? "toggle-on" : "toggle-off"}`}
                onClick={() => toggleFoodAvailability(food.id)}
                aria-label={`Change availability of ${food.name}`}
                aria-pressed={food.available}
              >
                <span />
              </button>
            </div>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="av-empty">
            <Package size={30} />
            <h3>No items found</h3>
            <p>Try changing your search or filter.</p>
          </div>
        )}
      </section>

      <p className="av-note">
        Changes made here are also reflected in Food Management.
      </p>
    </div>
  );
}

export default AvailabilityManagement;
