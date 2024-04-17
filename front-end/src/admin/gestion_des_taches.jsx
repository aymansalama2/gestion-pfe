import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function GestionDesTaches() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [taskInputs, setTaskInputs] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/projets/${projectId}`);
        console.log(projectId)
        console.log('Données du projet:', response.data); // Vérifier les données du projet
        setProject(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du projet:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users?email=employee.com');
        setEmployees(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };

    if (projectId) {
      fetchProject();
      fetchEmployees();
    }
  }, [projectId]);

  const handleAddTaskInput = () => {
    const newInput = { label: '', employeeId: '', id: Math.random().toString(36).substr(2, 9) };
    setTaskInputs(prevInputs => [...prevInputs, newInput]);
  };

  const handleInputChange = (id, value) => {
    const updatedInputs = taskInputs.map(input => {
      if (input.id === id) {
        return { ...input, label: value };
      }
      return input;
    });
    setTaskInputs(updatedInputs);
  };

  const handleEmployeeChange = (id, employeeId) => {
    const updatedInputs = taskInputs.map(input => {
      if (input.id === id) {
        return { ...input, employeeId };
      }
      return input;
    });
    setTaskInputs(updatedInputs);
  };

  const handleStoreInput = async (input) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/tasks`, {
        label: input.label,
        user_id: +input.employeeId,
        project_id: projectId
      });
      console.log('Tâche enregistrée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la tâche :', error);
    }
  };

  if (!project) {
    return <div className="container mx-auto px-4 py-8">Chargement...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gestion des tâches pour le projet "{project.titre_projet}"</h1> 
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Tâches du projet</h2>
          {/* Afficher ici les tâches du projet */}
        </div>
        <div>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h2 className="text-xl font-semibold mb-4">Ajouter une tâche</h2>
            {taskInputs.map(input => (
              <div key={input.id} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tâche :</label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Entrez la tâche"
                  value={input.label}
                  onChange={e => handleInputChange(input.id, e.target.value)}
                />
                <select
                  className="block appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={e => handleEmployeeChange(input.id, e.target.value)}
                >
                  <option value="">Sélectionnez un employé</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>{employee.nom}</option>
                  ))}
                </select>
                <button onClick={() => handleStoreInput(input)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Enregistrer</button>
              </div>
            ))}
            <button onClick={handleAddTaskInput} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ajouter une tâche</button>
          </div>
        </div>
      </div>
    </div>
  );
}
