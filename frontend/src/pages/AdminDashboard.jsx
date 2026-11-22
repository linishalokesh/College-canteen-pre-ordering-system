
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserRoundCog,
  ShoppingBag,
  ChartNoAxesCombined,
  Search,
  Bell,
  ChevronDown,
  IndianRupee,
  Clock,
  CheckCircle2,
  Menu,
  X,
  Eye,
  Pencil,
  UserCheck,
  UserX,
  ArrowLeft
} from "lucide-react";

import "./admin-dashboard.css";
import grabbitLogo from "../assets/grabbit-logo.png";

// DEMO DATA

const initialStudents = [
  { id: "ST001", name: "Aarav Sharma", email: "aarav@gmail.com", orders: 12, status: "Active" },
  { id: "ST002", name: "Priya Nair", email: "priya@gmail.com", orders: 8, status: "Active" },
  { id: "ST003", name: "Rahul Kumar", email: "rahul@gmail.com", orders: 15, status: "Active" },
  { id: "ST004", name: "Sneha Rao", email: "sneha@gmail.com", orders: 4, status: "Inactive" },
  { id: "ST005", name: "Aditya Reddy", email: "aditya@gmail.com", orders: 9, status: "Active" }
];

const initialStaff = [
  { id: "SF001", name: "Ramesh Kumar", role: "Canteen Manager", status: "Active" },
  { id: "SF002", name: "Anita Rao", role: "Kitchen Staff", status: "Active" },
  { id: "SF003", name: "Suresh B", role: "Kitchen Staff", status: "Active" },
  { id: "SF004", name: "Meena S", role: "Canteen Manager", status: "Inactive" }
];

// Orders are connected to students using their unique IDs.

const orders = [
  { id: "#GR1024", studentId: "ST001", item: "Paneer Biryani", amount: 140, status: "Completed" },
  { id: "#GR1025", studentId: "ST002", item: "Veg Fried Rice", amount: 110, status: "Preparing" },
  { id: "#GR1026", studentId: "ST003", item: "Masala Dosa", amount: 65, status: "Ready" },
  { id: "#GR1027", studentId: "ST004", item: "Cold Coffee", amount: 80, status: "Received" },
  { id: "#GR1028", studentId: "ST005", item: "Burger", amount: 120, status: "Completed" }
];

const navigation = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Students", icon: Users },
  { name: "Staff", icon: UserRoundCog },
  { name: "Orders", icon: ShoppingBag },
  { name: "Reports", icon: ChartNoAxesCombined }
];

