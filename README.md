# Installation & Configuration

### Installation

Make sure **make**, **php 8**, **composer**, **npm**, **python**, and **pip** are installed on your machine

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

# Compile generator
pyinstaller generator.py -F --distpath .
```

Add Python alias to .env
```sh
PYTHON_ALIAS="python3"  # Linux
PYTHON_ALIAS="py"       # Windows
```

Add Google client id and client secret to .env

```sh
GOOGLE_CLIENT_ID=<client_id>
GOOGLE_CLIENT_SECRET=<client_secret>
```

Register redirect url on your Google cloud console

```sh
https://<your-domain>/auth/google/authorize
# Example: https://example.com/auth/google.authorize
```

To change the app name, set the value of `APP_NAME` in `.env` file
```sh
APP_NAME="QR Code Generator"
```

### Generator Variants
You can easily switch between PHP and Python Generator by changing the value of `QR_GENERATOR` in `.env` file
```sh
QR_GENERATOR=python # Using Python generator
QR_GENERATOR=php    # Using PHP generator
```

### Queue List

| Name | Usage |
| ---- | ----- |
| default | Permission Caching |