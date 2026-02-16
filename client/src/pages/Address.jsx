import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";

const Address = () => {
  const [address, setAddress] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const { user, navigate } = useContext(AppContext);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const submitHanlder = async (e) => {
    e.preventDefault();

    try {
      // -------- BACKEND (COMMENTED) --------
      /*
      const { data } = await axios.post(
        "/api/address/add",
        { address }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
      */

      // -------- FRONTEND DEMO SAVE --------
      localStorage.setItem(
        "demoAddress",
        JSON.stringify(address)
      );

      toast.success("Address Saved");
      navigate("/cart");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, [user]);

  return (
    <div className="mt-12 flex flex-col md:flex-row gap-6 p-6 bg-gray-100 rounded-lg shadow-md">
      {/* LEFT: FORM */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Address Details
        </h2>

        <form
          onSubmit={submitHanlder}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="firstName"
            value={address.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="p-2 border rounded-md"
            required
          />

          <input
            type="text"
            name="lastName"
            value={address.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-2 border rounded-md"
            required
          />

          <input
            type="email"
            name="email"
            value={address.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border rounded-md md:col-span-2"
            required
          />

          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="Street"
            className="p-2 border rounded-md md:col-span-2"
            required
          />

          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="City"
            className="p-2 border rounded-md"
            required
          />

          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            placeholder="State"
            className="p-2 border rounded-md"
            required
          />

          <input
            type="number"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
            className="p-2 border rounded-md"
            required
          />

          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
            placeholder="Country"
            className="p-2 border rounded-md"
            required
          />

          <input
            type="number"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="p-2 border rounded-md md:col-span-2"
            required
          />

          <button className="bg-indigo-500 text-white py-2 rounded-md md:col-span-2">
            Save Address
          </button>
        </form>
      </div>

      {/* RIGHT: IMAGE */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={assets.add_address_iamge}
          alt="Address"
          className="w-full max-w-xs rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default Address;
