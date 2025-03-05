<?php

namespace App\Parser;

use Logia\Core\Parser\BaseParser;

class MainParser extends BaseParser
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

        return $data->toArray();
    }

}
