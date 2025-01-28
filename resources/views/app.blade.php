<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title inertia>{{ config('app.name', 'QR Code') }}</title>
    <link href="/images/logo.png" rel="icon"/>
    <meta name="robots" content="noindex"/>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.js', "resources/js/pages/{$page[component]}.js"])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>