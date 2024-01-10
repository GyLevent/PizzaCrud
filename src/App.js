import {
  BrowserRouter as Router,
  NavLink,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import { PizzaHome } from "./PizzaHome";
import { PizzaMod } from "./PizzaMod";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={`/`} className="nav-link">
                <span className="nav-link">Home</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<PizzaHome />} />
        <Route path="/mod/:pizzaid" element={<PizzaMod />} />
      </Routes>
    </Router>
  );
}

export default App;
