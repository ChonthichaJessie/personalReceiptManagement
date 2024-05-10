import React  from 'react';
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReceiptsStorage from "./ReceiptsStorage";
import styled from "styled-components";
const Home = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/receipts" element={<ReceiptsStorage />} />
        </Routes>
      </Router>
    </div>
  );
};
export default Home;


