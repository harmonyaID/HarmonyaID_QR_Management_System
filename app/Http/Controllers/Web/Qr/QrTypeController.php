<?php

namespace App\Http\Controllers\Web\Qr;

use App\Algorithms\Qr\QrTypeAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Qr\QrTypeRequest;
use App\Models\Qr\QrType;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;

class QrTypeController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::QR_TYPES_ALL, PermissionCode::QR_TYPES_CREATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('create');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::QR_TYPES_ALL, PermissionCode::QR_TYPES_UPDATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('update');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::QR_TYPES_ALL, PermissionCode::QR_TYPES_DELETE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('delete');
    }

    public function get(Request $request)
    {
        $types = QrType::filter($request)->getOrPaginate($request, true);

        if (empty($request->groupDynamic)) {
            return success($types);
        }

        $output = [
            'dynamic'   => [],
            'static'    => []
        ];
        foreach ($types as $type) {
            $key = 'static';
            if ($type->isDynamic) {
                $key = 'dynamic';
            }

            $output[$key][] = $type;
        }

        return success($output);
    }

    public function create(QrTypeRequest $request)
    {
        $algo = new QrTypeAlgo();
        return $algo->create($request);
    }

    public function update(QrTypeRequest $request, $id)
    {
        $type = QrType::find($id);
        if (empty($type)) {
            return errNotFound(QrType::class);
        }

        $algo = new QrTypeAlgo($type);
        return $algo->update($request);
    }

    public function delete($id)
    {
        $type = QrType::find($id);
        if (empty($type)) {
            return errNotFound(QrType::class);
        }

        $algo = new QrTypeAlgo($type);
        return $algo->delete();
    }
}
