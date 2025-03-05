<?php

namespace App\Algorithms\Misc;

use App\Models\Misc\Faq;
use App\Services\Constant\Activity\ActivityAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FaqAlgo
{
    public function __construct(public ?Faq $faq = null)
    {
    }

    public function create(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                $this->faq = Faq::create([
                    ...$request->validated(),
                    'deletable' => true,
                    'createdBy' => auth_user()->id,
                ]);

                $this->faq->setActivityPropertyAttributes(ActivityAction::CREATE)
                    ->saveActivity('Create new FAQ: ' . $this->faq->question . ' [' . $this->faq->id . ']');
            });

            return success($this->faq);

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function update(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                $this->faq->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

                $this->faq->update($request->validated());

                $this->faq->setActivityPropertyAttributes(ActivityAction::UPDATE)
                    ->saveActivity('Update FAQ: ' . $this->faq->question . ' [' . $this->faq->id . ']');
            });

            return success($this->faq);

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function delete()
    {
        try {
            
            DB::transaction(function () {

                $this->faq->setOldActivityPropertyAttributes(ActivityAction::DELETE);

                $this->faq->delete();

                $this->faq->setActivityPropertyAttributes(ActivityAction::DELETE)
                    ->saveActivity('Delete FAQ: ' . $this->faq->question . ' [' . $this->faq->id . ']');
            });

            return success($this->faq);

        } catch (\Throwable $th) {
            exception($th);
        }
    }
}