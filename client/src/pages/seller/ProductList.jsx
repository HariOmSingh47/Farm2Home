import toast from "react-hot-toast";
import { useAppContext } from "../../context/appContext";

const ProductList = () => {
  const { products, setProducts } = useAppContext();

  // ---------------- STOCK TOGGLE ----------------
  const toggleStock = async (id, inStock) => {
    try {
      // -------- BACKEND (COMMENTED) --------
      /*
      const { data } = await axios.post(
        "/api/product/stock",
        { id, inStock }
      );

      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      */

      // -------- FRONTEND LOCAL UPDATE --------
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id
            ? { ...product, inStock }
            : product
        )
      );

      toast.success("Stock Updated");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">
          All Products
        </h2>

        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">
                  Product
                </th>
                <th className="px-4 py-3 font-semibold">
                  Category
                </th>
                <th className="px-4 py-3 font-semibold hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold">
                  In Stock
                </th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-gray-500/20"
                >
                  {/* PRODUCT INFO */}
                  <td className="md:px-4 pl-2 py-3 flex items-center space-x-3">
                    <div className="border border-gray-300 rounded p-2">
                      <img
                        src={product.image[0]}
                        alt="Product"
                        className="w-16"
                      />
                    </div>

                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-4 py-3">
                    {product.category}
                  </td>

                  {/* PRICE */}
                  <td className="px-4 py-3 max-sm:hidden">
                    ₹ {product.offerPrice}
                  </td>

                  {/* STOCK TOGGLE */}
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer gap-3">
                      <input
                        onChange={() =>
                          toggleStock(
                            product._id,
                            !product.inStock
                          )
                        }
                        checked={product.inStock}
                        type="checkbox"
                        className="sr-only peer"
                      />

                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>

                      <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
