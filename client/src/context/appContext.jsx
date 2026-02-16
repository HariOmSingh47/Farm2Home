import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  // ✅ Use dummy products
  const [products, setProducts] = useState(dummyProducts);

  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // ---------------- SELLER AUTH ----------------
  const fetchSeller = async () => {
    try {
      // const { data } = await axios.get("/api/seller/is-auth");
      // if (data.success) {
      //   setIsSeller(true);
      // } else {
      //   setIsSeller(false);
      // }

      // 🔹 Frontend demo default
      setIsSeller(false);
    } catch (error) {
      setIsSeller(false);
    }
  };

  // ---------------- USER AUTH ----------------
  const fetchUser = async () => {
    try {
      // const { data } = await axios.get("/api/user/is-auth");
      // if (data.success) {
      //   setUser(data.user);
      //   setCartItems(data.user.cart);
      // } else {
      //   toast.error(data.message);
      // }

      // 🔹 Frontend demo → no user
      setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  // ---------------- PRODUCTS ----------------
  const fetchProducts = async () => {
    try {
      // const { data } = await axios.get("/api/product/list");
      // if (data.success) {
      //   setProducts(data.products);
      // } else {
      //   toast.error(data.message);
      // }

      // 🔹 Already using dummyProducts
      setProducts(dummyProducts);
    } catch (error) {
      console.log(error.message);
    }
  };

  // ---------------- CART ----------------
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems || {});

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;

      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }

      setCartItems(cartData);
      toast.success("Removed from cart");
    }
  };

  // ---------------- CART COUNT ----------------
  const cartCount = () => {
    let totalCount = 0;

    for (const item in cartItems) {
      totalCount += cartItems[item];
    }

    return totalCount;
  };

  // ---------------- CART AMOUNT ----------------
  const totalCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find(
        (product) => product._id === items
      );

      if (itemInfo && cartItems[items] > 0) {
        totalAmount +=
          cartItems[items] * itemInfo.offerPrice;
      }
    }

    return Math.floor(totalAmount * 100) / 100;
  };

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    fetchSeller();
    fetchUser();
    // fetchProducts(); ❌ backend disabled
  }, []);

  // ---------------- DB CART UPDATE ----------------
  useEffect(() => {
    const updateCart = async () => {
      try {
        // const { data } = await axios.post(
        //   "/api/cart/update",
        //   { cartItems }
        // );

        // if (!data.success) {
        //   toast.error(data.message);
        // }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems]);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    cartCount,
    totalCartAmount,
    axios,
    fetchProducts,
    setCartItems,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
