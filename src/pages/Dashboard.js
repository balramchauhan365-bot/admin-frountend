import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const BASE_URL = "https://backend-addmin-2.onrender.com";

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));

    fetch(`${BASE_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard">

      <div className="sidebar">
        <div className="ecom-logo sidebar-logo">
          <span className="logo-left">E</span>
          <span className="logo-right">COMMERCE</span>
        </div>

        <button onClick={() => navigate("/users")}>Users</button>
        <button onClick={() => navigate("/products")}>Products</button>
      </div>

      <div className="content">
        <div className="cards">
          <div className="card">
            <h3>Total Users</h3>
            <p onClick={() => navigate("/users")}>
              {users?.length}
            </p>
          </div>

          <div className="card">
            <h3>Total Products</h3>
            <p onClick={() => navigate("/products")}>
              {products?.length}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;