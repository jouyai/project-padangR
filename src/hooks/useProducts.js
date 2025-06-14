import { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Simulasi data (bisa diganti fetch ke API)
        const dummyProducts = [
          { id: 1, name: "T-Shirt", price: 25, image: "/images/product1.jpg" },
          { id: 2, name: "Hoodie", price: 40, image: "/images/product2.jpg" },
          { id: 3, name: "Cap", price: 15, image: "/images/product3.jpg" },
          { id: 4, name: "Shoes", price: 70, image: "/images/product4.jpg" },
          { id: 5, name: "Backpack", price: 55, image: "/images/product5.jpg" },
        ];

        // Simulasi delay
        setTimeout(() => {
          setProducts(dummyProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};
