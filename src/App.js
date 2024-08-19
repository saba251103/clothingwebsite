import './App.css';
import Home from './home';
import SignupPage from './signup';
import Login from './Login';
import Nextpage from './nextpage';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/nextpage" element={<Nextpage/>} />
          <Route path="/" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;