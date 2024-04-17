import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

const Employee = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isNaN(userId)) {
          // Récupérer les données de l'utilisateur
          const userResponse = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
          setUser(userResponse.data);

          // Récupérer les tâches de l'utilisateur
          const tasksResponse = await axios.get(`http://127.0.0.1:8000/api/tasks/user/${userId}`);
          setTasks(tasksResponse.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [userId]); // userId comme dépendance de l'effet

  const getInitials = (name) => {
    return name ? name.slice(0, 2).toUpperCase() : '';
  };

  const handleTaskStatusChange = async (taskId, currentStatus) => {
    try {
      // Changer le statut de la tâche
      await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}`, { status: !currentStatus });

      // Mettre à jour localement le statut de la tâche
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la tâche :', error);
    }
  };
 

  return (
    <div className="container mx-auto bg-gray-100 py-8 px-4">
      <div className="ml-6">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full mb-4">
          <FaUserCircle className="text-2xl font-bold text-gray-600" />
        </div>
        <h2 className="text-xl font-semibold mb-2">{user.nom}</h2>
        <p className="text-gray-600 mb-2"><span className="font-bold">Domaine:</span> {user.domain}</p>
        <p className="text-gray-600 mb-2"><span className="font-bold">Email:</span> {user.email}</p>
        <p className="text-gray-600 mb-2"><span className="font-bold">Telephone:</span> {user.telephone}</p>

      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">My Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <div key={task.id} className={`bg-white rounded-lg overflow-hidden shadow-lg ${task.status ? 'opacity-50' : ''}`}>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{task.label}</h2>
              <p className="text-gray-700">Status: {task.status ? 'Done' : 'Pending'}</p>
              {!task.status && (
                <button
                  onClick={() => handleTaskStatusChange(task.id, task.status)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                >
                  Start Task
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employee;
