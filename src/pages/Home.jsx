import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/ProductGrid";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";

const Home = () => {
  const { products, loading } = useProducts();

  const topProducts = products.slice(0, 4); // Tampilkan 4 produk pertama

  return (
    <div>
      {/* Hero Section */}
      <HeroBanner />

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">New Arrivals</h2>
          <Link to="/products" className="text-primary hover:underline">
            View All
          </Link>
        </div>
        <ProductGrid products={topProducts} loading={loading} />
      </section>

      {/* Footer or more sections can go here */}
    </div>
  );
};

export default Home;
