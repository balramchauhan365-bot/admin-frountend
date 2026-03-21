import { useEffect, useState } from "react";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // agar login system use ho raha hai
      const res = await fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.data || []);
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

  if (loading) return <p style={{ padding: "40px" }}>Loading users...</p>;
  if (!users.length) return <h2 style={{ padding: "40px" }}>No users found</h2>;

  return (
    <div style={styles.container}>
      <h2>User List</h2>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={styles.row}>
              <td style={styles.td}>{user.id}</td>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  container: {
    padding: "40px",
    background: "#f1f5f9",
    minHeight: "100vh",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  },
  thead: {
    background: "#2563eb",
    color: "white",
  },
  th: {
    padding: "12px",
    textAlign: "left",
  },
  row: {
    borderBottom: "1px solid #e5e7eb",
  },
  td: {
    padding: "12px",
  },
};

export default UserDetails;