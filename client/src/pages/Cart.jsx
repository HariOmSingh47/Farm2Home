import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { dummyAddress } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    navigate,
    cartCount,
    totalCartAmount,
    cartItems,
    setCartItems,
    removeFromCart,
    updateCartItem,
    user,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  // ---------------- CART ARRAY ----------------
  const getCart = () => {
    let tempArray = [];

    for (const key in cartItems) {
      const product = products.find(
        (p) => p._id === key
      );

      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItems[key],
        });
      }
    }

    setCartArray(tempArray);
  };

  // ---------------- ADDRESS ----------------
  const getAddress = async () => {
    try {
      // -------- BACKEND (COMMENTED) --------
      /*
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddress(data.addresses);
        setSelectedAddress(data.addresses[0]);
      }
      */

      // -------- FRONTEND --------
      const stored = localStorage.getItem(
        "demoAddress"
      );

      if (stored) {
        const parsed = JSON.parse(stored);
        setAddress([parsed]);
        setSelectedAddress(parsed);
      } else {
        setAddress(dummyAddress);
        setSelectedAddress(dummyAddress[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) getAddress();
  }, [user]);

  useEffect(() => {
    if (products.length && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  // ---------------- PLACE ORDER ----------------
  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error(
          "Please select an address"
        );
      }

      // -------- BACKEND (COMMENTED) --------
      /*
      const { data } = await axios.post(
        "/api/order/cod",
        {...}
      );
      */

      // -------- FRONTEND ORDER --------
      toast.success("Order Placed");

      setCartItems({});
      navigate("/my-orders");
    } catch (error) {
      console.log(error.message);
    }
  };

  // ---------------- UI ----------------
  return products.length > 0 ? (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      {/* LEFT CART */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">
            {cartCount()} Items
          </span>
        </h1>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center pt-3"
          >
            {/* PRODUCT */}
            <div className="flex gap-3">
              <div
                onClick={() =>
                  navigate(
                    `/product/${product.category}/${product._id}`
                  )
                }
                className="w-24 h-24 border flex items-center justify-center"
              >
                <img
                  className="h-full object-cover"
                  src={product.image[0]}   // ✅ FIXED
                  alt={product.name}
                />
              </div>

              <div>
                <p className="font-semibold">
                  {product.name}
                </p>

                <div className="flex items-center gap-2">
                  <p>Qty:</p>

                  <select
                    value={
                      cartItems[product._id]
                    }
                    onChange={(e) =>
                      updateCartItem(
                        product._id,
                        Number(e.target.value)
                      )
                    }
                  >
                    {Array(9)
                      .fill("")
                      .map((_, i) => (
                        <option
                          key={i}
                          value={i + 1}
                        >
                          {i + 1}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* SUBTOTAL */}
            <p className="text-center">
              ₹{" "}
              {product.offerPrice *
                product.quantity}
            </p>

            {/* REMOVE */}
            <button
              onClick={() =>
                removeFromCart(product._id)
              }
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* RIGHT SUMMARY */}
      <div className="max-w-[360px] w-full bg-gray-100 p-5 mt-10 md:mt-0">
        <h2 className="text-xl font-medium">
          Order Summary
        </h2>

        {/* ADDRESS */}
        <p className="mt-4 font-medium">
          Delivery Address
        </p>

        <p className="text-gray-500">
          {selectedAddress
            ? `${selectedAddress.street}, ${selectedAddress.city}`
            : "No Address"}
        </p>

        <button
          onClick={() =>
            navigate("/add-address")
          }
          className="text-indigo-500 text-sm"
        >
          Change
        </button>

        {/* TOTAL */}
        <div className="mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              ₹ {totalCartAmount()}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Tax 2%</span>
            <span>
              ₹{" "}
              {(totalCartAmount() * 2) /
                100}
            </span>
          </p>

          <p className="flex justify-between font-medium">
            <span>Total</span>
            <span>
              ₹{" "}
              {totalCartAmount() +
                (totalCartAmount() * 2) /
                  100}
            </span>
          </p>
        </div>

        {/* PLACE ORDER */}
        <button
          onClick={placeOrder}
          className="w-full bg-indigo-500 text-white py-2 mt-4"
        >
          Place Order
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
