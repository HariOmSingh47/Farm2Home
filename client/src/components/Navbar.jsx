import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    cartCount,
    axios,
  } = useAppContext();

  // ---------------- LOGOUT ----------------
  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ---------------- SEARCH REDIRECT ----------------
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

      {/* LOGO */}
      <Link to="/">
        <h2 className="text-2xl font-bold text-primary">
          Farm2Home App
        </h2>
      </Link>

      {/* ---------------- DESKTOP MENU ---------------- */}
      <div className="hidden sm:flex items-center gap-8">

        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>

        {/* ✅ SELLER DASHBOARD BUTTON ADDED */}
        <button
          onClick={() => navigate("/seller")}
          className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm"
        >
          Seller
        </button>

        {/* SEARCH */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
        </div>

        {/* CART */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          🛒
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {cartCount()}
          </button>
        </div>

        {/* USER */}
        {user ? (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-10"
            />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2 w-30 rounded-md z-40 text-sm">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-1.5 cursor-pointer"
              >
                My Orders
              </li>
              <li
                className="cursor-pointer p-1.5"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      {/* ---------------- MOBILE MENU ---------------- */}
      <div className="flex items-center gap-6 md:hidden">

        {/* CART */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          🛒
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {cartCount()}
          </button>
        </div>

        {/* MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden"
        >
          ☰
        </button>
      </div>

      {/* ---------------- MOBILE DROPDOWN ---------------- */}
      <div
        className={`${open ? "flex" : "hidden"}
        absolute top-[60px] left-0 w-full bg-white shadow-md py-4
        flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link onClick={() => setOpen(false)} to="/">
          Home
        </Link>

        <Link onClick={() => setOpen(false)} to="/products">
          Products
        </Link>

        {/* ✅ SELLER BUTTON MOBILE */}
        <button
          onClick={() => {
            setOpen(false);
            navigate("/seller");
          }}
          className="text-green-600 font-medium"
        >
          Seller Dashboard
        </button>

        {user ? (
          <button
            onClick={logout}
            className="text-red-500"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="text-indigo-500"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
