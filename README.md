# Installation & Configuration

### Installation

Make sure make, php 8, composer, npm, python, and pip are installed on your machine

This project uses Python for generating the QR Code because the PHP library generates weird rounded eyeballs

```shell
# Install all dependency (php, npm, & pip)
make install

# Migrate all migration
php artisan migrate
```
