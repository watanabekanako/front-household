import React from 'react';
// import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AuthLayout/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
