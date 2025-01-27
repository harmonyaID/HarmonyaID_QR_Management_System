# Installation & Configuration

### Installation

```shell
composer create-project yusologia/lara-backend-service project
```

### Configuration system in config/core.php

```php
return [

    'prefix' => [

        // Base uri for website application
        'web' => env('BASE_WEB_PREFIX', 'web'),

        // Base uri for mobile application
        'mobile' => env('BASE_MOBILE_PREFIX', 'mobile'),

    ],

    'namespace' => [

        // Base namespace for website application
        'web' => env('BASE_WEB_NAMESPACE', 'Web'),

        // Base namespace for mobile application
        'mobile' => env('BASE_MOBILE_NAMESPACE', 'Mobile'),

    ]

];
  ```
