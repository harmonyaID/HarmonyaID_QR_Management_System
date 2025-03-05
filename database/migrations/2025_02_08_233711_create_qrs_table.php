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
        Schema::create('qrs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->json('data');
            $table->smallInteger('dataTypeId');
            $table->json('styles')->nullable();
            $table->string('image');
            $table->boolean('isDynamic')->default(false);
            $table->string('dynamicLink')->nullable();
            $table->foreignUuid('qrTypeId')->references('id')->on('qr_types');
            
            $table->foreignUuid('createdBy')->references('id')->on('users');
            $this->getDefaultTimestamps($table);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qrs');
    }
};
