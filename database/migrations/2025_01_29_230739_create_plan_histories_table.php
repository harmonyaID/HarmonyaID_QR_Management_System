<?php

use Database\Migrations\Traits\HasCustomMigration;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use HasCustomMigration;


    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plan_histories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('userId')->references('id')->on('users');
            $table->foreignUuid('planId')->references('id')->on('plans');

            $table->timestamp('startedAt');
            $table->timestamp('endedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_histories');
    }
};
