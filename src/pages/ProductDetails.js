import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductsDetails() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("https://backend-addmin-2.onrender.com/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // 👇 backend direct array return kar raha hai
        if (res.ok) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <p style={{ padding: "40px", fontSize: "18px" }}>Loading products...</p>;

  if (products.length === 0)
    return (
      <div style={{ padding: "40px", fontSize: "18px" }}>
        <h2>No Products Found</h2>
      </div>
    );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 Products List</h2>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            {product.image && (
              <img src={product.image} alt={product.name} style={styles.image} />
            )}
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.price}>Price: ₹{product.price}</p>
            {product.size && <p style={styles.info}>Size: {product.size}</p>}
            {product.colour && <p style={styles.info}>Colour: {product.colour}</p>}
            <button
              style={styles.button}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  container: {
    padding: "40px",
    background: "#f3f4f6",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "30px",
    textAlign: "center",
    color: "#1e3a8a",
    fontSize: "28px",
    fontWeight: "700",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    background: "white",
    padding: "20px",
    width: "220px",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "12px",
  },
  name: {
    fontSize: "18px",
    marginBottom: "8px",
    textAlign: "center",
  },
  price: {
    fontWeight: "bold",
    marginBottom: "6px",
  },
  info: {
    marginBottom: "4px",
    color: "#374151",
  },
  button: {
    marginTop: "12px",
    padding: "8px 12px",
    width: "100%",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

export default ProductsDetails;