import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FiArrowLeft, FiShoppingCart, FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'
import { useCart } from '../context/CartContext'
import axios from 'axios'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        // Ganti dengan API nyata
        // const response = await axios.get(`/api/products/${id}`)
        
        // Mock data
        const mockProduct = {
          id: 1,
          name: 'Kaos Polo Bekas Premium',
          price: 75000,
          originalPrice: 250000,
          condition: 'good',
          category: 'men',
          size: 'L',
          images: [
            '/images/product1.jpg',
            '/images/product2.jpg',
            '/images/product3.jpg'
          ],
          description: 'Kaos polo bekas kondisi masih bagus, bahan nyaman dipakai sehari-hari. Warna tidak pudar dan tidak ada noda yang mencolok.',
          seller: {
            name: 'Budi Santoso',
            joinDate: 'Jan 2022',
            rating: 4.8
          },
          details: [
            'Bahan: Cotton Pique',
            'Kondisi: 85% baru',
            'Ukuran: L (Lebar dada: 50cm, Panjang: 70cm)',
            'Warna: Navy Blue',
            'Brand: Polo Ralph Lauren'
          ]
        }
        
        setProduct(mockProduct)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      image: product.images[0]
    })
  }

  if (loading) return (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400"></div>
    </div>
  )

  if (error) return <div className="text-red-500 text-center py-12">{error}</div>

  if (!product) return <div className="text-center py-12">Produk tidak ditemukan</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => window.history.back()} 
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <FiArrowLeft className="mr-2" /> Kembali
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg overflow-hidden mb-4">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border rounded-md overflow-hidden ${selectedImage === index ? 'border-gray-900' : 'border-gray-200'}`}
              >
                <img 
                  src={img} 
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <span className="text-lg font-semibold text-gray-900">Rp{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">Rp{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {product.condition === 'good' ? 'Bekas Bagus' : 'Bekas Standar'}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              Ukuran: {product.size}
            </span>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Deskripsi Produk</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Detail Produk</h3>
            <ul className="space-y-1 text-gray-700">
              {product.details.map((detail, index) => (
                <li key={index}>• {detail}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="font-medium mb-2">Penjual</h3>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <p className="font-medium">{product.seller.name}</p>
                <p className="text-sm text-gray-500">Member sejak {product.seller.joinDate} • Rating {product.seller.rating}/5</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center mb-4">
              <span className="mr-3">Jumlah:</span>
              <div className="flex border border-gray-300 rounded-md">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center bg-gray-900 text-white hover:bg-gray-800"
              >
                <FiShoppingCart className="mr-2" /> Masukkan Keranjang
              </Button>
              
              <Button 
                className="p-3 border border-gray-300 hover:bg-gray-100"
              >
                <FiHeart />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail