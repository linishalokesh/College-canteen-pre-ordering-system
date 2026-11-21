
import { useState } from "react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tags,
  ClipboardList,
  History,
  Settings,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  Clock,
  ShoppingBag,
  IndianRupee,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  ToggleLeft
} from "lucide-react";

import FoodManagement from "./pages/FoodManagement";
import CategoryManagement from "./pages/CategoryManagement";
import AvailabilityManagement from "./pages/AvailabilityManagement";
import OrderManagement from "./pages/OrderManagement";
import OrderHistory from "./pages/OrderHistory";

import { useCanteenData } from "./context/CanteenDataContext";

import "./App.css";
import "./styles/canteen-theme.css";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Food Management", icon: UtensilsCrossed },
  { name: "Categories", icon: Tags },
  { name: "Availability", icon: ToggleLeft },
  { name: "Order Management", icon: ClipboardList },
  { name: "Order History", icon: History }
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState(true);

  const { foods, orders } = useCanteenData();

  const activeOrders = orders.filter(order =>
    ["Received", "Preparing", "Ready"].includes(order.status)
  );

  const completedOrders = orders.filter(
    order => order.status === "Completed"
  );

  const totalRevenue = completedOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const filteredOrders = orders
    .filter(order =>
      `${order.id} ${order.customer} ${order.items}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .slice(0, 4);

  const popularItems = foods.slice(0, 3).map((food, index) => ({
    ...food,
    sold: [42, 36, 29][index] || 0,
    color: ["peach", "sage", "lavender"][index] || "sage"
  }));

  const renderPage = () => {
    switch (activePage) {
      case "Food Management":
        return <FoodManagement />;

      case "Categories":
        return <CategoryManagement />;

      case "Availability":
        return <AvailabilityManagement />;

      case "Order Management":
        return <OrderManagement />;

      case "Order History":
        return <OrderHistory />;

      case "Settings":
        return (
          <div className="panel">
            <h2>Settings</h2>
            <p>Settings management will be added here.</p>
          </div>
        );

      default:
        return (
          <>
            <section className="welcome-section">
              <div>
                <div className="date-label">
                  SATURDAY, NOVEMBER 21
                </div>

                <h1>
                  Good morning, <span>Chef!</span>{" "}
                  <span className="wave">✳</span>
                </h1>

                <p>
                  Here's what's happening in your kitchen today.
                </p>
              </div>

              <button
                className="primary-button"
                onClick={() => setActivePage("Food Management")}
              >
                <UtensilsCrossed size={17} />
                Manage Menu
              </button>
            </section>

            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-top">
                  <span>Total Orders</span>
                  <div className="stat-icon sage-icon">
                    <ShoppingBag size={19} />
                  </div>
                </div>
                <h2>{orders.length}</h2>
                <div className="stat-foot">
                  <span className="positive">
                    <TrendingUp size={14} /> Today's orders
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>Today's Revenue</span>
                  <div className="stat-icon peach-icon">
                    <IndianRupee size={19} />
                  </div>
                </div>
                <h2>₹{totalRevenue.toLocaleString("en-IN")}</h2>
                <div className="stat-foot">
                  <span className="positive">
                    Completed order value
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>Active Orders</span>
                  <div className="stat-icon yellow-icon">
                    <Clock size={19} />
                  </div>
                </div>
                <h2>{activeOrders.length}</h2>
                <div className="stat-foot">
                  <span className="neutral">
                    Needs attention
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>Completed Orders</span>
                  <div className="stat-icon lavender-icon">
                    <CheckCircle2 size={19} />
                  </div>
                </div>
                <h2>{completedOrders.length}</h2>
                <div className="stat-foot">
                  <span className="positive">
                    Successfully completed
                  </span>
                </div>
              </div>
            </section>

            <section className="content-grid">
              <div className="panel orders-panel">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">YOUR KITCHEN</span>
                    <h2>
                      Recent orders{" "}
                      <span className="heading-count">
                        {String(filteredOrders.length).padStart(2, "0")}
                      </span>
                    </h2>
                  </div>

                  <button
                    className="text-button"
                    onClick={() => setActivePage("Order Management")}
                  >
                    View all <ArrowUpRight size={15} />
                  </button>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ORDER</th>
                        <th>CUSTOMER</th>
                        <th>ITEM</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredOrders.map(order => (
                        <tr key={order.id}>
                          <td className="order-id">#{order.id}</td>
                          <td>{order.customer}</td>
                          <td>{order.items}</td>
                          <td className="amount">₹{order.total}</td>
                          <td>
                            <span className={`status status-${order.status.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="more-button"
                              onClick={() => setActivePage("Order Management")}
                            >
                              <MoreHorizontal size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredOrders.length === 0 && (
                    <p className="empty-state">
                      No matching orders found.
                    </p>
                  )}
                </div>
              </div>

              <div className="panel menu-panel">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">CUSTOMER FAVOURITES</span>
                    <h2>Popular picks</h2>
                  </div>

                  <button className="more-button">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="popular-list">
                  {popularItems.map(item => (
                    <div className="popular-item" key={item.id}>
                      <div className={`food-emoji ${item.color}`}>
                        {item.image ? (
                          <img
                            className="popular-food-photo"
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                          />
                        ) : item.emoji}
                      </div>

                      <div className="food-details">
                        <strong>{item.name}</strong>
                        <span>
                          {item.category} · ₹{item.price}
                        </span>
                      </div>

                      <div className="sold-count">
                        <strong>{item.sold}</strong>
                        <span>sold</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="menu-link"
                  onClick={() => setActivePage("Food Management")}
                >
                  Explore full menu <ArrowUpRight size={16} />
                </button>
              </div>
            </section>

            <footer className="footer">
              <span>Made with care, served with love ♡</span>
              <span>GRABBIT CANTEEN PANEL · 2026</span>
            </footer>
          </>
        );
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">m</div>
          <div>
            <h2>GRABBIT<span>.</span></h2>
            <p>CANTEEN MANAGEMENT</p>
          </div>
        </div>

        <div className="sidebar-label">MENU</div>

        <nav className="navigation">
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${activePage === name ? "active" : ""}`}
              onClick={() => setActivePage(name)}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{name}</span>

              {name === "Order Management" && (
                <span className="nav-count">
                  {activeOrders.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-label">PREFERENCES</div>

          <button
            className={`nav-item ${activePage === "Settings" ? "active" : ""}`}
            onClick={() => setActivePage("Settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="canteen-card">
            <div className="canteen-avatar">🍃</div>
            <div>
              <strong>Campus Kitchen</strong>
              <p>Open for orders</p>
            </div>
            <span className="online-dot" />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-divider">/</span>
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <Search size={17} />
              <input
                placeholder="Search orders..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <kbd>⌘ K</kbd>
            </div>

            <button
              className="icon-button notification-button"
              onClick={() => setNotifications(!notifications)}
              aria-label="Toggle notifications"
            >
              <Bell size={19} />
              {notifications && <span className="notification-dot" />}
            </button>

            <div className="profile">
              <div className="profile-avatar">CK</div>
              <div className="profile-info">
                <strong>Campus Kitchen</strong>
                <span>Administrator</span>
              </div>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <div className="page-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
