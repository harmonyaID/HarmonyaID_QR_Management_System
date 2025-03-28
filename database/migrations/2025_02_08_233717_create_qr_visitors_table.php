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
        Schema::create('qr_visitors', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('ipAddress');
            $table->string('browser');
            $table->string('os');
            $table->string('city');
            $table->string('country');
            
            $table->foreignUuid('qrOwnedBy')->references('id')->on('users');
            $this->getDefaultTimestamps($table);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qr_visitors');
    }
};
