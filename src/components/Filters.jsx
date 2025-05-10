import React, { useState } from 'react';
import './Filters.css';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    sortBy: 'relevance',
    rating: '',
    offer: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <section className="filters">
      <h3>Filters</h3>

      {/* Sort By */}
      <div className="filter-group">
        <h4>Sort By</h4>
        <label>
          <input
            type="radio"
            name="sortBy"
            value="relevance"
            checked={filters.sortBy === 'relevance'}
            onChange={handleChange}
          />
          Relevance
        </label>
        <label>
          <input
            type="radio"
            name="sortBy"
            value="ratingHighToLow"
            checked={filters.sortBy === 'ratingHighToLow'}
            onChange={handleChange}
          />
          Ratings: High to Low
        </label>
        <label>
          <input
            type="radio"
            name="sortBy"
            value="ratingLowToHigh"
            checked={filters.sortBy === 'ratingLowToHigh'}
            onChange={handleChange}
          />
          Ratings: Low to High
        </label>
      </div>

      {/* Ratings */}
      <div className="filter-group">
        <h4>Ratings</h4>
        <label>
          <input
            type="radio"
            name="rating"
            value="4"
            checked={filters.rating === '4'}
            onChange={handleChange}
          />
          4★ & above
        </label>
        <label>
          <input
            type="radio"
            name="rating"
            value="3"
            checked={filters.rating === '3'}
            onChange={handleChange}
          />
          3★ & above
        </label>
        <label>
          <input
            type="radio"
            name="rating"
            value="2"
            checked={filters.rating === '2'}
            onChange={handleChange}
          />
          2★ & above
        </label>
      </div>

      {/* Offers */}
      <div className="filter-group">
        <h4>Offers</h4>
        <label>
          <input
            type="radio"
            name="offer"
            value="bogo"
            checked={filters.offer === 'bogo'}
            onChange={handleChange}
          />
          Buy One Get One
        </label>
        <label>
          <input
            type="radio"
            name="offer"
            value="deal"
            checked={filters.offer === 'deal'}
            onChange={handleChange}
          />
          Deals of the Day
        </label>
      </div>

      {/* Price */}
      <div className="filter-group">
        <h4>Price</h4>
        <label>
          <input
            type="radio"
            name="price"
            value="under200"
            checked={filters.price === 'under200'}
            onChange={handleChange}
          />
          Under ₹200
        </label>
        <label>
          <input
            type="radio"
            name="price"
            value="200to350"
            checked={filters.price === '200to350'}
            onChange={handleChange}
          />
          ₹200 - ₹350
        </label>
        <label>
          <input
            type="radio"
            name="price"
            value="above350"
            checked={filters.price === 'above350'}
            onChange={handleChange}
          />
          Above ₹350
        </label>
      </div>
    </section>
  );
};

export default Filters;
