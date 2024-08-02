import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectWarehouse, addWarehouse } from '../redux/warehouseSlice';
import Slider from 'react-slick';
import PopupForm from './components/PopupForm';
import { toast } from 'react-toastify';

const photoOptions = [
  'carousel1.jpg',
  'carousel2.jpg',
  'carousel3.jpg',
  'carousel4.jpg',
  'default-photo.jpg'
];

const getRandomPhoto = () => {
  const randomIndex = Math.floor(Math.random() * photoOptions.length);
  return photoOptions[randomIndex];
};

const WarehouseList = () => {
  const dispatch = useDispatch();
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ city: '', cluster: '', space: '' });
  const [showForm, setShowForm] = useState(false);

  const filteredWarehouses = warehouses.filter((w) =>
    (w.name.toLowerCase().includes(search.toLowerCase())) &&
    (filters.city === '' || w.city === filters.city) &&
    (filters.cluster === '' || w.cluster === filters.cluster) &&
    (filters.space === '' || w.space_available >= filters.space)
  );

  // Handle adding new warehouse
  const handleAddWarehouse = (warehouse) => {
    dispatch(addWarehouse(warehouse));
    setShowForm(false);
    toast.success('New Warehouse added successfully!');
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    appendDots: (dots) => (
      <div style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center' }}>
        <ul style={{ margin: '0px', padding: '0px', display: 'inline-block' }}>{dots}</ul>
      </div>
    )
  };

  return (
    <div className="warehouse-list">
      <div className="Nav">
        <h1>Warehouse Lister</h1>
        <button className="add-warehouse-btn" onClick={() => setShowForm(true)}>
          Add New Warehouse
        </button>
      </div>
      {/* Carousel Component */}
      <div className="carousel-container">
        <Slider {...carouselSettings}>
          <div><img src="/assets/carousel1.jpg" alt="Carousel 1" /></div>
          <div><img src="/assets/carousel2.jpg" alt="Carousel 2" /></div>
          <div><img src="/assets/carousel3.jpg" alt="Carousel 3" /></div>
          <div><img src="/assets/carousel4.jpg" alt="Carousel 4" /></div>
        </Slider>
      </div>
      <div className='filter-div'>
        <div className="search-filter-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Filter options */}
        <div className="inline-filter-container">
          <select name="city" onChange={handleFilterChange} value={filters.city}>
            <option value="">All Cities</option>
            {[...new Set(warehouses.map(w => w.city))].map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <select name="cluster" onChange={handleFilterChange} value={filters.cluster}>
            <option value="">All Clusters</option>
            {[...new Set(warehouses.map(w => w.cluster))].map(cluster => (
              <option key={cluster} value={cluster}>{cluster}</option>
            ))}
          </select>
          <input
            type="number"
            name="space"
            placeholder="Space available"
            value={filters.space}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="warehouse-cards">
        {filteredWarehouses.map((warehouse) => (
          <Link
            to={`/warehouse/${warehouse.id}`}
            key={warehouse.id}
            onClick={() => dispatch(selectWarehouse(warehouse.id))}
            className="warehouse-card-link"
          >
            <div className="warehouse-card">
              <img 
                src={`/assets/warehouse-photos/${getRandomPhoto()}`} 
                alt={warehouse.name} 
                className="warehouse-photo" 
              />
              <div className="warehouse-info">
                <h2>{warehouse.name}</h2>
                <p>{warehouse.city}</p>
                <p>{warehouse.cluster}</p>
                <p>Space Available: {warehouse.space_available} sq ft</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Form for adding new warehouse */}
      {showForm && (
        <PopupForm
          showForm={showForm}
          onClose={() => setShowForm(false)}
          onAddWarehouse={handleAddWarehouse}
        />
      )}
    </div>
  );
};

export default WarehouseList;
