import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './component/Home';
function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          <Route exact path="/"  element={<Home/>}/>
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
