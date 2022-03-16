import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Mainedit/Mainedit"
import Admin from "./components/Admin/Admin";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={ <Register />} />
        <Route path="/CKeditor" element={ <Home/> } />
        <Route path="/Admin" element={<Admin/>} />
      </Routes>
    </div>
  )
}

export default App