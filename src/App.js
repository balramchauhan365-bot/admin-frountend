import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/SighUp";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import UserList from "./pages/Users";
import AddUser from "./pages/AddUser";
import AddProduct from "./pages/AddProduct";
import UserDetails from "./pages/UserDetails";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  /* ================= USERS ================= */
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user) => setUsers([...users, user]);

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const updateUser = (updatedUser) => {
    setUsers(
      users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      )
    );
    setEditUser(null);
  };

  /* ================= PRODUCTS ================= */
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
    setEditProduct(null);
  };

  return (
    <BrowserRouter>
      {!isLogin ? (
        !isSignup ? (
          <Login
            onLogin={() => setIsLogin(true)}
            goToSignup={() => setIsSignup(true)}
          />
        ) : (
          <Signup onSignup={() => setIsSignup(false)} />
        )
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard users={users} products={products} />
            }
          />

          {/* USERS */}
          <Route
            path="/users"
            element={
              <UserList
                users={users}
                deleteUser={deleteUser}
                setEditUser={setEditUser}
              />
            }
          />

          <Route
            path="/user/:id"
            element={<UserDetails users={users} />}
          />

          <Route
            path="/add-user"
            element={
              <AddUser
                addUser={addUser}
                editUser={editUser}
                updateUser={updateUser}
              />
            }
          />

          {/* PRODUCTS */}
          <Route
            path="/products"
            element={
              <Products
                products={products}
                deleteProduct={deleteProduct}
                setEditProduct={setEditProduct}
              />
            }
          />

          <Route
            path="/add-product"
            element={
              <AddProduct
                addProduct={addProduct}
                editProduct={editProduct}
                updateProduct={updateProduct}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails products={products} />
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;