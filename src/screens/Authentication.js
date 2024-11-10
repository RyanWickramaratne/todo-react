import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles.css';

function Authentication({ mode }) {
  const { signUp, signIn } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const isSignUp = mode === 'signup';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate('/');
    } catch (error) {
      alert('Error: ' + (error.response ? error.response.data.error : 'General error'));
    }
  };

  return (
    <div className="container">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">{isSignUp ? 'Register' : 'Login'}</button>
      </form>
      <div className="link">
        {isSignUp ? (
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        ) : (
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        )}
      </div>
    </div>
  );
}

export default Authentication;
