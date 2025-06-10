import { Link } from 'react-router-dom'
import { FiShoppingCart, FiTrash2, FiArrowLeft } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
  
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <FiShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Belanja Kosong</h2>
          <p className="text-gray-600 mb-6">Tambahkan beberapa produk untuk memulai belanja</p>
          <Link to="/">
            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              Lanjutkan Belanja
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
          <FiArrowLeft className="mr-2" /> Lanjutkan Belanja
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 ml-6">Keranjang Belanja</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <motion.div 
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex p-4"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden mr-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Ukuran: {item.size}</p>
                        <p className="text-sm text-gray-500">Kondisi: {item.condition === 'good' ? 'Bekas Bagus' : 'Bekas Standar'}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex border border-gray-300 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      
                      <span className="font-medium">Rp{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button 
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Hapus Semua
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Belanja</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">Rp{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ongkos Kirim</span>
                <span className="font-medium">Rp15.000</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="text-gray-900 font-bold">Total</span>
                <span className="text-gray-900 font-bold">Rp{(totalPrice + 15000).toLocaleString()}</span>
              </div>
            </div>
            
            <Link to="/checkout">
              <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 py-3">
                Lanjut ke Pembayaran
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart