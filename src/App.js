import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import AnimeCard from './components/AnimeCardComponent';
import Navbar from './components/Navbar';
import Details from './components/AnimeDetails';

function App() {
  return (
    <Router basename="/react-metrics-anime">
      <div className="App">
        <Navbar />
        <div>
          <Routes>
            <Route exact path="/" element={<AnimeCard />} />
            <Route path="/Details" element={<Details />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
