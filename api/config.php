<?php
// Hostinger-ready config reading from environment when available

// Database (fallbacks are safe defaults; override via hPanel env or .htaccess SetEnv)
const DB_HOST = __DIR__ && getenv('DB_HOST') ? getenv('DB_HOST') : 'localhost';
const DB_NAME = __DIR__ && getenv('DB_NAME') ? getenv('DB_NAME') : 'your_db_name';
const DB_USER = __DIR__ && getenv('DB_USER') ? getenv('DB_USER') : 'your_db_user';
const DB_PASS = __DIR__ && getenv('DB_PASS') ? getenv('DB_PASS') : 'your_db_password';

// App URL (used for email verification links)
const APP_URL = __DIR__ && getenv('APP_URL') ? getenv('APP_URL') : 'https://yourdomain.com';

// JWT secret (use a long random string)
const JWT_SECRET = __DIR__ && getenv('JWT_SECRET') ? getenv('JWT_SECRET') : 'change_this_to_a_long_random_secret_string';

// Email settings (optional). Hostinger often supports PHP mail().
const EMAIL_FROM = __DIR__ && getenv('EMAIL_FROM') ? getenv('EMAIL_FROM') : 'no-reply@yourdomain.com';

// Fees
// Mint/upload fee charged at NFT creation (in ETH units)
const MINT_FEE_ETH = (__DIR__ && getenv('MINT_FEE_ETH')) ? (float) getenv('MINT_FEE_ETH') : 0.05;
// Platform commission percent on sales
const COMMISSION_PERCENT = (__DIR__ && getenv('COMMISSION_PERCENT')) ? (float) getenv('COMMISSION_PERCENT') : 15.0;
// Platform account id (string) to credit commissions
const PLATFORM_ACCOUNT_ID = __DIR__ && getenv('PLATFORM_ACCOUNT_ID') ? getenv('PLATFORM_ACCOUNT_ID') : 'platform';
