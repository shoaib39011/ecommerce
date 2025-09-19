import { faker } from '@faker-js/faker';

const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books'];

const generateProducts = (count = 50) => {
  return Array.from({ length: count }, (_, index) => {
    const category = categories[index % categories.length];
    const price = parseFloat(faker.commerce.price({ min: 10, max: 500 }));
    
    return {
      id: index + 1,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: price,
      originalPrice: price + parseFloat(faker.commerce.price({ min: 10, max: 100 })),
      image: `https://picsum.photos/400/400?random=${index + 1}`,
      category: category,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
      reviews: faker.number.int({ min: 5, max: 500 }),
      inStock: faker.datatype.boolean(0.9), // 90% chance of being in stock
      featured: index < 8, // First 8 products are featured
      tags: faker.helpers.arrayElements(['New', 'Sale', 'Popular', 'Limited'], { min: 0, max: 2 })
    };
  });
};

export const products = generateProducts();

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const searchProducts = (query) => {
  return products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
};
