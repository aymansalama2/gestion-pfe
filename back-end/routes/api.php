<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjetController;

// Routes for User Controller
Route::post('/users', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/users', [UserController::class, 'index']);
Route::get('/aa', [UserController::class, 'all']);

Route::get('/user/id', [UserController::class, 'getUserId']);

// Routes for Projet Controller
Route::post('/projet', [ProjetController::class, 'store']);
Route::get('/projets/{userId}', [ProjetController::class, 'projetsUtilisateur']);
Route::delete('/projets/{id}', [ProjetController::class, 'destroy']);
Route::get('/projets/{id}', [ProjetController::class, 'show']); // Mise à jour de la route show pour éviter les conflits
Route::get('/projets', [ProjetController::class, 'index']);
Route::get('/projets/{id}', [ProjetController::class, 'show']);
// Routes for Task Controller
Route::get('tasks/user/{userId}', [TaskController::class, 'tasksByUser']);
Route::get('tasks', [TaskController::class, 'index']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::put('/tasks/{id}', [TaskController::class, 'update']);