<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    protected $fillable = [
        'titre_projet',
        'description_projet',
        'technologies_souhaitees',
        'preferences_conception',
        'fonctionnalites_requises',
        'budget_alloue',
        'delai_livraison',
        'exigences_specifiques',
        'exemples_sites_web',
        'user_id',
        
    ];
}
