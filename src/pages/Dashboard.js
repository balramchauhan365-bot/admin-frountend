import { useState } from "react";
import Users from "./Users";
import Products from "./Products";
import { useNavigate } from "react-router-dom";

function Dashboard({ users, products }) {
  const navigate = useNavigate();

  const [page, setPage] = useState("dashboard");
  return (
    <div className="dashboard">

      {/* LEFT SIDEBAR */}
      <div className="sidebar">
        <div className="ecom-logo sidebar-logo">
          <span className="logo-left">E</span>
          <span className="logo-right">COMMERCE</span>
        </div>

        <button

          onClick={() => {
            // setEditUser(null);
            navigate("/users");
          }}
        >
          users
        </button>
      
        <button

          onClick={() => {
            // setEditUser(null);
            navigate("/products");
          }}
        >
          product
        </button>
      </div>


      {/* CENTER CONTENT */}
      <div className="content">

        {/* DEFAULT DASHBOARD */}
        {page === "dashboard" && (
          <div className="cards">
            <div className="card">
              <h3>Total Users</h3>
              <p onClick={() => {
                navigate("/users");
              }}
              >{users?.length} </p>
            </div>

            <div className="card">
              <h3>Total Products</h3>
              <p  
          onClick={() => {
            navigate("/products");
          }}
        >
       
        {products?.length}</p>
            </div>
          </div>
        )}

        {/* USER LIST */}
        {page === "users" && <Users />}

        {/* PRODUCT LIST */}
        {page === "products" && <Products />}

      </div>

    </div>
  );
}

export default Dashboard;
