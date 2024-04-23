<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Projet;

class ProjetController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titre_projet' => 'required|string',
            'user_id' => 'required|integer',
            'description_projet' => 'nullable|string',
            'technologies_souhaitees' => 'nullable|string',
            'preferences_conception' => 'nullable|string',
            'fonctionnalites_requises' => 'nullable|string',
            'budget_alloue' => 'nullable|numeric',
            'delai_livraison' => 'nullable|date',
            'exigences_specifiques' => 'nullable|string',
            'exemples_sites_web' => 'nullable|string',
        ]);

        try {
            // Créer un nouveau projet avec les données validées
            $projet = Projet::create($validatedData);
            return response()->json(['id' => $projet->id, 'message' => 'Projet créé avec succès'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la création du projet.', 'error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            $projects = Projet::all();
            return response()->json($projects);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la récupération des projets.', 'error' => $e->getMessage()], 500);
        }
    }

    public function projetsUtilisateur($userId)
    {
        try {
            $userProjects = Projet::where('user_id', $userId)->get();
            return response()->json($userProjects);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la récupération des projets de l\'utilisateur.', 'error' => $e->getMessage()], 500);
        }
    }

  // ProjetController.php

public function destroy($id)
{
    try {
        $projet = Projet::findOrFail($id);
        $projet->delete();
        return response()->json(['message' => 'Le projet a été supprimé avec succès.']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Erreur lors de la suppression du projet.', 'error' => $e->getMessage()], 500);
    }
}

    public function show($id)
    {
        try {
            // Récupérer le projet avec l'utilisateur associé
            $projet = Projet::with('user')->findOrFail($id);
            return response()->json($projet);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Projet non trouvé'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur serveur lors de la recherche du projet'], 500);
        }
    }
}
