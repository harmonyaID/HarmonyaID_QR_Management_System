<?php

namespace App\Models\Scopes\Qr;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class QrOwnerScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        if (!Auth::user()) {
            $builder->whereNull('createdBy');
        } else {
            $builder->where('createdBy', Auth::user()->id);
        }
    }
}
