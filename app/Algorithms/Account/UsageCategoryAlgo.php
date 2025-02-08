<?php

namespace App\Algorithms\Account;

use App\Models\Account\UsageCategory;
use App\Services\Constant\Activity\ActivityAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UsageCategoryAlgo
{
    public function __construct(public ?UsageCategory $usageCategory = null)
    {
    }

    public function create(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

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

                $this->usageCategory = UsageCategory::create([
                    'name'      => $request->name,
                    'icon'      => $fileName,
                    'createdBy' => Auth::user()->id,
                ]);

                $this->usageCategory->setActivityPropertyAttributes(ActivityAction::CREATE)
                    ->saveActivity('Create new usage category: ' . $this->usageCategory->name . ' [' . $this->usageCategory->id . ']');
            });

            return success($this->usageCategory->toArray());

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function update(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                $oldFileName    = $this->usageCategory->icon;
                $fileName       = $this->usageCategory->icon;
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

                $this->usageCategory->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

                $this->usageCategory->update([
                    'name'  => $request->name,
                    'icon'  => $fileName,
                ]);

                $this->usageCategory->setActivityPropertyAttributes(ActivityAction::UPDATE)
                    ->saveActivity('Update usage category: ' . $this->usageCategory->name . ' [' . $this->usageCategory->id . ']');

                if ($oldFileName != $fileName) {
                    Storage::delete('public/' . $oldFileName);
                }
            });

            return success($this->usageCategory->toArray());

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function delete()
    {
        try {
            
            DB::transaction(function () {

                $this->usageCategory->setOldActivityPropertyAttributes(ActivityAction::DELETE);

                $this->usageCategory->delete();

                $this->usageCategory->setActivityPropertyAttributes(ActivityAction::DELETE)
                    ->saveActivity('Delete usage category: ' . $this->usageCategory->name . ' [' . $this->usageCategory->id . ']');
            });

            return success($this->usageCategory->toArray());

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function select()
    {
        try {
            DB::transaction(function () {

                /** @var \App\Models\Account\User */
                $user = Auth::user();

                $user->setOldActivityPropertyAttributes(ActivityAction::UPDATE);
                
                $user->update([
                    'usageCategoryId' => $this->usageCategory->id,
                ]);

                $user->setActivityPropertyAttributes(ActivityAction::UPDATE)
                    ->saveActivity('Update user ' . $user->fullname . ' [' . $user->id . '] usage category to ' . $this->usageCategory->name . ' [' . $this->usageCategory->id . ']');
        
            });
            
            return success();
        } catch (\Throwable $th) {
            exception($th);
        }
    }
}