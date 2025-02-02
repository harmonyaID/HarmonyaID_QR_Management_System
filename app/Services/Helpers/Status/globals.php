<?php

if (!function_exists("errDefault")) {
    function errDefault($internalMsg = "", $status = null)
    {
        error(500, "An error occurred!", $internalMsg, $status);
    }
}

if (!function_exists("errInvalid")) {
    function errInvalid($message = "Invalid input!", $internalMsg = "", $status = null)
    {
        error(400, $message, $internalMsg, $status);
    }
}

if (!function_exists("errUnauthorized")) {
    function errUnauthorized($message = "You are not allowed to do this action!", $internalMsg = "", $status = null)
    {
        error(401, $message, $internalMsg, $status);
    }
}

if (!function_exists("errNotFound")) {
    function errNotFound(string $modelClass, $internalMsg = '')
    {
        if (class_exists($modelClass)) {
            $reflection = new ReflectionClass($modelClass);
            if ($shortName = $reflection->getShortName()) {
                $name = preg_replace("/([A-Z][a-z])/", " $1", $shortName);
                $name = preg_replace("/([A-Z]+)/", " $1", $name);
                $name = preg_replace("/ +/", " ", $name);
            } else {
                $name = $modelClass;
            }
        } else {
            $name = $modelClass;
        }

        $name = strtolower(trim($name));
    
        error(404, "Unable to find the specified {$name}!", $internalMsg);
    }
}
