import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css'
import LogIn from './LogIn.jsx'
import SignUp from './SignUp.jsx'
import ExamplePage from './example-App.jsx'
import ForgotPassword from './ForgotPassword.jsx'
import SendCode from './SendCode.jsx'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app">
        <nav>
          <div className="nav-right">
            {!isAuthenticated ? (
              <>
                <Link to="/LogIn" className="button-link">Log In</Link>
                <Link to="/SignUp" className="button-link">Sign Up</Link>
              </>
            ) : (
              <Link to="/example-App">ExamplePage</Link>
            )}
          </div>
        </nav>

        <Routes> { /* <Routes looks through its children <Route> and renders the first one that matches the currect URL */}
          <Route path="/LogIn" element={<LogIn setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/SignUp" element={<SignUp setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/SendCode" element={<SendCode setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/ForgotPassword" element={<ForgotPassword setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/example-App" element={isAuthenticated ? <ExamplePage /> : <Navigate replace to="/LogIn" />} />
          <Route path="/" element={!isAuthenticated ? <Navigate replace to="/LogIn"/> : <Navigate replace to="/example-App" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;