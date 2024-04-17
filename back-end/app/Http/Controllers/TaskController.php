<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth; // Importez la classe Auth

class TaskController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Valider les données de la requête
        $data = $request->validate([
            'label' => 'required|string',
            'user_id' => 'required',
            'project_id' => 'required',


        ]);
        // return response()->json($data);

        try {
            // Obtenez l'ID de l'utilisateur connecté
            $userId = Auth::id();

            // Ajoutez l'ID de l'utilisateur aux données de la tâche
            // $data['user_id'] = $userId;

            // Créer une nouvelle instance de tâche
            $task = Task::create($data);

            // Réponse JSON avec le code de statut 201 (Créé)
            return response()->json($task, 201);
        } catch (\Exception $e) {
            // En cas d'erreur, retourner une réponse JSON avec le code de statut 500 (Erreur interne du serveur)
            return response()->json(['error' => 'Erreur lors de la création de la tâche.'], 500);
        }
    }
    public function tasksByUser($userId)
    {
        try {
            // Récupérer les tâches de l'utilisateur spécifié
            $tasks = Task::where('user_id', $userId)->get();

            // Retourner les tâches en réponse JSON
            return response()->json($tasks);
        } catch (\Exception $e) {
            // En cas d'erreur, retourner une réponse JSON avec le code de statut 500 (Erreur interne du serveur)
            return response()->json(['error' => 'Erreur lors de la récupération des tâches de l\'utilisateur.'], 500);
        }
    }

    public function index()
{
    // Récupérer toutes les tâches
    $tasks = Task::all();

    return response()->json($tasks);
}
public function update(Request $request, $id)
    {
        // Récupérer la tâche à mettre à jour
        $task = Task::findOrFail($id);

        // Valider les données de la requête
        $request->validate([
            'status' => 'required|boolean' // Assurez-vous que le statut est présent dans la requête et est un boolean
        ]);

        // Mettre à jour le statut de la tâche
        $task->status = $request->status;
        $task->save();

        // Retourner une réponse appropriée
        return response()->json(['message' => 'Task status updated successfully', 'task' => $task]);
    }


}
