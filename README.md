# Installation & Configuration

### Installation

Make sure make, php 8, composer, npm, python, and pip are installed on your machine

This project uses Python for generating the QR Code because the PHP library generates weird rounded eyeballs

```sh
# Install all dependencies (php, npm, & pip)
make install

# Migrate all migrations
php artisan migrate

# Seed user (superadmin@example.com:QR_Admin@321#)
php artisan db:seed

# Compile frontend files
npm run build
```

or if you prefer doing it manually

```sh
# Install PHP dependencies
composer install

# Install npm dependencies
npm i

# Install python dependencies
pip install -r requirements.txt

# Migrate all migrations
php artisan migrate

# Seed user (superadmin@example.com:QR_Admin@321#)
php artisan db:seed

# Compile frontend files
npm run build
```

### Queue List

| Name | Usage |
| ---- | ----- |
| default | Permission Caching |