import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(9);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/product.json');
        if (!response.ok) {
          throw new Error('Products JSON file not found');
        }
        const data = await response.json();
        setProducts(data.products || data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        // Fallback mock data
        setProducts([
          {
            id: 1,
            name: "Terminal Pizza",
            category: "CHEESE, PIZZA",
            rating: "4.9",
            comments: "(200)",
            price: "12.00",
            originalPrice: null,
            onSale: false,
            image: "/images/pizzaresim.png"
          },
          {
            id: 2,
            name: "Position Absolute Acı Pizza",
            category: "SPICY, PIZZA",
            rating: "4.9",
            comments: "(200)",
            price: "15.00",
            originalPrice: null,
            onSale: false,
            image: "/images/pizzaresim.png"
          },
          {
            id: 3,
            name: "useEffect Tavuklu Burger",
            category: "CREAMY, BURGER",
            rating: "4.7",
            comments: "(150)",
            price: "8.00",
            originalPrice: "10.00",
            onSale: true,
            image: "/images/tavukburger.png"
          },
          {
            id: 4,
            name: "Hackathlon Burger",
            category: "BBQ, MEAT",
            rating: "4.8",
            comments: "(120)",
            price: "14.00",
            originalPrice: null,
            onSale: false,
            image: "/images/burgerresim.png"
          },
          {
            id: 5,
            name: "useState Chicken Wings",
            category: "SPICY, CHICKEN",
            rating: "4.6",
            comments: "(89)",
            price: "9.00",
            originalPrice: "12.00",
            onSale: true,
            image: "/images/chicken.png"
          },
          {
            id: 6,
            name: "Props Pasta Primavera",
            category: "VEGETARIAN, PASTA",
            rating: "4.5",
            comments: "(95)",
            price: "11.00",
            originalPrice: null,
            onSale: false,
            image: "/images/et.png"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 6);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-red-200 border-t-red-600"></div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-sm mx-auto">
          <p className="text-red-600 font-semibold mb-2">Ürünler Yüklenemedi</p>
          <p className="text-gray-600 text-sm">Lütfen daha sonra tekrar deneyin.</p>
        </div>
      </div>
    );
  }

  const displayedProducts = products.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < products.length;

  return (
    <div className="w-full">
      {/* Products Grid - Daha sık grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
        {displayedProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="text-center mt-8">
          <button 
            onClick={handleLoadMore}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Daha Fazla Ürün Gör
          </button>
        </div>
      )}
      
      {/* Products Count */}
      <div className="text-center mt-6 text-gray-500">
        <p className="text-sm">
          <span className="font-semibold text-red-600">{displayedProducts.length}</span> / 
          <span className="font-semibold text-gray-700"> {products.length}</span> ürün gösteriliyor
        </p>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProductList;