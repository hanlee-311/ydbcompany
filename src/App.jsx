import './reset.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './Pages/Home.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/ydbcompany/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
