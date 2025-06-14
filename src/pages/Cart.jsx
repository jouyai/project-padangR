import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-outline mt-4">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ${item.price} × {item.qty}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  ${item.price * item.qty}
                </p>
                <button
                  className="text-xs text-red-500 hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-6 items-center border-t pt-4">
            <p className="font-bold">Total:</p>
            <p className="text-lg font-semibold">${totalPrice}</p>
          </div>

          <button
            className="btn btn-primary w-full mt-4"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
