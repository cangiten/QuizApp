<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->bigIncrements('QnId');
            $table->string('Qn',250)->nullable();
            $table->string('ImageName',50)->nullable();
            $table->string('Option1',50)->nullable();
            $table->string('Option2',50)->nullable();
            $table->string('Option3',50)->nullable();
            $table->string('Option4',50)->nullable();
            $table->integer('Answer')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
