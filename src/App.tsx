import React from "react";
import "../src/styles/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReportEdit from "./pages/ReportEdit";
import ReportAll from "./pages/ReportAll";
import axios from "axios";
import ReportCategory from "./pages/ReportCategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "./pages/Account";

// すべてのページにcookie付与するため
axios.defaults.withCredentials = true;

// baseURLで指定にて /　から指定された時に自動的に環境変数が付与される
// axios.defaults.baseURL="http://localhost:3005";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/edit/:id" element={<ReportEdit />}></Route>
          <Route path="/report" element={<ReportAll />}></Route>
          <Route path="/report/:id" element={<ReportCategory />}></Route>
          <Route path="/account" element={<Account />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
