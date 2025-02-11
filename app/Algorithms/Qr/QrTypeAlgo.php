<?php

namespace App\Algorithms\Qr;

use App\Models\Qr\QrType;
use App\Services\Constant\Activity\ActivityAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QrTypeAlgo
{
    public function __construct(public ?QrType $qrType = null)
    {
    }

    public function create(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                $this->qrType = QrType::create([
                    ...$request->validated(),
                    'createdBy' => Auth::user()->id,
                ]);

                $this->qrType->setActivityPropertyAttributes(ActivityAction::CREATE)
                    ->saveActivity('Create new qr type: ' . $this->qrType->name . '[' . $this->qrType->id . ']');
            });

            return success($this->qrType->toArray());

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function update(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                $this->qrType->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

                $this->qrType->update($request->validated());

                $this->qrType->setActivityPropertyAttributes(ActivityAction::UPDATE)
                    ->saveActivity('Update qr type: ' . $this->qrType->name . '[' . $this->qrType->id . ']');
            });

            return success($this->qrType->toArray());

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function delete()
    {
        try {
            
            DB::transaction(function () {

                $this->qrType->setOldActivityPropertyAttributes(ActivityAction::DELETE);

                $this->qrType->delete();

                $this->qrType->setActivityPropertyAttributes(ActivityAction::DELETE)
                    ->saveActivity('Delete qr type: ' . $this->qrType->name . '[' . $this->qrType->id . ']');
            });

            return success($this->qrType->toArray());

        } catch (\Throwable $th) {
            exception($th);
        }
    }
}