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
        $this->info(format_phone('ID', '085258430431'));
        $this->info(format_phone('ID', '085258430431', PhoneNumberFormat::INTERNATIONAL));
        $this->info(format_phone('ID', '085258430431', PhoneNumberFormat::NATIONAL));
        $this->info(format_phone('ID', '085258430431', PhoneNumberFormat::RFC3966));
    }
}
