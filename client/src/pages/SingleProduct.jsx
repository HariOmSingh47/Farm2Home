import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const SingleProduct = () => {
  const { products, navigate, addToCart } = useAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // -------- FIND PRODUCT --------
  const product = products?.find(
    (item) => item._id === id
  );

  // -------- RELATED PRODUCTS --------
  useEffect(() => {
    if (product && products.length > 0) {
      const filtered = products
        .filter(
          (item) =>
            item.category === product.category &&
            item._id !== product._id
        )
        .slice(0, 5);

      setRelatedProducts(filtered);
    }
  }, [product, products]);

  // -------- THUMBNAIL --------
  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="mt-16">

      {/* BREADCRUMB */}
      <p>
        <Link to="/">Home</Link> /
        <Link to="/products"> Products</Link> /
        <Link
          to={`/products/${product.category.toLowerCase()}`}
        >
          {" "}
          {product.category}
        </Link>{" "}
        / <span className="text-indigo-500">
          {product.name}
        </span>
      </p>

      {/* PRODUCT SECTION */}
      <div className="flex flex-col md:flex-row gap-16 mt-4">

        {/* IMAGES */}
        <div className="flex gap-3">

          {/* THUMBNAILS */}
          <div className="flex flex-col gap-3">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className="border max-w-24 rounded cursor-pointer"
              >
                <img src={image} alt="" />
              </div>
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="border max-w-100 rounded">
            <img src={thumbnail} alt="product" />
          </div>
        </div>

        {/* DETAILS */}
        <div className="text-sm w-full md:w-1/2">

          <h1 className="text-3xl font-medium">
            {product.name}
          </h1>

          {/* PRICE */}
          <div className="mt-6">
            <p className="line-through text-gray-500">
              ₹ {product.price}
            </p>
            <p className="text-2xl font-medium">
              ₹ {product.offerPrice}
            </p>
          </div>

          {/* DESCRIPTION */}
          <p className="font-medium mt-6">
            About Product
          </p>

          <ul className="list-disc ml-4 text-gray-500">
            {product.description.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">

            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3 bg-gray-100"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3 bg-indigo-500 text-white"
            >
              Buy Now
            </button>

          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="flex flex-col items-center mt-20">

        <p className="text-2xl font-medium">
          Related Products
        </p>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

          {relatedProducts
            .filter((item) => item.inStock)
            .map((item) => (
              <ProductCard
                key={item._id}
                product={item}
              />
            ))}

        </div>

        <button
          onClick={() => navigate("/products")}
          className="w-1/2 py-3 bg-indigo-500 text-white"
        >
          See More
        </button>

      </div>
    </div>
  );
};

export default SingleProduct;
