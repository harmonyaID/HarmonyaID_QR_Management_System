<?php

namespace App\Services\Constant\Qr;

use App\Services\Constant\BaseIDName;
use libphonenumber\PhoneNumberFormat;
use libphonenumber\PhoneNumberUtil;

class QrDataType extends BaseIDName
{
    const LINK_ID = 1;
    const LINK = 'link';
    const WHATSAPP_ID = 2;
    const WHATSAPP = 'whatsapp';
    const WIFI_ID = 3;
    const WIFI = 'wifi';
    const CUSTOM_PAGE_ID = 4;
    const CUSTOM_PAGE = 'custom page';

    const OPTION = [
        self::LINK_ID => self::LINK,
        self::WHATSAPP_ID => self::WHATSAPP,
        self::WIFI_ID => self::WIFI,
        self::CUSTOM_PAGE_ID => self::CUSTOM_PAGE,
    ];


    public static function processData($data, $typeId)
    {
        switch ($typeId) {
            case self::LINK_ID:
                return static::formatLink($data);
            
            case self::WHATSAPP_ID:
                return static::formatWhatsapp($data);
            
            case self::WIFI_ID:
                return static::formatWifi($data);
        }
    }


    private static function formatLink($data) : string | bool
    {
        if (empty($data['url']) || !is_string($data['url'])) {
            return false;
        }

        return $data['url'];
    }

    private static function formatWhatsapp($data) : string | bool
    {
        if (empty($data['phone']['number']) ||
            empty($data['phone']['country'])
        ) {
            return false;
        }

        $parser = PhoneNumberUtil::getInstance();
        $phone  = $parser->parse($data['phone']['number'], $data['phone']['country']);
        $phone  = $parser->format($phone, PhoneNumberFormat::E164);
        $phone  = trim($phone, '\+');

        $url = 'https://wa.me/' . $phone;

        if (!empty($data['message'])) {
            $url .= '?text=' . urlencode($data['message']);
        }

        return $url;
    }

    private static function formatWifi($data) : string | bool
    {
        if (empty($data['ssid']) ||
            (empty($data['password']) && !empty($data['encryption'])) ||
            (!empty($data['password']) && empty($data['encryption']))
        ) {
            return false;
        }

        $string = 'WIFI:S:' . $data['ssid'] . ';';

        if (!empty($data['password']) && !empty($data['encryption'])) {
            $string .= 'T:' . $data['encryption'] . ';';
            $string .= 'P:' . $data['password'] . ';';
        }

        if (!empty($data['hidden'])) {
            $string .= 'H:true;';
        }

        return $string;
    }
}
