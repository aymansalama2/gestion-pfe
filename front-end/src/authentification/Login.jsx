import  { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate  } from 'react-router-dom';
import AvatarIcon from '../assets/icons/avatar.svg';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);

      if (response.data.success) {
        const userId = response.data.id;
        localStorage.setItem('userId', userId);
        console.log(userId);
        if (credentials.email === 'admin@gmail.com' && credentials.password === '123456') {
          navigate('/admin');
        } else if (credentials.email.endsWith('@employee.com')) {
          navigate('/employee');
        }
        else {
          navigate('/Profile');
        }
      } else {
        setError('Adresse e-mail ou mot de passe incorrect');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError('Erreur réseau : impossible de se connecter au serveur');
      } else {
        setError('Erreur lors de la requête : ' + error.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 rounded-lg bg-white shadow-lg">
        <div className="flex justify-center mb-4">
          <img src={AvatarIcon} alt="Avatar" className="h-24 animate-salut animate-bounce" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 ">Welcome back!</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={credentials.email}
              onChange={handleChange}
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <NavLink to={"/ChangePasswordForm"}  className="text-blue-600 hover:text-blue-500 text-sm">Forgot your password?</NavLink>

          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>        </form>
      </div>
    </div>
  );
}
