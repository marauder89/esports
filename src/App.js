import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <Link to="/p1">P1</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/p2">P2</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/p3">P3</Link>
      </header>
    </div>
  );
}

export default App;
