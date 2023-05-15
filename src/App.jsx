import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import Sales from "./pages/Sales";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import { useUser } from "./contexts/UserContext";
import MyProducts from "./pages/MyProducts";

function App() {
  const { user } = useUser();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/search/:categoryName" element={<Search />} />
        <Route path="/products/:name" element={<ProductDetail />} />
        {user && <Route path="/checkout" element={<Checkout />} />}
        {user && user.user.role === "SELLER" && (
          <Route path="/sales" element={<Sales />} />
        )}
        {user && user.user.role === "SELLER" && (
          <Route path="/my-products" element={<MyProducts />} />
        )}
      </Route>
    </Routes>
  );
}

export default App;
