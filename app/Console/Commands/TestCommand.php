<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use libphonenumber\PhoneNumberFormat;

class TestCommand extends Command
{
    protected $signature = 'dev-test';
    protected $description = '';

    public function handle()
    {
        $bits = random_bytes(6);
        $hex = bin2hex($bits);

        $this->info($hex);
    }
}
