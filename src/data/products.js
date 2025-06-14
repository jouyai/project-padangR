export const products = [
  {
    id: 1,
    name: 'Kaos Polo Bekas Premium',
    price: 75000,
    originalPrice: 250000,
    condition: 'good',
    category: 'men',
    size: 'L',
    images: [
      '/images/product1.jpg',
      '/images/product1-2.jpg',
      '/images/product1-3.jpg'
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
  },
  {
    id: 2,
    name: 'Jeans Slim Fit Bekas',
    price: 120000,
    originalPrice: 350000,
    condition: 'good',
    category: 'men',
    size: '32',
    images: [
      '/images/product2.jpg',
      '/images/product2-2.jpg'
    ],
    description: 'Jeans slim fit bekas kondisi masih sangat bagus, tidak ada sobekan atau noda membandel.',
    seller: {
      name: 'Ani Wijaya',
      joinDate: 'Mar 2022',
      rating: 4.9
    },
    details: [
      'Bahan: Denim',
      'Kondisi: 90% baru',
      'Ukuran: 32 (Lingkar pinggang: 82cm, Panjang: 102cm)',
      'Warna: Biru Tua',
      'Brand: Uniqlo'
    ]
  },
  // Tambahkan lebih banyak produk di sini
]

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

export const getFilteredProducts = (filters) => {
  return products.filter(product => {
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
}