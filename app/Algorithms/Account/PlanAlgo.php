<?php

namespace App\Algorithms\Account;

use App\Models\Account\Plan;
use App\Services\Constant\Activity\ActivityAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PlanAlgo
{
    public function __construct(public ?Plan $plan = null)
    {
    }

    public function create(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                $this->plan = Plan::create([
                    ...$request->validated(),
                    'createdBy' => Auth::user()->id,
                ]);

                $this->plan->setActivityPropertyAttributes(ActivityAction::CREATE)
                    ->saveActivity('Create new plan: ' . $this->plan->name . '[' . $this->plan->id . ']');
            });

            return success($this->plan->toArray());

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function update(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                $this->plan->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

                $this->plan->update($request->validated());

                $this->plan->setActivityPropertyAttributes(ActivityAction::UPDATE)
                    ->saveActivity('Update plan: ' . $this->plan->name . '[' . $this->plan->id . ']');
            });

            return success($this->plan->toArray());

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function delete()
    {
        try {
            
            DB::transaction(function () {

                $this->plan->setOldActivityPropertyAttributes(ActivityAction::DELETE);

                $this->plan->delete();

                $this->plan->setActivityPropertyAttributes(ActivityAction::DELETE)
                    ->saveActivity('Delete plan: ' . $this->plan->name . '[' . $this->plan->id . ']');
            });

            return success($this->plan->toArray());

        } catch (\Throwable $th) {
            exception($th);
        }
    }
}