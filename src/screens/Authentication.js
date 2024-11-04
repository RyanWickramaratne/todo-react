import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

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
        const token = await signUp(email, password);
        console.log('Received Token on Sign Up:', token);
      } else {
        const token = await signIn(email, password);
        console.log('Received Token on Sign In:', token);
      }
      console.log('Stored Token:', sessionStorage.getItem('token'));
      navigate('/');
    } catch (error) {
      alert('Error: ' + (error.response ? error.response.data.error : 'General error'));
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">{isSignUp ? 'Register' : 'Login'}</button>
      </form>
    </div>
  );
}

export default Authentication;
