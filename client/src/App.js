import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SearchComponent from './components/SearchComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchComponent />} />
        {/* Add other routes here if you have additional pages */}
      </Routes>
    </Router>
  );
}

export default App;
