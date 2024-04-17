<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->boolean('status')->default(false); // Ajout du champ status avec une valeur par défaut de false
            
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            
            // Correction du nom de la table à référencer
            $table->unsignedBigInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projets')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            // Suppression de la contrainte de clé étrangère pour project_id
            $table->dropForeign(['project_id']);
        });
    
        Schema::dropIfExists('tasks');
    }
}
