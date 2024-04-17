import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Admin() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]); 
  const [selectedTab, setSelectedTab] = useState('projects');
  const [showTasks, setShowTasks] = useState(false); 
  const [users, setUsers] = useState([]);

console.log(projectId)
  const fetchProjectsData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/projets`);
      setProjects(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données des projets:', error);
    }
  };

  const fetchUsersData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/aa`);
      setUsers(response.data);
      const allUsers = response.data;
      const clientUsers = allUsers.filter(user => !user.email.endsWith('@employee.com'));
      const employeeUsers = allUsers.filter(user => user.email.endsWith('@employee.com'));
      setClients(clientUsers);
      setEmployees(employeeUsers);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const fetchAllTasks = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tasks`);
      setTasks(response.data);
      setShowTasks(true);
      setSelectedTab('taches'); // Sélectionnez automatiquement l'onglet "Tâches" après le chargement des tâches
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  };
  const showProjectDetails = (project) => {
    const detailsMessage = `
      Exemples Sites Web: ${project.exemples_sites_web}
      Exigences Spécifiques: ${project.exigences_specifiques}
      Délai de Livraison: ${project.delai_livraison}
      Budget Alloué: ${project.budget_alloue}
      Fonctionnalités Requises: ${project.fonctionnalites_requises}
      Préférences de Conception: ${project.preferences_conception}
      Technologies Souhaitées: ${project.technologies_souhaitees}
      Description du Projet: ${project.description_projet}
      User ID: ${project.user_id}
      Titre du Projet: ${project.titre_projet}
    `;
    alert(detailsMessage);
  };
  
  


  useEffect(() => {
    fetchProjectsData();
    fetchUsersData();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/signup');
  };

  const getUserById = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.nom : 'Utilisateur inconnu';
  };
  const getUserByIds = (userId) => {
    return users.find(user => user.id === userId);
  };
  

  const renderContent = () => {
    switch (selectedTab) {
      case 'clients':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-8">Liste des clients</h1>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Nom</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Téléphone</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {clients.map((client) => (
                  <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{client.nom}</td>
                    <td className="py-3 px-6 text-left">{client.email}</td>
                    <td className="py-3 px-6 text-left">{client.telephone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'employees':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-8">Liste des employés</h1>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Id</th>

                  <th className="py-3 px-6 text-left">Nom</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Téléphone</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{employee.id}</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">{employee.nom}</td>
                    <td className="py-3 px-6 text-left">{employee.email}</td>
                    <td className="py-3 px-6 text-left">{employee.telephone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        case "taches":
          return(
            <div>
              <h1 className="text-3xl font-bold mt-8 mb-8">Liste des tâches</h1>
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Label de la tâche</th>
                    <th className="py-3 px-6 text-left">id de l'utilisateur</th>
                    <th className="py-3 px-6 text-left">project_id</th>

                    <th className="py-3 px-6 text-left">Nom de l'utilisateur</th>
                    <th className="py-3 px-6 text-left">Email de l'utilisateur</th>
                    <th className="py-3 px-6 text-left">Statut</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{task.label}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{task.user_id}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{task.project_id}</td>

                      <td className="py-3 px-6 text-left whitespace-nowrap">{getUserByIds(task.user_id)?.nom || 'Utilisateur inconnu'}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{getUserByIds(task.user_id)?.email || 'Email inconnu'}</td>
                      <td className="py-3 px-6 text-left">{task.status ? 'Terminé' : 'En cours'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        
        default:
          return (
            <div>
              <h1 className="text-3xl font-bold mb-8">Liste des projets</h1>
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Titre du projet</th>
                    <th className="py-3 px-6 text-left">Nom de l'utilisateur</th>
                    <th className="py-3 px-6 text-left">id de l'utilisateur</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                    <th className="py-3 px-6 text-left">Actions</th>

                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{project.titre_projet}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{getUserById(project.user_id)}</td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">{project.user_id}</td>

                      <td className="py-3 px-6 text-left">
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded" onClick={handleLogout}>Supprimer</button>
                      </td>
                      <td className="py-3 px-6 text-left">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => showProjectDetails(project)}>Détails</button>
                                      </td>
                      <td className="py-3 px-6 text-left">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => navigate(`/gestion_des_taches/${project.id}`)}>Tâches</button>
             </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <div>
            <button className={`mr-4 ${selectedTab === 'projects' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={() => setSelectedTab('projects')}>Projets</button>
            <button className={`mr-4 ${selectedTab === 'taches' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={() => fetchAllTasks()}>Tâches</button>
            <button className={`mr-4 ${selectedTab === 'clients' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={() => setSelectedTab('clients')}>Clients</button>
            <button className={`mr-4 ${selectedTab === 'employees' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={() => setSelectedTab('employees')}>Employés</button>
            
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Déconnexion</button>
          </div>
        </div>
      </nav>

      <div className="flex-grow p-6">{renderContent()}</div>
    </div>
  );
}