function AdminDashboard() {
  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [students, setStudents] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    email: ""
  });

  // GET THE LATEST STUDENT NAME USING STUDENT ID

  const getStudentName = studentId => {
    const student = students.find(student => student.id === studentId);
    return student ? student.name : "Unknown Student";
  };

  // SEARCH FILTERS

  const filteredStudents = students.filter(student =>
    `${student.name} ${student.email} ${student.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredStaff = initialStaff.filter(member =>
    `${member.name} ${member.role} ${member.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredOrders = orders.filter(order =>
    `${order.id} ${getStudentName(order.studentId)} ${order.item}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // STUDENT MANAGEMENT

  const openStudent = student => {
    setSelectedStudent(student);

    setEditForm({
      name: student.name,
      email: student.email
    });

    setEditingStudent(false);
  };

  // SAVE STUDENT DETAILS

  const saveStudent = () => {
    if (!editForm.name.trim() || !editForm.email.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedStudent = {
      ...selectedStudent,
      name: editForm.name.trim(),
      email: editForm.email.trim()
    };

    setStudents(previous =>
      previous.map(student =>
        student.id === selectedStudent.id
          ? updatedStudent
          : student
      )
    );

    setSelectedStudent(updatedStudent);
    setEditingStudent(false);
  };

  // ACTIVATE OR DEACTIVATE STUDENT

  const changeStudentStatus = () => {
    const updatedStatus =
      showConfirm.status === "Active" ? "Inactive" : "Active";

    const updatedStudent = {
      ...showConfirm,
      status: updatedStatus
    };

    setStudents(previous =>
      previous.map(student =>
        student.id === showConfirm.id
          ? updatedStudent
          : student
      )
    );

    if (selectedStudent?.id === showConfirm.id) {
      setSelectedStudent(updatedStudent);
    }

    setShowConfirm(null);
  };

  // TABLE COMPONENT

  const renderTable = (headers, rows) => (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length > 0 ? rows : (
            <tr>
              <td colSpan={headers.length} className="admin-empty">
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  // PAGE CONTENT

  const renderContent = () => {
    switch (activePage) {

      // STUDENTS SECTION

      case "Students":

        if (selectedStudent) {
          return (
            <section className="admin-panel-card student-detail">

              <button
                className="student-back"
                onClick={() => {
                  setSelectedStudent(null);
                  setEditingStudent(false);
                }}
              >
                <ArrowLeft size={16} /> Back to Students
              </button>

              <div className="admin-card-heading">
                <div>
                  <span className="admin-eyebrow">STUDENT PROFILE</span>
                  <h2>{selectedStudent.name}</h2>
                  <p>Student ID: {selectedStudent.id}</p>
                </div>

                <span className={`admin-status ${selectedStudent.status.toLowerCase()}`}>
                  {selectedStudent.status}
                </span>
              </div>

              {editingStudent ? (
                <div className="student-edit-form">

                  <label>
                    Student Name
                    <input
                      value={editForm.name}
                      onChange={e =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  </label>

                  <label>
                    Email Address
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={e =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                    />
                  </label>

                  <div className="student-actions">

                    <button
                      className="admin-action-btn save"
                      onClick={saveStudent}
                    >
                      Save Changes
                    </button>

                    <button
                      className="admin-action-btn cancel"
                      onClick={() => setEditingStudent(false)}
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              ) : (
                <>
                  <div className="student-detail-grid">

                    <div>
                      <span>Student ID</span>
                      <strong>{selectedStudent.id}</strong>
                    </div>

                    <div>
                      <span>Full Name</span>
                      <strong>{selectedStudent.name}</strong>
                    </div>

                    <div>
                      <span>Email Address</span>
                      <strong>{selectedStudent.email}</strong>
                    </div>

                    <div>
                      <span>Total Orders</span>
                      <strong>{selectedStudent.orders}</strong>
                    </div>

                    <div>
                      <span>Account Status</span>
                      <strong>{selectedStudent.status}</strong>
                    </div>

                  </div>

                  <div className="student-actions">

                    <button
                      className="admin-action-btn save"
                      onClick={() => setEditingStudent(true)}
                    >
                      <Pencil size={15} /> Edit Details
                    </button>

                    <button
                      className={`admin-action-btn ${
                        selectedStudent.status === "Active" ? "deactivate" : "activate"
                      }`}
                      onClick={() => setShowConfirm(selectedStudent)}
                    >
                      {selectedStudent.status === "Active"
                        ? <><UserX size={15} /> Deactivate Account</>
                        : <><UserCheck size={15} /> Activate Account</>
                      }
                    </button>

                  </div>
                </>
              )}

            </section>
          );
        }

        return (
          <section className="admin-panel-card">

            <div className="admin-card-heading">
              <div>
                <span className="admin-eyebrow">USER MANAGEMENT</span>
                <h2>Student Directory</h2>
                <p>View and manage registered students.</p>
              </div>
            </div>

            {renderTable(
              ["STUDENT ID", "NAME", "EMAIL", "ORDERS", "STATUS", "ACTIONS"],

              filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td className="admin-name">{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.orders}</td>

                  <td>
                    <span className={`admin-status ${student.status.toLowerCase()}`}>
                      {student.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="student-view-btn"
                      onClick={() => openStudent(student)}
                    >
                      <Eye size={15} /> View
                    </button>
                  </td>
                </tr>
              ))
            )}

          </section>
        );

      // STAFF SECTION

      case "Staff":

        return (
          <section className="admin-panel-card">

            <div className="admin-card-heading">
              <div>
                <span className="admin-eyebrow">WORKFORCE MANAGEMENT</span>
                <h2>Staff Directory</h2>
                <p>Monitor your canteen workforce.</p>
              </div>
            </div>

            {renderTable(
              ["STAFF ID", "NAME", "ROLE", "STATUS"],

              filteredStaff.map(member => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td className="admin-name">{member.name}</td>
                  <td>{member.role}</td>

                  <td>
                    <span className={`admin-status ${member.status.toLowerCase()}`}>
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))
            )}

          </section>
        );

      // ORDERS SECTION

      case "Orders":

        return (
          <section className="admin-panel-card">

            <div className="admin-card-heading">
              <div>
                <span className="admin-eyebrow">ORDER MONITORING</span>
                <h2>All Orders</h2>
                <p>Monitor orders across the application.</p>
              </div>
            </div>

            {renderTable(
              ["ORDER ID", "STUDENT", "ITEM", "AMOUNT", "STATUS"],

              filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>

                  <td className="admin-name">
                    {getStudentName(order.studentId)}
                  </td>

                  <td>{order.item}</td>
                  <td>₹{order.amount}</td>

                  <td>
                    <span className={`admin-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}

          </section>
        );

      // REPORTS SECTION

      case "Reports":

        return (
          <>
            <section className="admin-panel-card">

              <span className="admin-eyebrow">PERFORMANCE OVERVIEW</span>
              <h2>Reports & Analytics</h2>
              <p>Application performance at a glance.</p>

              <div className="report-grid">
                <div>
                  <span>Total Sales</span>
                  <h2>₹24,850</h2>
                </div>

                <div>
                  <span>Total Orders</span>
                  <h2>186</h2>
                </div>

                <div>
                  <span>Average Order Value</span>
                  <h2>₹133</h2>
                </div>
              </div>

            </section>

            <section className="admin-panel-card">

              <span className="admin-eyebrow">FOOD INSIGHTS</span>
              <h2>Popular Food Items</h2>

              <div className="popular-food">
                <span>Paneer Biryani</span>
                <strong>42 orders</strong>
              </div>

              <div className="popular-food">
                <span>Masala Dosa</span>
                <strong>36 orders</strong>
              </div>

              <div className="popular-food">
                <span>Veg Fried Rice</span>
                <strong>29 orders</strong>
              </div>

            </section>
          </>
        );

      // OVERVIEW SECTION

      default:

        return (
          <>
            <div className="admin-stats">

              <div className="admin-stat-card">
                <div className="admin-stat-icon green">
                  <Users />
                </div>
                <span>Total Students</span>
                <h2>1,248</h2>
                <small>Registered students</small>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon orange">
                  <UserRoundCog />
                </div>
                <span>Total Staff</span>
                <h2>24</h2>
                <small>Across all canteens</small>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon yellow">
                  <ShoppingBag />
                </div>
                <span>Total Orders</span>
                <h2>186</h2>
                <small>Today's orders</small>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon purple">
                  <IndianRupee />
                </div>
                <span>Total Revenue</span>
                <h2>₹24,850</h2>
                <small>Today's sales</small>
              </div>

            </div>

            <div className="admin-content-grid">

              <section className="admin-panel-card">

                <div className="admin-card-heading">
                  <div>
                    <span className="admin-eyebrow">APPLICATION ACTIVITY</span>
                    <h2>Recent Orders</h2>
                  </div>

                  <button onClick={() => setActivePage("Orders")}>
                    View all →
                  </button>
                </div>

                {orders.slice(0, 4).map(order => (
                  <div className="admin-order-row" key={order.id}>

                    <div className="order-icon">
                      <ShoppingBag size={18} />
                    </div>

                    <div className="order-details">
                      <strong>
                        {getStudentName(order.studentId)}
                      </strong>

                      <span>{order.item}</span>
                    </div>

                    <div className="order-amount">
                      <strong>₹{order.amount}</strong>
                      <span>{order.status}</span>
                    </div>

                  </div>
                ))}

              </section>

              <section className="admin-panel-card">

                <span className="admin-eyebrow">QUICK OVERVIEW</span>
                <h2>Platform Health</h2>

                <div className="health-item">
                  <CheckCircle2 />
                  <div>
                    <strong>Student accounts</strong>
                    <span>Active and operational</span>
                  </div>
                </div>

                <div className="health-item">
                  <CheckCircle2 />
                  <div>
                    <strong>Canteen operations</strong>
                    <span>Running smoothly</span>
                  </div>
                </div>

                <div className="health-item">
                  <Clock />
                  <div>
                    <strong>Pending orders</strong>
                    <span>Require monitoring</span>
                  </div>
                </div>

              </section>

            </div>
          </>
        );
    }
  };

  // MAIN DASHBOARD

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}

      <aside className={`admin-sidebar ${mobileMenu ? "open" : ""}`}>

        <div className="admin-brand">
          <img src={grabbitLogo} alt="Grabbit Logo" />

          <button
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        <p className="sidebar-label">MAIN MENU</p>

        <nav>
          {navigation.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`admin-nav-item ${activePage === item.name ? "active" : ""}`}
                onClick={() => {
                  setActivePage(item.name);
                  setSearch("");
                  setSelectedStudent(null);
                  setEditingStudent(false);
                  setMobileMenu(false);
                }}
              >
                <Icon size={19} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="admin-profile">
            <div className="profile-avatar">A</div>

            <div>
              <strong>Administrator</strong>
              <span>System Admin</span>
            </div>
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="admin-main">

        <header className="admin-topbar">

          <button
            className="mobile-menu"
            onClick={() => setMobileMenu(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>

          <div className="admin-page-title">
            <span className="admin-eyebrow">GRABBIT / MANAGEMENT</span>
            <h1>{activePage}</h1>
          </div>

          <div className="admin-top-actions">

            <div className="admin-search">
              <Search size={17} />

              <input
                placeholder={`Search ${activePage.toLowerCase()}...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <button
              className="notification-button"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </button>

            <div className="top-profile">
              <div className="profile-avatar">A</div>
              <ChevronDown size={15} />
            </div>

          </div>

        </header>

        <div className="admin-page-content">

          <div className="admin-welcome">
            <div>
              <span className="admin-eyebrow">GOOD FOOD. ZERO WAITING.</span>
              <h2>Welcome back, <span>Admin!</span></h2>
              <p>Here's what's happening across Grabbit today.</p>
            </div>
          </div>

          {renderContent()}

          <footer className="admin-footer">
            GRABBIT ADMIN PANEL · MADE WITH CARE ♡
          </footer>

        </div>

      </main>

      {/* STATUS CONFIRMATION MODAL */}

      {showConfirm && (
        <div className="admin-modal-overlay">

          <div className="admin-confirm-modal">

            <h2>
              {showConfirm.status === "Active"
                ? "Deactivate Student?"
                : "Activate Student?"}
            </h2>

            <p>
              Are you sure you want to{" "}
              {showConfirm.status === "Active" ? "deactivate" : "activate"}{" "}
              {showConfirm.name}'s account?
            </p>

            <div className="student-actions">

              <button
                className="admin-action-btn cancel"
                onClick={() => setShowConfirm(null)}
              >
                Cancel
              </button>

              <button
                className={`admin-action-btn ${
                  showConfirm.status === "Active" ? "deactivate" : "activate"
                }`}
                onClick={changeStudentStatus}
              >
                Confirm
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminDashboard;