import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddUser({ editUser }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (editUser) {
      setName(editUser.name || "");
      setEmail(editUser.email || "");
    }
  }, [editUser]);

  const handleSave = async () => {

    const userData = { name, email, password };

    try {

      let res;

      if (editUser) {

        res = await fetch(`https://backend-addmin-2.onrender.com/users/${editUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData),
        });

      } else {

        res = await fetch("https://backend-addmin-2.onrender.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData),
        });

      }

      const data = await res.json();

      if (res.ok) {
        alert("User saved successfully!");
        navigate("/users");
      } else {
        alert(data.message || "Error saving user");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="admin-layout">

      <div className="sidebar">
        <h2>E-Commerce</h2>
        <button onClick={() => navigate("/")}>Dashboard</button>
        <button onClick={() => navigate("/users")}>Users</button>
        <button onClick={() => navigate("/products")}>Products</button>
      </div>

      <div className="page-content">

        <div className="adduser-card">

          <h2>{editUser ? "Edit User" : "Add User"}</h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          {!editUser && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          )}

          <button onClick={handleSave}>
            {editUser ? "Update User" : "Save User"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddUser;