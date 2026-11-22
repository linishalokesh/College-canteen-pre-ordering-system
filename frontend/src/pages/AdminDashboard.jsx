
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
  ArrowLeft,
  Plus,
  Filter
} from "lucide-react";

import "../styles/admin-dashboard.css";
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
  { id: "SF001", name: "Ramesh Kumar", email: "ramesh@gmail.com", role: "Canteen Manager", status: "Active" },
  { id: "SF002", name: "Anita Rao", email: "anita@gmail.com", role: "Kitchen Staff", status: "Active" },
  { id: "SF003", name: "Suresh B", email: "suresh@gmail.com", role: "Kitchen Staff", status: "Active" },
  { id: "SF004", name: "Meena S", email: "meena@gmail.com", role: "Canteen Manager", status: "Inactive" }
];

// DEMO ORDERS

const initialOrders = [
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
  const [statusFilter, setStatusFilter] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [students, setStudents] = useState(initialStudents);
  const [staff, setStaff] = useState(initialStaff);
  const [orders] = useState(initialOrders);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [editingStudent, setEditingStudent] = useState(false);
  const [editingStaff, setEditingStaff] = useState(false);
  const [showStaffForm, setShowStaffForm] = useState(false);

  const [showConfirm, setShowConfirm] = useState(null);

  const [studentForm, setStudentForm] = useState({
    name: "",
    email: ""
  });

  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    role: "Kitchen Staff"
  });

  // STUDENT NAME LOOKUP

  const getStudentName = studentId => {
    const student = students.find(student => student.id === studentId);
    return student ? student.name : "Unknown Student";
  };

  // SEARCH AND FILTERING

  const matchesSearch = text =>
    text.toLowerCase().includes(search.trim().toLowerCase());

  const filteredStudents = students.filter(student => {
    const matchesText = matchesSearch(
      `${student.name} ${student.email} ${student.id}`
    );

    const matchesStatus =
      statusFilter === "All" || student.status === statusFilter;

    return matchesText && matchesStatus;
  });

  const filteredStaff = staff.filter(member => {
    const matchesText = matchesSearch(
      `${member.name} ${member.email} ${member.role} ${member.id}`
    );

    const matchesStatus =
      statusFilter === "All" || member.status === statusFilter;

    return matchesText && matchesStatus;
  });

  const filteredOrders = orders.filter(order => {
    const matchesText = matchesSearch(
      `${order.id} ${getStudentName(order.studentId)} ${order.item} ${order.status}`
    );

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesText && matchesStatus;
  });

  // FORM VALIDATION

  const isValidEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isDuplicateEmail = (email, records, currentId = null) =>
    records.some(record =>
      record.email.toLowerCase() === email.toLowerCase() &&
      record.id !== currentId
    );

  // STUDENT MANAGEMENT

  const openStudent = student => {
    setSelectedStudent(student);

    setStudentForm({
      name: student.name,
      email: student.email
    });

    setEditingStudent(false);
  };

  const saveStudent = () => {
    const name = studentForm.name.trim();
    const email = studentForm.email.trim();

    if (!name || !email) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (isDuplicateEmail(email, students, selectedStudent.id)) {
      alert("This email address is already registered.");
      return;
    }

    const updatedStudent = {
      ...selectedStudent,
      name,
      email
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

    alert("Student details updated successfully.");
  };

  // STAFF MANAGEMENT

  const openStaff = member => {
    setSelectedStaff(member);

    setStaffForm({
      name: member.name,
      email: member.email,
      role: member.role
    });

    setEditingStaff(false);
  };

  const resetStaffForm = () => {
    setStaffForm({
      name: "",
      email: "",
      role: "Kitchen Staff"
    });

    setShowStaffForm(false);
    setEditingStaff(false);
    setSelectedStaff(null);
  };

  const saveStaff = () => {
    const name = staffForm.name.trim();
    const email = staffForm.email.trim();
    const role = staffForm.role;

    if (!name || !email || !role) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const currentId = editingStaff ? selectedStaff.id : null;

    if (isDuplicateEmail(email, staff, currentId)) {
      alert("A staff member with this email already exists.");
      return;
    }

    if (editingStaff) {
      const updatedStaff = {
        ...selectedStaff,
        name,
        email,
        role
      };

      setStaff(previous =>
        previous.map(member =>
          member.id === selectedStaff.id
            ? updatedStaff
            : member
        )
      );

      setSelectedStaff(updatedStaff);
      setEditingStaff(false);

      alert("Staff details updated successfully.");
    } else {
      const nextNumber =
        staff.reduce((maximum, member) => {
          const number = Number(member.id.replace("SF", ""));
          return Math.max(maximum, number);
        }, 0) + 1;

      const newStaff = {
        id: `SF${String(nextNumber).padStart(3, "0")}`,
        name,
        email,
        role,
        status: "Active"
      };

      setStaff(previous => [...previous, newStaff]);

      resetStaffForm();

      alert("New staff member added successfully.");
    }
  };

  // ACCOUNT STATUS MANAGEMENT

  const changeAccountStatus = () => {
    if (!showConfirm) return;

    const updatedStatus =
      showConfirm.status === "Active" ? "Inactive" : "Active";

    if (showConfirm.type === "Student") {
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
    } else {
      const updatedMember = {
        ...showConfirm,
        status: updatedStatus
      };

      setStaff(previous =>
        previous.map(member =>
          member.id === showConfirm.id
            ? updatedMember
            : member
        )
      );

      if (selectedStaff?.id === showConfirm.id) {
        setSelectedStaff(updatedMember);
      }
    }

    setShowConfirm(null);
  };

  // DYNAMIC DASHBOARD STATISTICS

  const totalStudents = students.length;
  const totalStaff = staff.length;
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (total, order) => total + order.amount,
    0
  );

  const pendingOrders = orders.filter(order =>
    ["Received", "Preparing"].includes(order.status)
  ).length;

  const completedOrders = orders.filter(
    order => order.status === "Completed"
  ).length;

  // DYNAMIC REPORT CALCULATIONS

  const averageOrderValue =
    totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const popularItems = Object.values(
    orders.reduce((items, order) => {
      if (!items[order.item]) {
        items[order.item] = {
          name: order.item,
          count: 0
        };
      }

      items[order.item].count += 1;

      return items;
    }, {})
  ).sort((a, b) => b.count - a.count);

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

  // SEARCH AND STATUS FILTER CONTROLS

  const renderFilters = statuses => (
    <div className="admin-filter-row">
      <Filter size={16} />

      <select
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
        aria-label="Filter by status"
      >
        {statuses.map(status => (
          <option key={status} value={status}>
            {status === "All" ? "All Statuses" : status}
          </option>
        ))}
      </select>
    </div>
  );

  // PAGE CONTENT

  const renderContent = () => {
    switch (activePage) {

      // STUDENTS

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
                      value={studentForm.name}
                      onChange={e =>
                        setStudentForm({
                          ...studentForm,
                          name: e.target.value
                        })
                      }
                    />
                  </label>

                  <label>
                    Email Address
                    <input
                      type="email"
                      value={studentForm.email}
                      onChange={e =>
                        setStudentForm({
                          ...studentForm,
                          email: e.target.value
                        })
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
                        selectedStudent.status === "Active"
                          ? "deactivate"
                          : "activate"
                      }`}
                      onClick={() =>
                        setShowConfirm({
                          ...selectedStudent,
                          type: "Student"
                        })
                      }
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

            {renderFilters(["All", "Active", "Inactive"])}

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

      // STAFF

      case "Staff":

        if (selectedStaff) {
          return (
            <section className="admin-panel-card student-detail">

              <button
                className="student-back"
                onClick={() => {
                  setSelectedStaff(null);
                  setEditingStaff(false);
                }}
              >
                <ArrowLeft size={16} /> Back to Staff
              </button>

              <div className="admin-card-heading">
                <div>
                  <span className="admin-eyebrow">STAFF PROFILE</span>
                  <h2>{selectedStaff.name}</h2>
                  <p>Staff ID: {selectedStaff.id}</p>
                </div>

                <span className={`admin-status ${selectedStaff.status.toLowerCase()}`}>
                  {selectedStaff.status}
                </span>
              </div>

              {editingStaff ? (
                <div className="student-edit-form">

                  <label>
                    Full Name
                    <input
                      value={staffForm.name}
                      onChange={e =>
                        setStaffForm({
                          ...staffForm,
                          name: e.target.value
                        })
                      }
                    />
                  </label>

                  <label>
                    Email Address
                    <input
                      type="email"
                      value={staffForm.email}
                      onChange={e =>
                        setStaffForm({
                          ...staffForm,
                          email: e.target.value
                        })
                      }
                    />
                  </label>

                  <label>
                    Staff Role
                    <select
                      value={staffForm.role}
                      onChange={e =>
                        setStaffForm({
                          ...staffForm,
                          role: e.target.value
                        })
                      }
                    >
                      <option value="Canteen Manager">Canteen Manager</option>
                      <option value="Kitchen Staff">Kitchen Staff</option>
                    </select>
                  </label>

                  <div className="student-actions">
                    <button
                      className="admin-action-btn save"
                      onClick={saveStaff}
                    >
                      Save Changes
                    </button>

                    <button
                      className="admin-action-btn cancel"
                      onClick={() => setEditingStaff(false)}
                    >
                      Cancel
                    </button>
                  </div>

                </div>
              ) : (
                <>
                  <div className="student-detail-grid">

                    <div>
                      <span>Staff ID</span>
                      <strong>{selectedStaff.id}</strong>
                    </div>

                    <div>
                      <span>Full Name</span>
                      <strong>{selectedStaff.name}</strong>
                    </div>

                    <div>
                      <span>Email Address</span>
                      <strong>{selectedStaff.email}</strong>
                    </div>

                    <div>
                      <span>Role</span>
                      <strong>{selectedStaff.role}</strong>
                    </div>

                    <div>
                      <span>Account Status</span>
                      <strong>{selectedStaff.status}</strong>
                    </div>

                  </div>

                  <div className="student-actions">

                    <button
                      className="admin-action-btn save"
                      onClick={() => {
                        setStaffForm({
                          name: selectedStaff.name,
                          email: selectedStaff.email,
                          role: selectedStaff.role
                        });
                        setEditingStaff(true);
                      }}
                    >
                      <Pencil size={15} /> Edit Details
                    </button>

                    <button
                      className={`admin-action-btn ${
                        selectedStaff.status === "Active"
                          ? "deactivate"
                          : "activate"
                      }`}
                      onClick={() =>
                        setShowConfirm({
                          ...selectedStaff,
                          type: "Staff"
                        })
                      }
                    >
                      {selectedStaff.status === "Active"
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
                <span className="admin-eyebrow">WORKFORCE MANAGEMENT</span>
                <h2>Staff Directory</h2>
                <p>Add and manage canteen staff members.</p>
              </div>

              <button
                className="admin-action-btn save"
                onClick={() => {
                  setShowStaffForm(true);
                  setSelectedStaff(null);
                }}
              >
                <Plus size={16} /> Add Staff
              </button>
            </div>

            {showStaffForm && (
              <div className="admin-panel-card">
                <h2>Add New Staff Member</h2>

                <div className="student-edit-form">

                  <label>
                    Full Name
                    <input
                      value={staffForm.name}
                      onChange={e =>
                        setStaffForm({
                          ...staffForm,
                          name: e.target.value
                        })
                      }
                      placeholder="Enter staff name"
                    />
                  </label>

                  <label>
                    Email Address
                    <input
                      type="email"
                      value={staffForm.email}
                      onChange={e =>
                        setStaffForm({
                          ...staffForm,
                          email: e.target.value
                        })
                      }
                      placeholder="Enter email address"
                    />
                  </label>

                  <label>
                    Staff Role
                    <select
                      value={staffForm.role}
                      onChange={e =>
                        setStaffForm({
                          ...staffForm,
                          role: e.target.value
                        })
                      }
                    >
                      <option value="Canteen Manager">Canteen Manager</option>
                      <option value="Kitchen Staff">Kitchen Staff</option>
                    </select>
                  </label>

                  <div className="student-actions">
                    <button
                      className="admin-action-btn save"
                      onClick={saveStaff}
                    >
                      Add Staff Member
                    </button>

                    <button
                      className="admin-action-btn cancel"
                      onClick={resetStaffForm}
                    >
                      Cancel
                    </button>
                  </div>

                </div>
              </div>
            )}

            {renderFilters(["All", "Active", "Inactive"])}

            {renderTable(
              ["STAFF ID", "NAME", "EMAIL", "ROLE", "STATUS", "ACTIONS"],

              filteredStaff.map(member => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td className="admin-name">{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>

                  <td>
                    <span className={`admin-status ${member.status.toLowerCase()}`}>
                      {member.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="student-view-btn"
                      onClick={() => openStaff(member)}
                    >
                      <Eye size={15} /> View
                    </button>
                  </td>
                </tr>
              ))
            )}

          </section>
        );

      // ORDERS

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

            {renderFilters([
              "All",
              "Received",
              "Preparing",
              "Ready",
              "Completed"
            ])}

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

      // REPORTS

      case "Reports":

        return (
          <>
            <section className="admin-panel-card">

              <span className="admin-eyebrow">PERFORMANCE OVERVIEW</span>
              <h2>Reports & Analytics</h2>
              <p>Statistics calculated from the available order records.</p>

              <div className="report-grid">

                <div>
                  <span>Total Sales</span>
                  <h2>₹{totalRevenue.toLocaleString("en-IN")}</h2>
                </div>

                <div>
                  <span>Total Orders</span>
                  <h2>{totalOrders}</h2>
                </div>

                <div>
                  <span>Average Order Value</span>
                  <h2>
                    ₹{averageOrderValue.toFixed(2)}
                  </h2>
                </div>

                <div>
                  <span>Completed Orders</span>
                  <h2>{completedOrders}</h2>
                </div>

                <div>
                  <span>Pending Orders</span>
                  <h2>{pendingOrders}</h2>
                </div>

              </div>

            </section>

            <section className="admin-panel-card">

              <span className="admin-eyebrow">FOOD INSIGHTS</span>
              <h2>Popular Food Items</h2>

              {popularItems.length > 0 ? (
                popularItems.map(item => (
                  <div className="popular-food" key={item.name}>
                    <span>{item.name}</span>
                    <strong>{item.count} orders</strong>
                  </div>
                ))
              ) : (
                <p>No order data available.</p>
              )}

            </section>
          </>
        );

      // OVERVIEW

      default:

        return (
          <>
            <div className="admin-stats">

              <div className="admin-stat-card">
                <div className="admin-stat-icon green">
                  <Users />
                </div>
                <span>Total Students</span>
                <h2>{totalStudents}</h2>
                <small>Registered students</small>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon orange">
                  <UserRoundCog />
                </div>
                <span>Total Staff</span>
                <h2>{totalStaff}</h2>
                <small>Registered staff members</small>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon yellow">
                  <ShoppingBag />
                </div>
                <span>Total Orders</span>
                <h2>{totalOrders}</h2>
                <small>Available order records</small>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon purple">
                  <IndianRupee />
                </div>
                <span>Total Revenue</span>
                <h2>₹{totalRevenue.toLocaleString("en-IN")}</h2>
                <small>Calculated from order records</small>
              </div>

            </div>

            <div className="admin-content-grid">

              <section className="admin-panel-card">

                <div className="admin-card-heading">
                  <div>
                    <span className="admin-eyebrow">APPLICATION ACTIVITY</span>
                    <h2>Recent Orders</h2>
                  </div>

                  <button onClick={() => {
                    setActivePage("Orders");
                    setSearch("");
                    setStatusFilter("All");
                  }}>
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
                    <span>{students.filter(student => student.status === "Active").length} active accounts</span>
                  </div>
                </div>

                <div className="health-item">
                  <CheckCircle2 />
                  <div>
                    <strong>Staff accounts</strong>
                    <span>{staff.filter(member => member.status === "Active").length} active staff members</span>
                  </div>
                </div>

                <div className="health-item">
                  <Clock />
                  <div>
                    <strong>Pending orders</strong>
                    <span>{pendingOrders} orders require monitoring</span>
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
                  setStatusFilter("All");
                  setSelectedStudent(null);
                  setSelectedStaff(null);
                  setEditingStudent(false);
                  setEditingStaff(false);
                  setShowStaffForm(false);
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
            GRABBIT ADMIN PANEL
          </footer>

        </div>

      </main>

      {/* ACCOUNT STATUS CONFIRMATION */}

      {showConfirm && (
        <div className="admin-modal-overlay">

          <div className="admin-confirm-modal">

            <h2>
              {showConfirm.status === "Active"
                ? `Deactivate ${showConfirm.type}?`
                : `Activate ${showConfirm.type}?`}
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
                  showConfirm.status === "Active"
                    ? "deactivate"
                    : "activate"
                }`}
                onClick={changeAccountStatus}
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