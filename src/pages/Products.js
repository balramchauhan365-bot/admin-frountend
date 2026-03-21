import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token"); // agar login system use ho raha hai
      const res = await fetch("http://localhost:5000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setProducts(data);   // 🔧 change
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/products/${id}`, {  // 🔧 change
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading products...</p>;

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="ecom-logo sidebar-logo">
          <span className="logo-left">E</span>
          <span className="logo-right">COMMERCE</span>
        </div>

        <button onClick={() => navigate("/")}>Dashboard</button>
        <button onClick={() => navigate("/users")}>Users</button>
        <button onClick={() => navigate("/products")}>Products</button>
      </div>

      <div className="content">
        <div className="page-header">
          <h2>👥 Products</h2>
          <button className="add-btn" onClick={() => navigate("/add-product")}>
            + Add Product
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>{p.description}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => navigate(`/product/${p.id}`)}
                    >
                      View
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/add-product/${p.id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Products;