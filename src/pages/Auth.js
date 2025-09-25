import React, { useState } from "react";
import { useApp } from "../context/AppContext";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, register, navigate } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
    } else {
      register(email, password, name);
    }
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button 
          className={`auth-tab ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button 
          className={`auth-tab ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Try: john@example.com "
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn btn--primary btn--full-width">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      
    </div>
  );
};

export default AuthPage;