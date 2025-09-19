import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discountPercentage = ((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md overflow-hidden group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 space-y-1">
            {product.tags.includes('Sale') && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
            {product.tags.includes('New') && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                New
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>

          {/* Quick Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-700 transform translate-y-2 group-hover:translate-y-0"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                £{product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {!product.inStock && (
              <span className="text-xs text-red-500 font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
