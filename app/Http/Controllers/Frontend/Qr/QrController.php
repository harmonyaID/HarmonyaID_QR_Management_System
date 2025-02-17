<?php

namespace App\Http\Controllers\Frontend\Qr;

use App\Http\Controllers\Controller;
use App\Models\Qr\Qr;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class QrController extends Controller
{
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
        return Inertia::render('app/qr/QrCreate');
    }

    public function edit($id)
    {
        $qr = Qr::with(['type'])
            ->find($id);
        return Inertia::render('app/qr/QrEdit', ['data' => $qr]);
    }
}
