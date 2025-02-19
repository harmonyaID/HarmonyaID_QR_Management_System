<?php

namespace App\Http\Controllers\Web\Qr;

use App\Algorithms\Qr\QrAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Qr\QrRequest;
use App\Models\Qr\Qr;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QrController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::QR_ALL, PermissionCode::QR_CREATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('create');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::QR_ALL, PermissionCode::QR_READ)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('get');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::QR_ALL, PermissionCode::QR_UPDATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('update');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::QR_ALL, PermissionCode::QR_DELETE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('delete');
    }

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
        $qr = Qr::find($id);
        if (empty($qr)) {
            errNotFound('QR Code');
        }

        $algo = new QrAlgo($qr);
        return $algo->update($request);
    }

    public function delete($id)
    {
        $qr = Qr::find($id);
        if (empty($qr)) {
            errNotFound('QR Code');
        }

        $algo = new QrAlgo($qr);
        return $algo->delete();
    }
}
