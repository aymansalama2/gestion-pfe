import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-gradient-to-r from-purple-300 via-pink-500 to-red-500 min-h-screen">
      <nav className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-white font-semibold text-xl mr-8">Gestion de Projet</Link>
            <Link to="/about" className="text-gray-300 hover:text-white">À Propos</Link>
          </div>
          <div>
            <Link to="/login" className="text-gray-300 hover:text-white mr-4">Connexion</Link>
            <Link to="/signup" className="text-gray-300 hover:text-white">S'inscrire</Link>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">À Propos de Gestion de Projet de Tâches</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Notre Mission</h2>
          <p className="text-lg text-gray-600 mb-8">
            Notre mission est de fournir une plateforme de gestion de projet de tâches complète et efficace, permettant à nos clients de suivre et de gérer leurs projets de manière transparente et organisée.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Nos Valeurs</h2>
          <ul className="list-disc list-inside mb-8">
            <li className="text-lg text-gray-600">Transparence</li>
            <li className="text-lg text-gray-600">Efficacité</li>
            <li className="text-lg text-gray-600">Collaboration</li>
            <li className="text-lg text-gray-600">Innovation</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">À Propos de l'Équipe</h2>
          <p className="text-lg text-gray-600 mb-8">
            Notre équipe est composée de professionnels passionnés par la gestion de projet et la technologie. Nous sommes déterminés à fournir à nos clients les meilleurs outils pour optimiser leur productivité et leur succès.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contactez-Nous</h2>
          <p className="text-lg text-gray-600">
            Pour toute question ou demande d'information, n'hésitez pas à nous contacter à l'adresse suivante : contact@gestion-projet-taches.com.
          </p>
        </div>
      </div>
      <footer className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          © 2024 Gestion de Projet de Tâches. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default About;
