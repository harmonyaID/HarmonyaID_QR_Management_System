<?php

namespace App\Algorithms\Qr;

use App\Models\Qr\QrType;
use App\Services\Constant\Activity\ActivityAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class QrTypeAlgo
{
    public function __construct(public ?QrType $qrType = null)
    {
    }

    public function create(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                if (!Storage::exists($request->icon)) {
                    errInvalid('Unable to find the icon, please reupload it');
                }

                $directory = 'public/images/qr-type';
                if (!Storage::exists($directory)) {
                    Storage::createDirectory($directory);
                }

                $slug       = Str::slug($request->name);
                $fileName   = $directory . '/' . $slug . '-' . time() . '.webp';

                if (!Storage::move($request->icon, $fileName)) {
                    errDefault('Failed to move the icon');
                }

                $fileName = str_replace('public/', '', $fileName);

                $this->qrType = QrType::create([
                    ...$request->validated(),
                    'icon'      => $fileName,
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

                $oldFileName    = $this->qrType->icon;
                $fileName       = $this->qrType->icon;
                if (!empty($request->icon)) {
                    if (!Storage::exists($request->icon)) {
                        errInvalid('Unable to find the icon, please reupload it');
                    }
    
                    $directory = 'public/images/usage-category';
                    if (!Storage::exists($directory)) {
                        Storage::createDirectory($directory);
                    }
    
                    $slug       = Str::slug($request->name);
                    $fileName   = $directory . '/' . $slug . '-' . time() . '.webp';
    
                    if (!Storage::move($request->icon, $fileName)) {
                        errDefault('Failed to move the icon');
                    }
    
                    $fileName = str_replace('public/', '', $fileName);
                }

                $this->qrType->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

                $this->qrType->update([
                    ...$request->validated(),
                    'icon' => $fileName
                ]);

                $this->qrType->setActivityPropertyAttributes(ActivityAction::UPDATE)
                    ->saveActivity('Update qr type: ' . $this->qrType->name . '[' . $this->qrType->id . ']');

                if ($oldFileName != $fileName) {
                    Storage::delete('public/' . $oldFileName);
                }
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