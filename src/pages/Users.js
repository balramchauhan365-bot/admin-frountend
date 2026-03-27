import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://backend-addmin-2.onrender.com/users";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      setUsers(data || []);   // ✅ FIX

    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");

      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  const setEditUser = (user) => {
    localStorage.setItem("editUser", JSON.stringify(user));
    navigate("/add-user");
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading users...</p>;

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ color: "white" }}>Admin</h2>
        <button style={styles.sideBtn} onClick={() => navigate("/")}>Dashboard</button>
        <button style={styles.sideBtn} onClick={() => navigate("/users")}>Users</button>
        <button style={styles.sideBtn} onClick={() => navigate("/products")}>Products</button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.header}>
          <h2>Users</h2>
          <button style={styles.addBtn} onClick={() => navigate("/add-user")}>
            + Add User
          </button>
        </div>

        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} style={styles.row}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span style={styles.status}>Active</span>
                  </td>
                  <td>
                    <button style={styles.editBtn} onClick={() => setEditUser(u)}>
                      Edit
                    </button>
                    <button style={styles.deleteBtn} onClick={() => deleteUser(u.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  container: {
    display: "flex",
    height: "100vh"
  },
  sidebar: {
    width: "200px",
    background: "#1e293b",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  sideBtn: {
    padding: "10px",
    background: "#334155",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  content: {
    flex: 1,
    padding: "30px",
    background: "#f1f5f9"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  addBtn: {
    padding: "10px 15px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)"
  },
  row: {
    borderBottom: "1px solid #e5e7eb"
  },
  status: {
    padding: "5px 10px",
    background: "#dcfce7",
    color: "#166534",
    borderRadius: "6px",
    fontSize: "12px"
  },
  editBtn: {
    padding: "6px 10px",
    marginRight: "5px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  deleteBtn: {
    padding: "6px 10px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Users;