import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WarehouseList from './pages/WarehouseList';
import WarehouseDetails from './pages/WarehouseDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WarehouseList />} />
      <Route path="/warehouse/:id" element={<WarehouseDetails />} />
    </Routes>
  );
}

export default App;
