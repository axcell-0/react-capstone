import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import AnimeCard from './Components/AnimePage';
import Navbar from './Components/Navbar';
import Details from './Components/AnimeDetails';

function App() {
  return (
    <Router basename="/react-capstone">
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
