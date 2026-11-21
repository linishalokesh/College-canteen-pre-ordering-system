
import { useState } from "react";
import { Search, History, CheckCircle2, XCircle, IndianRupee } from "lucide-react";
import { useCanteenData } from "../context/CanteenDataContext";

function OrderHistory() {
  const { orders } = useCanteenData();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const historyOrders = orders.filter(order =>
    ["Completed", "Rejected"].includes(order.status)
  );

  const filteredOrders = historyOrders.filter(order => {
    const matchesSearch =
      `${order.id} ${order.customer} ${order.items}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || order.status === filter;

    return matchesSearch && matchesFilter;
  });

  const completed = historyOrders.filter(order => order.status === "Completed");
  const rejected = historyOrders.filter(order => order.status === "Rejected");
  const revenue = completed.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="oh-page">
      <section className="oh-heading">
        <div>
          <span className="date-label">A LITTLE LOOK BACK</span>
          <h1>Order <span>History.</span></h1>
          <p>Every order tells a little story. Here's yours.</p>
        </div>
      </section>

      <section className="oh-stats">
        <div className="oh-stat">
          <div className="oh-stat-icon oh-sage"><History size={20}/></div>
          <div><span>Total processed</span><strong>{historyOrders.length}</strong></div>
        </div>

        <div className="oh-stat">
          <div className="oh-stat-icon oh-green"><CheckCircle2 size={20}/></div>
          <div><span>Completed orders</span><strong>{completed.length}</strong></div>
        </div>

        <div className="oh-stat">
          <div className="oh-stat-icon oh-pink"><XCircle size={20}/></div>
          <div><span>Rejected orders</span><strong>{rejected.length}</strong></div>
        </div>

        <div className="oh-stat">
          <div className="oh-stat-icon oh-yellow"><IndianRupee size={20}/></div>
          <div><span>Completed order value</span><strong>₹{revenue.toLocaleString("en-IN")}</strong></div>
        </div>
      </section>

      <section className="oh-catalog">
        <div className="oh-catalog-heading">
          <div>
            <span className="eyebrow">YOUR ORDER ARCHIVE</span>
            <h2>Past transactions</h2>
          </div>

          <div className="oh-search">
            <Search size={16}/>
            <input
              placeholder="Search order or customer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="oh-filters">
          {["All", "Completed", "Rejected"].map(item => (
            <button
              key={item}
              className={filter === item ? "oh-filter active" : "oh-filter"}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="oh-table-wrapper">
          <table className="oh-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>ORDER DETAILS</th>
                <th>DATE & TIME</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="oh-id">#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.items}</td>
                  <td>
                    <div className="oh-date">
                      <strong>{order.date}</strong>
                      <span>{order.time}</span>
                    </div>
                  </td>
                  <td className="oh-amount">₹{order.total}</td>
                  <td>
                    <span className={`oh-status ${order.status === "Completed" ? "oh-completed" : "oh-rejected"}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="oh-empty">
              <History size={30}/>
              <h3>No past orders found</h3>
              <p>Completed and rejected orders will appear here.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default OrderHistory;

