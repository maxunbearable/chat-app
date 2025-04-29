import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import { User } from './models';

const App = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
  };

  const handleSignup = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Chat Application</h1>
          {user && (
            <div className="user-info">
              <span>Welcome, {user.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </header>

        <Routes>
          <Route 
            path="/login" 
            element={token ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={token ? <Navigate to="/" /> : <Signup onSignup={handleSignup} />} 
          />
          <Route 
            path="/" 
            element={token ? <div>Chat Interface (Coming Soon)</div> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 