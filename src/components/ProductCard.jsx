import React from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border rounded-md p-4 shadow hover:shadow-lg transition"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">${product.price}</p>
      <button
        className="btn btn-primary w-full mt-3"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </motion.div>
  );
};

export default ProductCard; // ✅ inilah yang hilang
