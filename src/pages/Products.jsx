import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/Product/ProductCard';
import { products } from '../data/products';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filters, setFilters] = useState({
    category: categoryParam || 'All',
    priceRange: 'All',
    rating: 'All',
    sortBy: 'name'
  });
  
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books'];
  const priceRanges = [
    { label: 'All', value: 'All' },
    { label: 'Under £25', value: '0-25' },
    { label: '£25 - £50', value: '25-50' },
    { label: '£50 - £100', value: '50-100' },
    { label: '£100 - £200', value: '100-200' },
    { label: 'Over £200', value: '200+' }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange !== 'All') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (filters.priceRange === '200+') {
        filtered = filtered.filter(product => product.price >= 200);
      } else {
        filtered = filtered.filter(product => 
          product.price >= min && product.price <= (max || Infinity)
        );
      }
    }

    // Rating filter
    if (filters.rating !== 'All') {
      const minRating = parseInt(filters.rating);
      filtered = filtered.filter(product => product.rating >= minRating);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* View Mode Toggle */}
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center space-x-2"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:w-64 space-y-6"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={filters.category === category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {priceRanges.map(range => (
                        <label key={range.value} className="flex items-center">
                          <input
                            type="radio"
                            name="priceRange"
                            value={range.value}
                            checked={filters.priceRange === range.value}
                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Minimum Rating</h4>
                    <div className="space-y-2">
                      {['All', '4', '3', '2', '1'].map(rating => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="radio"
                            name="rating"
                            value={rating}
                            checked={filters.rating === rating}
                            onChange={(e) => handleFilterChange('rating', e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">
                            {rating === 'All' ? 'All Ratings' : `${rating}+ Stars`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
