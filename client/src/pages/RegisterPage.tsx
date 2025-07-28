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
    await axios.post(
      '/api/auth/register',
      { name, email, password },
      { withCredentials: true }
    )
    toast.success('Registration successful!')
    navigate('/login')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Registration failed')
  }
}


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
