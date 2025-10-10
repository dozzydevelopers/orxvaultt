-- MySQL schema for Hostinger deployment

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(191) UNIQUE,
  username VARCHAR(191),
  password_hash VARCHAR(255),
  wallet_address VARCHAR(64),
  role VARCHAR(32) DEFAULT 'User',
  avatar_url VARCHAR(255),
  bio TEXT,
  is_verified TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS verification_tokens (
  user_id VARCHAR(64) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL,
  INDEX (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS categories (
  name VARCHAR(191) PRIMARY KEY,
  image_url VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS collections (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(191),
  description TEXT,
  creator VARCHAR(64),
  cover_image_url VARCHAR(255),
  item_count INT DEFAULT 0,
  is_featured TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS nfts (
  id VARCHAR(64) PRIMARY KEY,
  token_id VARCHAR(64),
  nft_contract VARCHAR(64),
  name VARCHAR(191),
  creator VARCHAR(64),
  owner VARCHAR(64),
  price_eth DECIMAL(38,18) DEFAULT 0,
  price_usd DECIMAL(18,2) DEFAULT 0,
  image_url VARCHAR(255),
  category VARCHAR(191),
  is_verified TINYINT(1) DEFAULT 0,
  description TEXT,
  created_at DATETIME NOT NULL,
  collection_id VARCHAR(64),
  is_auction TINYINT(1) DEFAULT 0,
  auction_end DATETIME NULL,
  current_bid_eth DECIMAL(38,18) NULL,
  token_uri VARCHAR(255) NULL,
  validation_status ENUM('approved','pending','rejected','flagged') DEFAULT 'pending',
  INDEX (creator),
  INDEX (owner),
  INDEX (category),
  INDEX (collection_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
