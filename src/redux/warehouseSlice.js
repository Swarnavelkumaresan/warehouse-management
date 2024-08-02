import { createSlice } from '@reduxjs/toolkit';
import warehouses from '../warehouses.json';

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState: {
    warehouses: warehouses,
    selectedWarehouse: null,
  },
  reducers: {
    selectWarehouse: (state, action) => {
      state.selectedWarehouse = state.warehouses.find(w => w.id === action.payload);
    },
    updateWarehouse: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.warehouses.findIndex(w => w.id === id);
      if (index !== -1) {
        state.warehouses[index] = { ...state.warehouses[index], ...updatedData };
      }
    },
    addWarehouse: (state, action) => {
      state.warehouses.push(action.payload);
    },
    addCustomField: (state, action) => {
      const { id, field, value, type, options } = action.payload;
      const index = state.warehouses.findIndex(w => w.id === id);
      if (index !== -1) {
        state.warehouses[index].customFields = [
          ...(state.warehouses[index].customFields || []),
          { key: field, value, type, options },
        ];
      }
    },
    updateCustomField: (state, action) => {
      const { id, fieldIndex, field } = action.payload;
      const index = state.warehouses.findIndex(w => w.id === id);
      if (index !== -1) {
        state.warehouses[index].customFields[fieldIndex] = field;
      }
    },
  },
});

export const { selectWarehouse, updateWarehouse, addWarehouse, addCustomField, updateCustomField } = warehouseSlice.actions;

export default warehouseSlice.reducer;
