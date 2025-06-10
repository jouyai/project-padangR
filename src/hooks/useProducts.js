import { useState, useEffect } from 'react'
import axios from 'axios'

const useProducts = (filters) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // Ini akan diganti dengan API nyata
        // const response = await axios.get('/api/products', { params: filters })
        
        // Mock data sementara
        const mockProducts = [
          {
            id: 1,
            name: 'Kaos Polo Bekas Premium',
            price: 75000,
            originalPrice: 250000,
            condition: 'good',
            category: 'men',
            size: 'L',
            image: '/images/product1.jpg',
            description: 'Kaos polo bekas kondisi masih bagus, bahan nyaman'
          },
          // Tambahkan lebih banyak produk mock
        ].filter(product => {
          // Filter berdasarkan kondisi
          if (filters.condition !== 'all' && product.condition !== filters.condition) {
            return false
          }
          // Filter berdasarkan kategori
          if (filters.category !== 'all' && product.category !== filters.category) {
            return false
          }
          // Filter berdasarkan harga
          if (product.price < filters.minPrice || product.price > filters.maxPrice) {
            return false
          }
          return true
        })
        
        setProducts(mockProducts)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [filters])
  
  return { products, loading, error }
}

export default useProducts