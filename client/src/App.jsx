import React from "react";
import DreamForm from "./components/DreamForm";
import DreamList from "./components/DreamList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-8">🌙 Dream Journal</h1>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<DreamForm />} />
        <Route path="/dreams" element={<DreamList />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;
