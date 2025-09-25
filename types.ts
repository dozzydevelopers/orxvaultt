

export interface Nft {
  id: string; // This will be the itemId from the smart contract
  tokenId: string; // This will be the tokenId from the smart contract
  nftContract: string; // The address of the NFT contract
  name: string;
  creator: string; // wallet address of original creator
  owner: string; // wallet address of current owner
  priceEth: number;
  priceUsd: number;
  imageUrl: string;
  category: string;
  isVerified: boolean; // This would be an off-chain property
  description: string;
  createdAt: string; // ISO 8601 date string
  collectionId?: string; // This would be an off-chain property from metadata
  isAuction?: boolean;
  auctionEnd?: string; // ISO date string
  currentBidEth?: number;
  tokenURI?: string;
  metadata?: {
    rarity?: string;
    traits?: {
      trait_type: string;
      value: string;
    }[];
  };
  creatorUsername?: string;
  creatorAvatar?: string;
  ownerUsername?: string;
  validationStatus?: 'approved' | 'pending' | 'rejected';
  moderationStatus?: 'approved' | 'pending' | 'rejected';
}

export interface Category {
  name: string;
  imageUrl: string;
}

export interface User {
  id: string; // Using wallet address as ID
  username: string; // Could be ENS name or truncated address
  walletAddress: string;
  role: 'User' | 'Admin' | 'Moderator' | 'Creator';
  avatarUrl: string; // e.g., a blockie or Jazzicon
  bannerImageUrl?: string;
  bio: string;
  isVerified: boolean;
  balanceEth: number; // This would be fetched from the provider
  isWalletConnected?: boolean;
  isBanned?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  creator: string; // wallet address
  coverImageUrl: string;
  itemCount: number;
  creatorUsername?: string;
  isFeatured?: boolean;
}

export interface SiteSettings {
    mintingFee: number;
    listingFee: number;
    salesFeePercent: number;
    promoBanner: {
        title: string;
        subtitle: string;
        buttonText: string;
        link: string;
        imageUrl: string;
    };
    socialLinks: {
        twitter: string;
        discord: string;
    }
}

export interface AdminFeedEvent {
    id: string;
    type: 'new_user' | 'nft_mint' | 'nft_sale' | 'high_listing';
    timestamp: Date;
    user?: User;
    nft?: Nft;
    details?: {
        price?: number;
        buyer?: User;
    };
}

export interface Transaction {
    id: string;
    type: 'Sale' | 'Mint' | 'Transfer';
    nft: Nft;
    amountEth: number;
    from: User;
    to: User;
    timestamp: string;
}