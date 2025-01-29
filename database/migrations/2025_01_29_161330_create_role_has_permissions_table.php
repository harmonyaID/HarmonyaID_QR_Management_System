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
        Schema::create('role_has_permissions', function (Blueprint $table) {
            $table->foreignUuid('roleId')->references('id')->on('roles');
            $table->foreignUuid('permissionId')->references('id')->on('permissions');

            $table->primary(['roleId', 'permissionId']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_has_permissions');
    }
};
