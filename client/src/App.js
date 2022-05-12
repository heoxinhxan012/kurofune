import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "./pages/authLayout/index.jsx";
import { Login } from "./pages/login/index.jsx";
import { Register } from "./pages/register/index.jsx";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
