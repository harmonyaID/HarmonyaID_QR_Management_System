<?php

namespace App\Models;

use App\Parser\MainParser;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class BaseModel extends Model
{
    use HasUuids;
    use SoftDeletes;
    use GetOrPaginate;

    public $parserClass = MainParser::class;

    // Custom date times column
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    const DELETED_AT = 'deletedAt';


    // Var for generate number
    public $numberPrefix = 'GX';

    public static $snakeAttribute = false;


    /** --- SCOPES --- */

    public function scopeOfDate($query, $key = 'date', $fromDate = null, $toDate = null)
    {
        $fromDate = $fromDate ?: now()->subMonth()->format('d F Y');
        $toDate = $toDate ?: now()->format('d F Y');

        $fromDate = Carbon::createFromFormat('d F Y', $fromDate)->startOfDay();
        $toDate = Carbon::createFromFormat('d F Y', $toDate)->endOfDay();

        return $query->whereBetween($key, [$fromDate, $toDate]);
    }


    /** --- FUNCTIONS --- */

    public function hasSearch(Request $request) : bool
    {
        return $request->has('search') && !empty($request->search);
    }
    
    public function hasCreatedAt(Request $request) : bool
    {
        return !empty($request->createdFrom) && !empty($request->createdTo);
    }
}
