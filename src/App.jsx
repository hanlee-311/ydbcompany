// import './reset.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './Pages/Home.jsx';

function App() {
  return (
    <>
    <Home></Home>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
