<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('roles', function (Blueprint $table) {
            if (!Schema::hasColumn($table->getTable(), 'deletable')) {
                $table->boolean('deletable')->default(false)->after('name');
            }

            $table->foreignUuid('createdBy')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('roles', function (Blueprint $table) {
            if (Schema::hasColumn($table->getTable(), 'deletable')) {
                $table->dropColumn('deletable');
            }
        });
    }
};
