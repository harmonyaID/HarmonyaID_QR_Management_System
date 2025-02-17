<?php

namespace App\Algorithms\Qr;

use App\Models\Qr\Qr;
use App\Models\Qr\QrType;
use App\Services\Constant\Activity\ActivityAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class QrAlgo
{
    public function __construct(public ?Qr $qr = null)
    {
    }

    public function create(Request $request)
    {
        try {
        
            DB::transaction(function () use ($request) {

                $type = QrType::find($request->qrTypeId);
                if (empty($type)) {
                    errNotFound(QrType::class);
                }

                $data   = $request->data;
                $styles = $request->style;

                $generated = Qr::generate($request->name, $data, $type->dataTypeId, $styles);
                if (!$generated) {
                    errDefault('Failed to generate QR Code');
                }

                if (!empty($styles['image'])) {
                    $styles['image'] = $this->moveImage($styles['image'], $request->name);
                }

                $user = Auth::user();

                $this->qr = Qr::create([
                    'name'      => $request->name,
                    'styles'    => $styles,
                    'image'     => $generated,
                    'data'      => $data,
                    'dataTypeId'=> $type->dataTypeId,
                    'qrTypeId'  => $type->id,
                    'isDynamic' => $type->isDynamic,
                    'createdBy' => $user->id,
                ]);

                $this->qr->setActivityPropertyAttributes(ActivityAction::CREATE)
                    ->saveActivity('Create new QR Code ' . $this->qr->name . '[' . $this->qr->id . ']' . ' by ' . $user->fullname);

            });

            return success($this->qr);

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function update(Request $request)
    {
        try {
        
            DB::transaction(function () use ($request) {

                $type = QrType::find($request->qrTypeId);
                if (empty($type)) {
                    errNotFound(QrType::class);
                }

                $data       = $request->data;
                $prevData   = $this->qr->data;
                $styles     = $request->style;
                $prevStyles = $this->qr->styles;

                $differentData  = json_encode($data) != json_encode($prevData);
                $differentStyles= json_encode($styles) != json_encode($prevStyles);

                $prevImage      = $this->qr->image;
                $generated      = $this->qr->image;
                $regenerated    = false;
                if ($differentData || $differentStyles) {
                    $regenerated    = true;
                    $generated      = Qr::generate($request->name, $data, $type->dataTypeId, $styles);
                    if (!$generated) {
                        errDefault('Failed to generate QR Code');
                    }
                }

                if (!empty($styles['image'])) {
                    $styles['image'] = $this->moveImage($styles['image'], $request->name);
                }

                $user = Auth::user();

                $this->qr->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

                $this->qr->update([
                    'name'      => $request->name,
                    'styles'    => $styles,
                    'image'     => $generated,
                    'data'      => $data,
                    'dataTypeId'=> $type->dataTypeId,
                    'qrTypeId'  => $type->id,
                    'isDynamic' => $type->isDynamic,
                    'createdBy' => $user->id,
                ]);

                $this->qr->setActivityPropertyAttributes(ActivityAction::UPDATE)
                    ->saveActivity('Update QR Code ' . $this->qr->name . '[' . $this->qr->id . ']' . ' by ' . $user->fullname);

                if ($regenerated) {
                    if (!empty($prevStyles['image']) && Storage::exists($prevStyles['image'])) {
                        Storage::delete($prevStyles['image']);
                    }

                    if (Storage::exists($prevImage)) {
                        Storage::delete($prevImage);
                    }
                }
            });

            return success($this->qr);

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function delete()
    {
        try {
            
            DB::transaction(function () {

                $this->qr->setOldActivityPropertyAttributes(ActivityAction::DELETE);

                $this->qr->delete();

                $this->qr->setActivityPropertyAttributes(ActivityAction::DELETE)
                    ->saveActivity('Delete QR Code ' . $this->qr->name . '[' . $this->qr->id . ']' . ' by ' . Auth::user()->fullname);

            });

            return success();
            
        } catch (\Throwable $th) {
            exception($th);
        }
    }


    private function moveImage($image, $name)
    {
        $directory = 'qr-images/' . Auth::user()->id;
        if (!Storage::exists($directory)) {
            Storage::createDirectory($directory);
        }

        $extension  = pathinfo($image, PATHINFO_EXTENSION);
        $slug       = Str::slug($name);
        $fileName   = $directory . '/' . $slug . '-' . time() . '.' . $extension;

        if (!Storage::move($image, $fileName)) {
            errDefault('Failed to move the image');
        }

        return $fileName;
    }
}