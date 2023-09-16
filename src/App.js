import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import AnimeCard from './components/AnimePage';
import Navbar from './components/Navbar';
import Details from './components/AnimeDetails';

function App() {
  return (
    <Router>
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
