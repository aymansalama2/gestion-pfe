<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projets', function (Blueprint $table) {
            $table->id();
            $table->string('titre_projet');
            $table->string('description_projet')->nullable();
            $table->string('technologies_souhaitees')->nullable();
            $table->string('preferences_conception')->nullable();
            $table->text('fonctionnalites_requises')->nullable();
            $table->decimal('budget_alloue', 10, 2)->nullable();
            $table->date('delai_livraison')->nullable();
            $table->text('exigences_specifiques')->nullable();
            $table->text('exemples_sites_web')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->boolean('valide')->default(false); // Ajout de la colonne 'valide' avec la valeur par défaut 'false'

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projets');
    }
}
