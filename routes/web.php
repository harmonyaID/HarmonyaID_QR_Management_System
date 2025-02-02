<?php

$version = config('core.version');
$base = base_path("routes/features/web/");

require($base . "activity.php");
require($base . "auth.php");
