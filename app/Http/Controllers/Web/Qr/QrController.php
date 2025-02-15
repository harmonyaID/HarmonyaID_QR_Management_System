<?php

namespace App\Http\Controllers\Web\Qr;

use App\Algorithms\Qr\QrAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Qr\CreateQrRequest;
use Illuminate\Http\Request;

class QrController extends Controller
{
    public function index(Request $request)
    {

    }

    public function create(CreateQrRequest $request)
    {
        $algo = new QrAlgo();
        return $algo->create($request);
    }
}
