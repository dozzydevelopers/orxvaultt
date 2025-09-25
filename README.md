# Orxvault Marketplace dApp - Full Stack Setup

Welcome to Orxvault! This document provides all the necessary instructions to deploy and configure the full-stack application, which includes a React frontend, a PHP backend, and an Ethereum smart contract.

## Architecture Overview

This is a **hybrid Web3 application** with three main components:

1.  **React Frontend:** The user interface built with React and TypeScript.
2.  **PHP Backend API:** A server-side application that handles user authentication (signup, login, email verification), manages data in a MySQL database (user profiles, NFT metadata), and provides data to the frontend via a REST API.
3.  **Ethereum Smart Contract:** The on-chain logic that lives on the Ethereum blockchain. It handles the core decentralized operations: minting NFTs, tracking ownership, and processing sales.

---

## Part 1: Setting up the Smart Contract

First, you need to deploy the marketplace smart contract to an Ethereum network (e.g., the Sepolia testnet). We will use **Hardhat**.

### Prerequisites

*   **Node.js:** [Install it from here](https://nodejs.org/).
*   **MetaMask:** A crypto wallet browser extension. You'll need some test ETH for the network you choose.

### Steps to Deploy

**1. Initialize a Hardhat Project**

Create a **new, separate folder** for your smart contract project on your local machine and run:

```bash
mkdir orxvault-contract
cd orxvault-contract
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```
*(Choose "Create a TypeScript project" and agree to the defaults).*

**2. Add the Smart Contract Code**

Create a new file at `contracts/Marketplace.sol` and paste the following code into it:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    Counters.Counter private _itemIds;

    address payable owner;
    uint256 listingPrice = 0.01 ether;

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event MarketSale(
        uint256 indexed itemId,
        address indexed buyer,
        uint256 price
    );

    constructor() ERC721("Orxvault NFT", "ORX") {
        owner = payable(msg.sender);
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken(string memory tokenURI, uint256 price) public payable returns (uint) {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        _itemIds.increment();
        uint256 newItemId = _itemIds.current();

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        idToMarketItem[newItemId] = MarketItem(
            newItemId,
            address(this),
            newTokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        emit MarketItemCreated(
            newItemId,
            address(this),
            newTokenId,
            msg.sender,
            address(0),
            price,
            false
        );

        return newItemId;
    }
    
    function createMarketSale(address nftContract, uint256 itemId) public payable nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(item.price == msg.value, "Please submit the asking price");
        require(!item.sold, "Item is already sold");

        item.owner = payable(msg.sender);
        item.sold = true;
        
        _transfer(item.seller, msg.sender, item.tokenId);
        
        payable(item.seller).transfer(msg.value);

        emit MarketSale(itemId, msg.sender, msg.value);
    }
}
```

**3. Configure Hardhat**

Replace the contents of `hardhat.config.ts` with this:

```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEY = "YOUR_METAMASK_PRIVATE_KEY";
const SEPOLIA_RPC_URL = "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111
    }
  }
};

export default config;
```
*   **Get Private Key:** In MetaMask, click the three dots, "Account details," then "Show private key." **NEVER share this key publicly.**
*   **Get RPC URL:** Create a free account on a service like [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/), create a new project, and copy the Sepolia testnet RPC URL.

**4. Create a Deployment Script**

Create a file at `scripts/deploy.ts` and add this code:

```typescript
import { ethers } from "hardhat";

async function main() {
  const marketplace = await ethers.deployContract("Marketplace");
  await marketplace.waitForDeployment();
  console.log(`Marketplace deployed to: ${marketplace.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**5. Compile and Deploy**

Run the following commands in your terminal:

```bash
npm install @openzeppelin/contracts
npx hardhat compile
npx hardhat run scripts/deploy.ts --network sepolia
```

The terminal will print a message like: `Marketplace deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3`. **This is your contract address!** Copy it.

---

## Part 2: Setting up the Backend API & Database

The backend requires a server with PHP and a MySQL database.

**1. Create the Database**

*   Access your database management tool (e.g., phpMyAdmin).
*   Create a new database (e.g., `orxvault_db`).
*   Find the `database.sql` file in the project's root directory.
*   Import `database.sql` into your new database. This will create all the necessary tables (`users`, `nfts`, `collections`, `categories`).

**2. Configure the Backend**

*   Upload all the project files to your web server.
*   Navigate to the `api/` directory on your server.
*   Open the `db.php` file and edit the following lines with your database credentials:
    ```php
    $DB_HOST = 'localhost';
    $DB_USER = 'your_database_user';
    $DB_PASS = 'your_database_password';
    $DB_NAME = 'orxvault_db';
    ```

**3. Configure Email (for user verification)**

*   The backend uses PHP's `mail()` function to send verification emails. Ensure your hosting server is configured to send emails. You may need to set up SMTP settings in your `php.ini` file or use a third-party service if `mail()` is disabled.

---

## Part 3: Configuring the Frontend

Finally, connect the frontend to your deployed smart contract.

*   Open the `constants.ts` file in the project's root directory.
*   Find the `CONTRACT_ADDRESS` constant.
*   **Paste the address you copied from the smart contract deployment step.**
    ```typescript
    export const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
    ```

## Part 4: Final Environment Keys

*   **Gemini API Key:** Required for AI features. Go to [Google AI Studio](https://makersuite.google.com/), get an API key, and ensure it's set as the `API_KEY` environment variable in your hosting environment.
*   **JWT Secret Key:** In `api/index.php`, there is a `JWT_SECRET` constant. For production, you should replace `'your-super-secret-key-for-jwt'` with a long, random, and secure string.

Once all parts are configured, your Orxvault marketplace will be live and fully functional.