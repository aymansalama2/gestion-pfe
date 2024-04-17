import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PageClient() {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/signup');
  };

  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
      setUser(userResponse.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
    }
  };

  const fetchUserProjects = async () => {
    try {
      const projectsResponse = await axios.get(`http://127.0.0.1:8000/api/projets/${userId}`);
      setUserProjects(projectsResponse.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des projets de l'utilisateur :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserProjects();
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <section className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Bienvenue sur votre page Client !</h1>
        <p>Voici les projets auxquels vous êtes associé :</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {/* Informations utilisateur */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 flex items-center justify-between">
              {/* Avatar */}
              <div className="flex items-center relative">
                <div className="relative inline-block w-16 h-16 overflow-hidden bg-gray-300 rounded-full">
                  <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold text-xl">
                    {user.nom ? user.nom.substring(0, 2).toUpperCase() : ''}
                  </span>
                </div>
              </div>
              <div className="ml-6">
                <h2 className="text-xl font-semibold mb-2">{user.nom}</h2>
                <p className="text-gray-600 mb-2"><span className="font-bold">Domaine:</span> {user.domain}</p>
                <p className="text-gray-600 mb-2"><span className="font-bold">Email:</span> {user.email}</p>
                <p className="text-gray-600 mb-2"><span className="font-bold">Telephone:</span> {user.telephone}</p>
              </div>
            </div>
          </div>

          {/* Liste des projets */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Liste des projets</h2>
              {userProjects.length === 0 ? (
                <p>Aucun projet.</p>
              ) : (
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Nom</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userProjects.map((projet, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{projet.titre_projet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Boutons */}
              <div className="mt-8 flex justify-between">
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Déconnexion</button>
                <button onClick={() => navigate("/DemandeClient")} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Ajouter un projet</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
