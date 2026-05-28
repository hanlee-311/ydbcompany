import './reset.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";

import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/ydbcompany/" element={<Home />} />
          <Route path="/ydbcompany/login" element={<Login/>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App
