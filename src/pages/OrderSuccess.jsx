import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const orderNumber = 'SC' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-12 w-12 text-green-600" />
          </motion.div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Order Number:</span>
              <span className="text-sm font-bold text-gray-900">{orderNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Estimated Delivery:</span>
              <span className="text-sm text-gray-900">3-5 business days</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-3" />
              <span className="text-sm">Confirmation email sent</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Package className="h-5 w-5 mr-3" />
              <span className="text-sm">Order being prepared</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to="/products"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <Link
              to="/orders"
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors block"
            >
              View Order Details
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
