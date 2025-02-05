import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    if (username === 'admin' && password === 'password') {
      login();
      localStorage.setItem('auth', 'true');
      router.push('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;