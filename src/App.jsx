import './reset.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";

import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Wholesale from './Pages/Wholesale.jsx';
import Form from './Pages/Form.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/ydbcompany/" element={<Home />} />
          <Route path="/ydbcompany/login" element={<Login/>} />
          <Route path="/ydbcompany/form" element={<Form/>} />
          <Route path="/ydbcompany/wholesale" element={<Wholesale/>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App
