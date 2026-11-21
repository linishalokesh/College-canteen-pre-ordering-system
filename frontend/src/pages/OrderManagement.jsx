
import { useState } from "react";
import {
  Search, ClipboardList, Clock, CheckCircle2,
  XCircle, ArrowRight
} from "lucide-react";
import { useCanteenData } from "../context/CanteenDataContext";

function OrderManagement() {
  const { orders, updateOrderStatus } = useCanteenData();
  const [search, setSearch] = useState("");

  const activeOrders = orders.filter(order =>
    !["Completed", "Rejected"].includes(order.status)
  );

  const filteredOrders = activeOrders.filter(order =>
    `${order.id} ${order.customer} ${order.items}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const received = orders.filter(order => order.status === "Received").length;
  const preparing = orders.filter(order => order.status === "Preparing").length;
  const ready = orders.filter(order => order.status === "Ready").length;

  const advanceOrder = order => {
    const nextStatus = {
      Received: "Preparing",
      Preparing: "Ready",
      Ready: "Completed"
    };

    updateOrderStatus(order.id, nextStatus[order.status]);
  };

  return (
    <div className="om-page">
      <section className="om-heading">
        <div>
          <span className="date-label">THE KITCHEN IS IN MOTION</span>
          <h1>Order <span>Management.</span></h1>
          <p>Every order, every little detail, all in one place.</p>
        </div>
      </section>

      <section className="om-stats">
        <div className="om-stat">
          <div className="om-stat-icon om-peach"><ClipboardList size={20}/></div>
          <span>New orders</span>
          <strong>{received}</strong>
        </div>

        <div className="om-stat">
          <div className="om-stat-icon om-yellow"><Clock size={20}/></div>
          <span>Being prepared</span>
          <strong>{preparing}</strong>
        </div>

        <div className="om-stat">
          <div className="om-stat-icon om-sage"><CheckCircle2 size={20}/></div>
          <span>Ready for pickup</span>
          <strong>{ready}</strong>
        </div>
      </section>

      <section className="om-orders">
        <div className="om-orders-heading">
          <div>
            <span className="eyebrow">KITCHEN QUEUE</span>
            <h2>Incoming orders</h2>
          </div>

          <div className="om-search">
            <Search size={16}/>
            <input
              placeholder="Search orders..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="om-order-list">
          {filteredOrders.map(order => (
            <article className="om-order-card" key={order.id}>
              <div className="om-order-top">
                <div>
                  <span className="om-order-id">#{order.id}</span>
                  <h3>{order.customer}</h3>
                  <span className="om-order-time">{order.date} · {order.time}</span>
                </div>

                <span className={`om-badge om-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="om-order-details">
                <span>{order.items}</span>
                <strong>₹{order.total}</strong>
              </div>

              <div className="om-order-actions">
                {order.status === "Received" && (
                  <>
                    <button
                      className="om-reject"
                      onClick={() => updateOrderStatus(order.id, "Rejected")}
                    >
                      <XCircle size={15}/> Reject
                    </button>

                    <button
                      className="om-advance"
                      onClick={() => advanceOrder(order)}
                    >
                      Accept order <ArrowRight size={15}/>
                    </button>
                  </>
                )}

                {order.status === "Preparing" && (
                  <button
                    className="om-advance"
                    onClick={() => advanceOrder(order)}
                  >
                    Mark as Ready <ArrowRight size={15}/>
                  </button>
                )}

                {order.status === "Ready" && (
                  <button
                    className="om-advance"
                    onClick={() => advanceOrder(order)}
                  >
                    Complete order <CheckCircle2 size={15}/>
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="om-empty">
            <ClipboardList size={30}/>
            <h3>No active orders</h3>
            <p>New orders will appear here.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default OrderManagement;
