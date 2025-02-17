<?php

namespace App\Http\Controllers\Web\Qr;

use App\Algorithms\Qr\QrAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Qr\QrRequest;
use App\Models\Qr\Qr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QrController extends Controller
{
    public function get(Request $request)
    {
        $qrCodes = Qr::filter($request)
            ->with(['type'])
            ->orderBy('createdAt', 'DESC')
            ->getOrPaginate($request, true);
        return success($qrCodes);
    }

    public function create(QrRequest $request)
    {
        $algo = new QrAlgo();
        return $algo->create($request);
    }

    public function update(QrRequest $request, $id)
    {
        $qr = Qr::where('createdBy', Auth::user()->id)->find($id);
        if (empty($qr)) {
            errNotFound('QR Code');
        }

        $algo = new QrAlgo($qr);
        return $algo->update($request);
    }

    public function delete($id)
    {
        $qr = Qr::where('createdBy', Auth::user()->id)->find($id);
        if (empty($qr)) {
            errNotFound('QR Code');
        }

        $algo = new QrAlgo($qr);
        return $algo->delete();
    }
}
