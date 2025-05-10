import React from 'react';
import './AllCategories.css';
import Card from './Card';

const products = [
  {
    name: "Cheese Corn Pasta",
    price: "₹70",
    time: "20–30 mins",
    distance: "1.9 km",
    rating: "3.5",
    offer: "30% OFF up to ₹75",
    image: "cheese-corn-pasta.jpg",
    shop: "Kulhad Cheese Corner"
  },
  // Add more product objects as needed
];

const AllCategories = () => {
  return (
    <section className="all-categories">
      <h2 className="section-title">All Cuisines & Dishes</h2>
      <div className="categories-grid">
        {/* Render your categories here */}
      </div>

      <h2 className="section-title">Popular Dishes</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllCategories;
