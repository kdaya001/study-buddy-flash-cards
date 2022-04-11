import React, { useEffect, useState } from 'react';
// import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { View } from './components/View';
import { Create } from './components/Create';



function App() {
  return (
    <BrowserRouter>
      <h1>Study Buddy</h1>
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
