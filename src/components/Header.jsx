import { Link } from 'react-router-dom'
import { FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const Header = () => {
  const { cartItems } = useCart()
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            SecondStyle
          </Link>
          
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Cari baju bekas..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <FiSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Beranda</Link>
            <Link to="/" className="text-gray-600 hover:text-gray-900">Produk</Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/login" className="p-2 text-gray-600 hover:text-gray-900">
                <FiUser size={20} />
              </Link>
              
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-gray-900">
                <FiShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header