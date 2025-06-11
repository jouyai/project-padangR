import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [saveInfo, setSaveInfo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const shippingCost = 5.0;

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed! Payment via: ${paymentMethod}`);
    clearCart();
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      {/* Form Section */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input type="text" required className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" required className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Shipping Address</label>
            <textarea required className="textarea textarea-bordered w-full" />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block mb-1 font-medium">Payment Method</label>
            <select
              className="select select-bordered w-full"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="bank_transfer">Bank Transfer</option>
              <option value="credit_card">Credit Card</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          {/* Save Info */}
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={saveInfo}
              onChange={() => setSaveInfo(!saveInfo)}
            />
            <span className="ml-2">Save this information for next time</span>
          </label>

          <button type="submit" className="btn btn-primary w-full mt-2">
            Place Order
          </button>
        </form>
      </div>

      {/* Summary Section */}
      <div className="bg-gray-50 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.id} className="py-3 flex justify-between text-sm">
              <span>{item.name} × {item.qty}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4 text-sm">
          <span>Subtotal:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping:</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
          <span>Total:</span>
          <span>${(totalPrice + shippingCost).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
