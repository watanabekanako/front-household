import React from "react";
import "../src/styles/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReportEdit from "./pages/ReportEdit";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/edit" element={<ReportEdit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
