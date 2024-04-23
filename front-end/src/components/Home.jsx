import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className=" min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-900 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-white font-semibold text-xl mr-8">
              Gestion de Projet
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white">
              À Propos
            </Link>
          </div>
          <div>
            <Link to="/login" className="text-gray-300 hover:text-white mr-4">
              Connexion
            </Link>
            <Link to="/signup" className="text-gray-300 hover:text-white">
              S'inscrire
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
          Gestion de Projet de Tâches
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Bienvenue sur notre plateforme de gestion de projet de tâches. Notre application vous
          permet de créer, suivre et gérer efficacement vos projets et tâches.
        </p>

        {/* Slider */}
        <Slider {...settings} className="mb-8">
  <div className="text-center">
    {/* <img src="src/assets/photos/3.jpg" alt="Slide 3" className="w-100 h-auto mx-auto rounded-lg" /> */}
  </div>
  <div className="text-center">
    {/* <img src="src/assets/photos/2.jpg" alt="Slide 2" className="w-100 h-auto mx-auto rounded-lg" /> */}
  </div>
  <div className="text-center">
    {/* <img src="src/assets/photos/4.jpg" alt="Slide 4" className="w-100 h-auto mx-auto rounded-lg" /> */}
  </div>
  <div className="text-center">
    {/* <img src="src/assets/photos/6.jpg" alt="Slide 6" className="w-100 h-auto mx-auto rounded-lg" /> */}
  </div>
  <div className="text-center">
    {/* <img src="src/assets/photos/7.jpg" alt="Slide 7" className="w-100 h-auto mx-auto rounded-lg" /> */}
  </div>
</Slider>


        {/* Feature Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Cahier des charges</h2>
            <p className="text-gray-700 mb-4">
              Ce cahier des charges vise à définir les fonctionnalités et les spécifications
              requises pour le développement d'une application de gestion de projet de tâches.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Fonctionnalités Principales</h2>
            <p className="text-gray-700 mb-4">
              Les fonctionnalités principales doivent inclure la création de projet, le suivi de
              projet et la gestion des tâches.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Fonctionnalités Avancées</h2>
            <p className="text-gray-700 mb-4">
              Les fonctionnalités avancées doivent inclure la collaboration sur les tâches, les
              notifications et les rapports/statistiques.
            </p>
          </div>

          {/* Nouvelle section de fonctionnalité */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Nouvelle Fonctionnalité</h2>
            <p className="text-gray-700 mb-4">
              Ajoutez ici une description de la nouvelle fonctionnalité que vous souhaitez inclure.
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="flex justify-center">
          <Link
            to="/signup"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full"
          >
            S'inscrire
          </Link>
        </div>
      </div>

      {/* Footer */}
<footer className="bg-gray-800 py-4">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
    {/* Texte du copyright */}
    <div className="text-white">
      © 2024 Gestion de Projet de Tâches. Tous droits réservés.
    </div>
    
    {/* Icônes des médias sociaux */}
    <div className="flex space-x-4">
      {/* Icône Twitter */}
      <a href="#" className="text-white hover:text-gray-400 transition duration-300">
        <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M22.19 5.66c-.81.37-1.68.62-2.6.73.94-.56 1.66-1.45 2-2.51-.88.52-1.86.9-2.91 1.1-.83-.9-2.02-1.46-3.33-1.46-2.52 0-4.56 2.04-4.56 4.56 0 .36.04.71.11 1.05-3.79-.19-7.15-2-9.41-4.75-.39.67-.61 1.45-.61 2.28 0 1.58.8 2.97 2.02 3.78-.74-.02-1.44-.23-2.05-.57v.06c0 2.21 1.57 4.05 3.65 4.47-.38.1-.78.15-1.2.15-.29 0-.57-.03-.84-.08.57 1.8 2.23 3.11 4.2 3.15-1.54 1.21-3.48 1.93-5.59 1.93-.36 0-.71-.02-1.06-.07 1.99 1.28 4.36 2.03 6.91 2.03 8.29 0 12.83-6.87 12.83-12.83 0-.2 0-.41-.01-.61.88-.64 1.65-1.45 2.26-2.36z"/>
        </svg>
      </a>
      
      {/* Icône Facebook */}
      <a href="https://web.facebook.com/?_rdc=1&_rdr" className="text-white hover:text-gray-400 transition duration-300">
        <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M22 2H2c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10v-8H8V9h4V7c0-2.76 2.24-5 5-5h3v4h-3c-.55 0-1 .45-1 1v2h4l-1 4h-3v8h5c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      </a>
      
      {/* Icône LinkedIn */}
      <a href="#" className="text-white hover:text-gray-400 transition duration-300">
        <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21 0H3C1.34 0 0 1.34 0 3v18c0 1.65 1.34 3 3 3h18c1.65 0 3-1.35 3-3V3c0-1.66-1.35-3-3-3zM7 19H4V8h3v11zM5.5 6.5C4.67 6.5 4 5.83 4 5s.67-1.5 1.5-1.5S7 4.17 7 5s-.67 1.5-1.5 1.5zm14 12h-3V13c0-1.38-.5-2.26-1.5-2.26C13.5 10.74 13 11.62 13 13v6h-3V8h3v1.39L16 8h4l-3.5 6 3.5 6z"/>
        </svg>
      </a>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Home;
