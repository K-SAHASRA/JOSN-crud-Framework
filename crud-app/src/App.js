import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import DynamicItemList from './DynamicItemList';
import Delete from './Delete';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Add a navigation bar to switch between CRUD operations */}
        <Navbar />

        {/* Set up the routing for different CRUD pages */}
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/read" element={<Read />} />

          <Route path="/update/:id" element={<Update />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/DynamicItemList" element={<DynamicItemList />} />
          

          {/* Default route */}
          <Route path="/" element={<Read />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
