import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const CartModal = ({ open, onClose, cartItems = [] }) => {
  const { removeFromCart } = useCart();

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <Dialog.Content asChild>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50"
              >
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-xl font-semibold">
                    Your Cart
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      onClick={() => onClose(false)}
                      className="text-gray-500 hover:text-black text-xl"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </Dialog.Close>
                </div>

                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Cart is empty</p>
                ) : (
                  <div className="flex flex-col h-[85%] justify-between">
                    <div className="space-y-3 overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-start border-b pb-2"
                        >
                          <div className="w-4/5">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              ${item.price} × {item.qty}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-sm font-semibold">
                              ${item.price * item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation(); // prevent closing
                                removeFromCart(item.id);
                              }}
                              className="text-xs text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="btn btn-primary w-full mt-4">
                      Checkout
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CartModal;
