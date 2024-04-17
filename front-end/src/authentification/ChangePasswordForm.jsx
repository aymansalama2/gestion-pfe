import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ChangePasswordForm({ userId }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/users/${userId}/password`, { password });
      setSuccess('Mot de passe mis à jour avec succès');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('Erreur lors de la mise à jour du mot de passe');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 rounded-lg bg-white shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 ">Changez votre mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmer le mot de passe"
            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Modifier le mot de passe
        </button>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600 hover:text-blue-500 text-sm">Retour à la page de connexion</Link>
        </div>
      </form>
    </div>
  );
}
