<?php

namespace App\Http\Middleware;

use App\Models\Account\Role;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        if (!empty($user)) {
            $user = [
                'fullname'  => $user->fullname,
                'email'     => $user->email,
                'roleId'    => $user->roleId,
            ];
        }

        return [
            ...parent::share($request),
            'app_name'          => config('app.name', 'QR Code'),
            'user'              => $user,
            'superadminRoleId'  => Role::getSuperadminId(),
            'csrf_token'        => csrf_token(),
            'current_route'     => $request->route()->getName(),
        ];
    }
}
