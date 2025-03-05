<?php

namespace App\Http\Controllers\Web\Account;

use App\Algorithms\Account\UserAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\CreateUserRequest;
use App\Http\Requests\Account\UpdateUserRequest;
use App\Models\Account\User;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::USERS_ALL, PermissionCode::USERS_CREATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('create');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::USERS_ALL, PermissionCode::USERS_READ)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('get');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::USERS_ALL, PermissionCode::USERS_UPDATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('update');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::USERS_ALL, PermissionCode::USERS_DELETE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('delete');
    }

    public function get(Request $request)
    {
        $users = User::filter($request)
            ->with(['usageCategory', 'role'])
            ->withCount(['qrCodes as createdQrCodes'])
            ->getOrPaginate($request, true);

        return success($users);
    }

    public function create(CreateUserRequest $request)
    {
        $algo = new UserAlgo();
        return $algo->create($request);
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::find($id);
        if (empty($user)) {
            errNotFound(User::class);
        }

        $algo = new UserAlgo($user);
        return $algo->update($request);
    }

    public function delete($id)
    {
        $user = User::find($id);
        if (empty($user)) {
            errNotFound(User::class);
        }

        $algo = new UserAlgo($user);
        return $algo->delete();
    }
}
