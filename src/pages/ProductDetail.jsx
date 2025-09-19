import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  // Generate multiple images for gallery (using same image with different params)
  const productImages = [
    product.image,
    `${product.image}&blur=1`,
    `${product.image}&grayscale=1`,
    `${product.image}&sepia=1`
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const discountPercentage = ((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-lg overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map(tag => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tag === 'Sale'
                        ? 'bg-red-100 text-red-800'
                        : tag === 'New'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  £{product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      £{product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>
              
              {product.inStock ? (
                <p className="text-green-600 font-medium">In Stock</p>
              ) : (
                <p className="text-red-600 font-medium">Out of Stock</p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity & Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-gray-700 font-medium">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="bg-gray-100 rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Free delivery on orders over £50</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">2-year warranty included</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">30-day return policy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
