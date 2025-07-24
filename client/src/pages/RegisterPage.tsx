// src/pages/RegisterPage.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'


const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    await axios.post('http://localhost:8080/api/auth/register', {
    name,
    email,
    password,
    }, { withCredentials: true })

    toast.success('Account created successfully!', {
        position: "top-right",
        autoClose: 3000,
        theme: 'colored',
    });

    navigate('/');

  } catch (err: any) {
    console.error('Network or server error:', err);
    setError(err?.response?.data?.message || 'Something went wrong');
  }
};


  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
