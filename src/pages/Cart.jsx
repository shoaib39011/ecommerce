import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Shopping</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 transition-colors font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  layout
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-lg font-bold text-gray-900 mt-2">
                        £{item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      
                      <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-gray-600">Item total:</span>
                    <span className="text-lg font-semibold text-gray-900">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 sticky top-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">£{getCartTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">
                    {getCartTotal() >= 50 ? 'Free' : '£4.99'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-semibold">£{(getCartTotal() * 0.2).toFixed(2)}</span>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>
                    £{(getCartTotal() + (getCartTotal() >= 50 ? 0 : 4.99) + getCartTotal() * 0.2).toFixed(2)}
                  </span>
                </div>
              </div>

              {getCartTotal() < 50 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                  <p className="text-blue-700 text-sm">
                    Add £{(50 - getCartTotal()).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <Link
                to="/checkout"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                to="/products"
                className="w-full mt-3 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center block"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
