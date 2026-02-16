import { assets, categories } from "../../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { setProducts, products } = useContext(AppContext);

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ---------------- BACKEND (COMMENTED) ----------------
      /*
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);

      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }

      const { data } = await axios.post(
        "/api/product/add-product",
        formData
      );
      */

      // ---------------- FRONTEND ADD ----------------

      const newProduct = {
        _id: Date.now().toString(), // unique id
        name,
        description,
        category,
        price: Number(price),
        offerPrice: Number(offerPrice),
        image: files.map((file) =>
          URL.createObjectURL(file)
        ),
        inStock: true,
      };

      setProducts((prev) => [...prev, newProduct]);

      toast.success("Product Added");

      // reset form
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setOfferPrice("");
      setFiles([]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        {/* IMAGE UPLOAD */}
        <div>
          <p className="text-base font-medium">
            Product Image
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index}>
                  <input
                    onChange={(e) => {
                      const updated = [...files];
                      updated[index] =
                        e.target.files[0];
                      setFiles(updated);
                    }}
                    type="file"
                    hidden
                  />

                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      files[index]
                        ? URL.createObjectURL(
                            files[index]
                          )
                        : assets.upload_area
                    }
                    alt=""
                  />
                </label>
              ))}
          </div>
        </div>

        {/* NAME */}
        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Product Name"
          className="border p-2 w-full"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Description"
          className="border p-2 w-full"
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="border p-2 w-full"
          required
        >
          <option value="">
            Select Category
          </option>

          {categories.map((cat, i) => (
            <option key={i} value={cat.path}>
              {cat.path}
            </option>
          ))}
        </select>

        {/* PRICE */}
        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          placeholder="Price"
          className="border p-2 w-full"
          required
        />

        {/* OFFER PRICE */}
        <input
          type="number"
          value={offerPrice}
          onChange={(e) =>
            setOfferPrice(e.target.value)
          }
          placeholder="Offer Price"
          className="border p-2 w-full"
          required
        />

        <button className="bg-indigo-500 text-white px-6 py-2">
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
