import { Routes, Route, useLocation } from "react-router-dom";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/appContext";
import Auth from "./modals/Auth";
import ProductCategory from "./pages/ProductCategory";
import Address from "./pages/Address";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";

const App = () => {

  const isSellerPath =
    useLocation().pathname.includes("seller");

  const {
    showUserLogin,

    // ❌ Backend auth (disabled)
    // isSeller

  } = useAppContext();

  // ✅ FRONTEND DEMO SELLER ACCESS
  const isSeller = true; // temporary for demo

  return (
    <div className="text-default min-h-screen">

      {/* NAVBAR */}
      {isSellerPath ? null : <Navbar />}

      {/* USER LOGIN MODAL */}
      {showUserLogin ? <Auth /> : null}

      <Toaster />

      <div
        className={`${
          isSellerPath
            ? ""
            : "px-6 md:px-16 lg:px-24 xl:px-32"
        }`}
      >

        <Routes>

          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:category"
            element={<ProductCategory />}
          />
          <Route
            path="/product/:category/:id"
            element={<SingleProduct />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/add-address"
            element={<Address />}
          />
          <Route
            path="/my-orders"
            element={<MyOrders />}
          />

          {/* SELLER ROUTES */}
          <Route
            path="/seller"
            element={
              isSeller
                ? <SellerLayout />
                : <SellerLogin />
            }
          >
            <Route
              index
              element={
                isSeller
                  ? <AddProduct />
                  : null
              }
            />

            <Route
              path="product-list"
              element={
                isSeller
                  ? <ProductList />
                  : null
              }
            />

            <Route
              path="orders"
              element={
                isSeller
                  ? <Orders />
                  : null
              }
            />
          </Route>

        </Routes>
      </div>

      {/* FOOTER */}
      {isSellerPath ? null : <Footer />}

    </div>
  );
};

export default App;
