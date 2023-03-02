
import React from 'react';
// import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<Home />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
