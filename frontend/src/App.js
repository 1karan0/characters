import React from 'react'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Character from './components/Character';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here as needed */}
      <Route path="/character/:id" element={<Character />} />
      </Routes>
    </Router>
  )
}

export default App

