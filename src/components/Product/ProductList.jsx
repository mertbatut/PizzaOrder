import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/product.json');
        if (!response.ok) {
          throw new Error('Products JSON file not found. Please create /public/data/products.json');
        }
        const data = await response.json();
        setProducts(data.products || data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        setProducts([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 font-semibold mb-2">Products Not Found</p>
          <p className="text-gray-600 text-sm">
            Please create <code className="bg-gray-100 px-2 py-1 rounded">public/data/products.json</code> file
          </p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-yellow-600 font-semibold mb-2">No Products Available</p>
          <p className="text-gray-600 text-sm">
            Add products to your <code className="bg-gray-100 px-2 py-1 rounded">products.json</code> file
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list grid md:grid-cols-3 gap-8 animate-fadeInUp delay-400">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;