// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AvatarIcon from '../assets/icons/avatar.svg';

export default function SignUp() {
  const [nom, setNom] = useState('');
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState(''); // Nouvel état pour le champ téléphone
  const navigate = useNavigate();

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTelephoneChange = (event) => { // Fonction de gestion pour mettre à jour le champ téléphone
    setTelephone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`You submitted the form, nom: ${nom}, domain: ${domain}, telephone: ${telephone}`); // Ajout du téléphone dans le message de journalisation

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users', {
        nom,
        domain,
        email,
        password,
        telephone, // Ajout du téléphone dans les données envoyées au serveur
      });

      console.log(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <section className="bg- min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-whit-300 rounded-lg shadow p-6 ">

        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center">
          Create an account
        </h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900">Nom :</label>
            <input type="text" className="w-full bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" id="nom" name="nom" placeholder="Votre nom" value={nom} onChange={handleNomChange} required />
          </div>

          <div>
            <label htmlFor="domain" className="block mb-2 text-sm font-medium text-gray-900">Domain :</label>
            <input type="text" className="w-full bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" id="domain" name="domain" placeholder="Votre domaine professionnel" value={domain} onChange={handleDomainChange} />
            <small className="block text-sm text-gray-500">Ex: informatique</small>
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email :</label>
            <input type="email" className="w-full bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" id="email" name="email" placeholder="Votre email" value={email} onChange={handleEmailChange} required />
          </div>

          <div>
            <label htmlFor="telephone" className="block mb-2 text-sm font-medium text-gray-900">Téléphone :</label>
            <input type="text" className="w-full bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" id="telephone" name="telephone" placeholder="Votre numéro de téléphone" value={telephone} onChange={handleTelephoneChange} required />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mot de passe :</label>
            <input type="password" className="w-full bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" id="password" name="password" placeholder="Choisissez un mot de passe fort" value={password} onChange={handlePasswordChange} required />
          </div>

          <div className="flex items-center">
            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-primary-300 focus:ring-offset-gray-800" required />
            <label htmlFor="terms" className="ml-2 text-sm font-light text-gray-500">I accept the <Link to="#" className="font-medium text-blue-600 hover:underline">Terms and Conditions</Link></label>
          </div>

          <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>

          <p className="text-sm font-light text-gray-500 text-center">
            Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login here</Link>
          </p>
        </form>
        
      </div>
    </section>
  );
}
