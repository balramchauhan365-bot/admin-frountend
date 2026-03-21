import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct({ editProduct }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setPrice(editProduct.price);
      setSize(editProduct.size);
      setColour(editProduct.colour);
      setImage(editProduct.image);
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price, size, colour, image };

    try {
      const token = localStorage.getItem("token");
      let res;

      if (editProduct) {
        res = await fetch(`http://localhost:5000/products/${editProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(productData),
        });
      } else {
        res = await fetch("http://localhost:5000/products", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(productData),
        });
      }

      const data = await res.json();
      if (res.ok) {
        alert("Product saved successfully!");
        navigate("/products");
      } else {
        alert(data.message || "Error saving product");
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

      <div className="addproduct-container">
        <h2>{editProduct ? "Edit Product" : "Add New Product"}</h2>
        <form className="addproduct-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
          <input type="text" placeholder="Size" value={size} onChange={e => setSize(e.target.value)} required />
          <input type="text" placeholder="Colour" value={colour} onChange={e => setColour(e.target.value)} required />
          <input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} required />
          <button type="submit">{editProduct ? "Update Product" : "Save Product"}</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;