import { useState, useEffect } from 'react'
import HeroBanner from '../components/HeroBanner'
import FilterSidebar from '../components/FilterSidebar'
import ProductGrid from '../components/ProductGrid'
import useProducts from '../hooks/useProducts'

const Home = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000000,
    condition: 'all'
  })
  
  const { products, loading, error } = useProducts(filters)
  
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroBanner />
      
      <div className="flex flex-col md:flex-row gap-8 mt-12">
        <aside className="md:w-1/4">
          <FilterSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>
        
        <div className="md:w-3/4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-12">{error}</div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home