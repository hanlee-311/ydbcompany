import './reset.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/ydbcompany/" element={<Home />} />
          <Route path="/ydbcompany/login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
