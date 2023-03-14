import React from "react";
import "../src/styles/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReportEdit from "./pages/ReportEdit";
import axios from "axios";


// すべてのページにcookie付与するため
axios.defaults.withCredentials=true;

// baseURLで指定にて /　から指定された時に自動的に環境変数が付与される
// axios.defaults.baseURL="http://localhost:3005";
axios.defaults.baseURL=process.env.REACT_APP_BASE_URL;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/edit/:id" element={<ReportEdit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
