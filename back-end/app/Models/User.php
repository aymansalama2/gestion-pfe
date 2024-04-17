<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // Importez l'authenticatable depuis le bon espace de nom

class User extends Authenticatable // Utilisez Authenticatable comme parent
{
    use HasFactory;

    protected $fillable = ['nom', 'domain', 'email', 'password', 'telephone']; // Ajoutez 'telephone' aux fillables

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
