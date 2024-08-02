import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateWarehouse, addCustomField, updateCustomField } from '../redux/warehouseSlice';
import { FaPlus, FaTimes, FaEdit, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';

const WarehouseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const warehouse = useSelector((state) => state.warehouse.warehouses.find(w => w.id === parseInt(id)));
  const [editedWarehouse, setEditedWarehouse] = useState(warehouse || {});
  const [newField, setNewField] = useState({ key: '', value: '', type: 'text', options: [] });
  const [showPopup, setShowPopup] = useState(false);
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    if (warehouse) {
      setEditedWarehouse(warehouse);
    }
  }, [warehouse]);

  const handleChange = (e) => {
    setEditedWarehouse({
      ...editedWarehouse,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    dispatch(updateWarehouse({ id: editedWarehouse.id, updatedData: editedWarehouse }));
    toast.success('Warehouse details updated successfully!');
  };

  const handleAddField = () => {
    dispatch(addCustomField({ id: editedWarehouse.id, field: newField.key, value: newField.value, type: newField.type, options: newField.options }));
    toast.success('Custom field added successfully!');
    setNewField({ key: '', value: '', type: 'text', options: [] });
    setShowPopup(false);
  };

  const handleFieldChange = (index, e) => {
    const updatedFields = [...editedWarehouse.customFields];
    updatedFields[index] = { ...updatedFields[index], [e.target.name]: e.target.value };
    setEditedWarehouse({ ...editedWarehouse, customFields: updatedFields });
  };

  const handleSaveField = (index) => {
    const updatedField = editedWarehouse.customFields[index];
    dispatch(updateCustomField({ id: editedWarehouse.id, fieldIndex: index, field: updatedField }));
    setEditingField(null);
    toast.success('Custom field updated successfully!');
  };

  return (
    <div key={editedWarehouse.id} className="warehouse-details">
      <div className="details-header">
        <h1>Warehouse Details</h1>
      </div>
      {warehouse ? (
        <>
          <div className="details-form">
            <div className="warehouse-photo-container">
              <img 
                src={editedWarehouse.photo ? `/assets/${editedWarehouse.photo}` : '/assets/default-photo.jpg'} 
                alt={editedWarehouse.name} 
                className="warehouse-photo"
                onError={(e) => e.target.src = '/assets/default-photo.jpg'} 
              />
              <div className="add-field-icon" onClick={() => setShowPopup(true)}>
                <FaPlus />
              </div>
            </div>
            <div>
              <label>Warehouse Name:</label>
              <input type="text" name="name" value={editedWarehouse.name} onChange={handleChange} />
            </div>
            <div>
              <label>Cluster:</label>
              <input type="text" name="cluster" value={editedWarehouse.cluster} onChange={handleChange} />
            </div>
            <div>
              <label>City:</label>
              <input type="text" name="city" value={editedWarehouse.city} onChange={handleChange} />
            </div>
            <div>
              <label>Space Available:</label>
              <input type="number" name="space_available" value={editedWarehouse.space_available} onChange={handleChange} />
            </div>
            <div>
              <label>Live Status:</label>
              <select name="is_live" value={editedWarehouse.is_live} onChange={handleChange}>
                <option value={true}>Live</option>
                <option value={false}>Not Live</option>
              </select>
            </div>
            <div className="custom-fields">
              {editedWarehouse.customFields && editedWarehouse.customFields.map((field, index) => (
                <div key={index}>
                  <label>{field.key}:</label>
                  {editingField === index ? (
                    <>
                      {field.type === 'dropdown' ? (
                        <select name="value" value={field.value} onChange={(e) => handleFieldChange(index, e)}>
                          {field.options.map((option, idx) => (
                            <option key={idx} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input 
                          type={field.type} 
                          name="value"
                          value={field.value}
                          onChange={(e) => handleFieldChange(index, e)}
                        />
                      )}
                      <button onClick={() => handleSaveField(index)}><FaSave /></button>
                    </>
                  ) : (
                    <>
                      {field.type === 'dropdown' ? (
                        <select value={field.value} disabled>
                          {field.options.map((option, idx) => (
                            <option key={idx} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input type={field.type} value={field.value} readOnly />
                      )}
                      <button onClick={() => setEditingField(index)}><FaEdit /></button>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button onClick={handleUpdate}>Update</button>
          </div>

          {showPopup && (
            <div className="popup-overlay show" onClick={() => setShowPopup(false)}>
              <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="popup-close-icon" onClick={() => setShowPopup(false)}>
                  <FaTimes />
                </div>
                <h2>Add Custom Field</h2>
                <div>
                  <label>Field Name:</label>
                  <input
                    type="text"
                    placeholder="Field Name"
                    value={newField.key}
                    onChange={(e) => setNewField({ ...newField, key: e.target.value })}
                  />
                </div>
                <div>
                  <label>Field Type:</label>
                  <select
                    value={newField.type}
                    onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                  >
                    <option value="textarea">Textarea</option>
                    <option value="number">Number</option>
                    <option value="dropdown">Dropdown</option>
                  </select>
                </div>
                {newField.type === 'dropdown' && (
                  <div>
                    <label>Options (comma-separated):</label>
                    <input
                      type="text"
                      placeholder="Option1, Option2, Option3"
                      value={newField.options.join(', ')}
                      onChange={(e) => setNewField({ ...newField, options: e.target.value.split(',').map(option => option.trim()) })}
                    />
                  </div>
                )}
                <button className="add-field-btn" onClick={handleAddField}>Add Field</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <h2>Warehouse Not recognized!</h2>
          <p>Contact the officials to authorize the Warehouse</p>
        </>
      )}
    </div>
  );
};

export default WarehouseDetails;
