// ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';
import products from './Product';

const ProductList = () => {
  return (
    <div className="product-list flex gap-8 justify-center pb-36 pt-20">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
