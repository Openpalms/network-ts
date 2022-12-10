import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className=" grid grid-cols-[300px,1fr,300px] grid-rows-[100px,1fr] gap-6">
      <div className="col-span-3 h-[50%]">
        <Navbar />
      </div>
      <div className="col-start-1 ">
        <Sidebar />
      </div>
      <div className="col-start-3">
        <Sidebar />
      </div>
      <div className=" col-start-2 row-start-2 w-[50vw]">
        <Routes>
          <Route path="" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
