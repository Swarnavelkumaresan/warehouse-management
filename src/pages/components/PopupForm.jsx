import React, { useState } from 'react';

const PopupForm = ({ showForm, onClose, onAddWarehouse }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    cluster: '',
    space_available: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  // Confirm addition
  const handleConfirm = () => {
    setIsSubmitting(true);
    onAddWarehouse(formData);
    setFormData({ name: '', city: '', cluster: '', space_available: '' });
    setShowConfirmation(false);
  };

  // Cancel addition
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  if (!showForm) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-popup" onClick={onClose}>×</button>
        <div className="popup-form">
          <h2>Add New Warehouse</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Warehouse Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="cluster"
              placeholder="Cluster"
              value={formData.cluster}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="space_available"
              placeholder="Space Available"
              value={formData.space_available}
              onChange={handleInputChange}
              required
            />
            <button type="submit" disabled={isSubmitting}>Add Warehouse</button>
          </form>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-container">
            <h3>Confirm Addition</h3>
            <p>Are you sure you want to add this warehouse? This action cannot be undone.</p>
            <div className="confirmation-buttons">
              <button className="confirm-btn" onClick={handleConfirm}>Yes, Add</button>
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupForm;
