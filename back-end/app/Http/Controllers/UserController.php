<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Exception;
use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request)
    {
        // Valider les données de la requête
        $request->validate([
            'nom' => 'required|string',
            'domain' => 'nullable|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'telephone' => 'required|string', // Ajout de la validation pour le champ telephone
        ]);

        // Créer un nouvel utilisateur
        $user = new User();
        $user->nom = $request->nom;
        $user->domain = $request->domain;
        $user->email = $request->email;
        $user->password = $request->password; // Ne pas oublier de hasher le mot de passe avant de sauvegarder l'utilisateur
        $user->telephone = $request->telephone; // Ajouter le numéro de téléphone
        $user->save();

        // Répondre avec un message de succès
        return response()->json(['message' => 'Utilisateur enregistré avec succès'], 201);
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->only('email', 'password');

            if ($user = User::where(['email' => $credentials["email"], 'password' => $credentials["password"]])->first()) {
                return response()->json(['success' => true, 'id' => $user->id], 200);
            } else {
                return response()->json(['success' => false], 401);
            }
        } catch (Exception $e) {
            // Enregistrer l'erreur dans les journaux
            Log::error($e->getMessage());
            // Retourner une réponse d'erreur générique
            return response()->json(['success' => false, 'message' => 'Une erreur est survenue lors de la connexion. Veuillez réessayer.'], 500);
        }
    }
    public function show($id)
    {
        try {
            $user = User::findOrFail($id);
            $tasks = $user->tasks()->get();
    
            // Retourner toutes les données de l'utilisateur, y compris le mot de passe non crypté
            return response()->json([
                'id' => $user->id,
                'nom' => $user->nom,
                'domain' => $user->domain,
                'email' => $user->email,
                'password' => $user->getOriginal('password'), // Récupérer le mot de passe brut sans cryptage
                'telephone' => $user->telephone, // Ajouter le numéro de téléphone à la réponse
                'tasks' => $tasks, // Ajouter le numéro de téléphone à la réponse
            ]);
        } catch (\Exception $e) {
            // Enregistrer l'erreur dans les logs
            \Log::error('Erreur lors de la récupération des données de l\'utilisateur : ' . $e->getMessage());
            // Retourner une réponse d'erreur
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }
    }
    
   
    public function index()
    {
        try {
            $employees = User::where('email', 'LIKE', '%@employee.com')->get();
            return response()->json($employees);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la récupération des utilisateurs : ' . $e->getMessage());
            return response()->json(['error' => 'Une erreur est survenue lors de la récupération des utilisateurs.'], 500);
        }
    }

    public function getUserId(Request $request)
    {
        // Vérifiez si l'utilisateur est authentifié
        if (Auth::check()) {
            // Récupérez l'ID de l'utilisateur authentifié
            $userId = Auth::id();
            // Retournez l'ID de l'utilisateur dans la réponse JSON
            return response()->json(['id' => $userId]);
        } else {
            // Si aucun utilisateur n'est authentifié, retournez une erreur
            return response()->json(['error' => 'Aucun utilisateur n\'est actuellement authentifié'], 401);
        }
    }
    public function all()
    {
        try {
            $users = User::all();
            return response()->json($users);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la récupération des utilisateurs : ' . $e->getMessage());
            return response()->json(['error' => 'Une erreur est survenue lors de la récupération des utilisateurs.'], 500);
        }
    }
    
}
