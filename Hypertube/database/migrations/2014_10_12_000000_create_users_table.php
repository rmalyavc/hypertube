<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char("uid", '36');
            $table->enum('social_type', ['native', 'intra42', 'git', 'google'])->default('native');
            $table->string('social_id')->default('');
            $table->boolean('deleted')->default(0);
            $table->string("login")->unique()->default('');
            $table->string('email')->unique();
            $table->enum('lang', ['EN','RU']);
            $table->boolean('notify')->default(true);
            $table->string('password')->default('');
            $table->string('first_name')->default('');
            $table->string('last_name')->default('');
            $table->string('avatar')->default('');
            $table->boolean('user_verified')->default(0);
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
