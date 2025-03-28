<?php

namespace App\Http\Controllers\Frontend\Qr;

use App\Http\Controllers\Controller;
use App\Models\Qr\Qr;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class QrController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(
                PermissionCode::QR_ALL, 
                PermissionCode::QR_CREATE,
                PermissionCode::QR_READ,
                PermissionCode::QR_UPDATE,
                PermissionCode::QR_DELETE,
            )) {
                return redirect()->route('frontend.app.dashboard.index')->withErrors('Unauthorized');
            }

            return $next($request);
        })->only('index');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(
                PermissionCode::QR_ALL, 
                PermissionCode::QR_CREATE,
            )) {
                return redirect()->route('frontend.app.dashboard.index')->withErrors('Unauthorized');
            }

            return $next($request);
        })->only('create');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(
                PermissionCode::QR_ALL, 
                PermissionCode::QR_UPDATE,
            )) {
                return redirect()->route('frontend.app.dashboard.index')->withErrors('Unauthorized');
            }

            return $next($request);
        })->only('edit');
    }

    public function index()
    {
        return Inertia::render('app/qr/Qr');
    }

    public function image($id)
    {
        $qr = Qr::find($id);
        if (empty($qr)) {
            errNotFound('Image');
        }

        if (!Storage::exists($qr->image)) {
            errNotFound('Image');
        }

        return response()->file(storage_path('app/' . $qr->image));
    }

    public function embeddedImage($id)
    {
        $qr = Qr::find($id);
        if (empty($qr?->styles['image'])) {
            errNotFound('Embedded Image');
        }

        if (!Storage::exists($qr->styles['image'])) {
            errNotFound('Embedded Image');
        }

        return response()->file(storage_path('app/' . $qr->styles['image']));
    }

    public function create()
    {
        $generator = strtolower(config('qr.generator'));
        return Inertia::render('app/qr/QrCreate', [ 'generator' => $generator ]);
    }

    public function edit($id)
    {
        $qr = Qr::with(['type'])
            ->find($id);

        $generator = strtolower(config('qr.generator'));
        return Inertia::render('app/qr/QrEdit', [ 'data' => $qr, 'generator' => $generator ]);
    }
}
