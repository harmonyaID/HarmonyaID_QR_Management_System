<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title inertia>{{ config('app.name', 'QR Code') }}</title>
    <link href="/images/logo/logo.png" rel="icon"/>
    <meta name="robots" content="noindex"/>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/pages/{$page['component']}.jsx", 'resources/scss/main.scss'])
    @inertiaHead
    <script>
        window.permissions = JSON.parse('@json(auth_permissions())')
    </script>
</head>
<body>
    @inertia
</body>
</html>