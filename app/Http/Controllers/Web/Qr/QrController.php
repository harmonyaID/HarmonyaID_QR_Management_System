<?php

namespace App\Http\Controllers\Web\Qr;

use App\Algorithms\Qr\QrAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Qr\CreateQrRequest;
use App\Models\Qr\Qr;
use Illuminate\Http\Request;

class QrController extends Controller
{
    public function get(Request $request)
    {
        $qrCodes = Qr::filter($request)
            ->with(['type'])
            ->getOrPaginate($request, true);
        return success($qrCodes->toArray());
    }

    public function create(CreateQrRequest $request)
    {
        $algo = new QrAlgo();
        return $algo->create($request);
    }
}
