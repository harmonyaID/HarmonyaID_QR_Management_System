<?php

namespace App\Parser\Account;

use Logia\Core\Parser\BaseParser;

class PermissionParser extends BaseParser
{
    /**
     * @param $data
     *
     * @return array|null
     */
    public static function first($data)
    {
        if (!$data) {
            return null;
        }

        return parent::first($data);
    }

    /**
     * @param \Illuminate\Support\Collection $collection|array
     */
    public static function get($collection)
    {
        $output     = [];
        $groups     = [];
        $actions    = [];

        foreach ($collection as $data) {
            $permissionCode     = $data->code;
            [$group, $action]   = explode('.', $permissionCode);

            if (empty($output[$group])) {
                $output[$group] = [];
            }

            if (!in_array($group, $groups)) {
                $groups[] = $group;
            }

            if (!in_array($action, $actions)) {
                $actions[] = $action;
            }

            $output[$group][$action] = [
                'id'        => $data->id,
                'name'      => $data->name,
                'code'      => $data->code,
                'checked'   => !empty($data->roleId),
            ];
        }

        return [
            'groups'        => $groups,
            'actions'       => $actions,
            'permissions'   => $output,
        ];
    }
}
