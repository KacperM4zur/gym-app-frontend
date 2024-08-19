import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Guides from "./pages/Guides.jsx";
import Contact from "./pages/Contact.jsx";
import Faq from "./pages/Faq.jsx";


function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </Router>
  );
}

export default App
