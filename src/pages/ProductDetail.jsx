import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = { id, name: "Sample Product", price: "$30", image: "/images/jacket.jpg", description: "Description here..." };

  return (
    <div className="p-4">
      <img src={product.image} alt={product.name} className="w-full max-w-md mx-auto" />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p className="text-gray-600">{product.price}</p>
      <button onClick={() => addToCart(product)} className="bg-black text-white px-4 py-2 mt-2">Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
