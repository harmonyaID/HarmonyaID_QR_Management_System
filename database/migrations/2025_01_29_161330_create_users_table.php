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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email');
            $table->string('password');
            $table->string('rememberToken', 100)->nullable();

            $table->foreignUuid('roleId')->nullable()->references('id')->on('roles');
            $table->foreignUuid('planId')->nullable()->references('id')->on('plans');
            $table->foreignUuid('usageCategoryId')->nullable()->references('id')->on('usage_categories');

            $table->boolean('deletable')->default(false);

            $table->string('googleId')->nullable();
            $table->string('googleToken')->nullable();
            $table->string('googleExpiredAt')->nullable();
            $table->string('microsoftId')->nullable();
            $table->string('microsoftToken')->nullable();
            $table->string('microsoftExpiredAt')->nullable();
            
            $table->timestamp('emailVerifiedAt')->nullable();
            $this->getDefaultTimestamps($table);
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
