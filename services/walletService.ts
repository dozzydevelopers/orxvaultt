
import { ethers } from 'ethers';
import EthereumProvider from '@walletconnect/ethereum-provider';
import { WALLETCONNECT_PROJECT_ID } from '../constants';
import type { Nft } from '../types';
import { uploadMetadataToIpfs } from './storageService';
import { CONTRACT_ADDRESS, MARKETPLACE_ABI } from '../constants';

/**
 * Connects to a user's real wallet (e.g., MetaMask).
 * @returns A promise that resolves to the wallet's address and an ethers provider.
 */
export const connectRealWallet = async (): Promise<{ address: string, provider: ethers.BrowserProvider, signer: ethers.JsonRpcSigner }> => {
    // Prefer injected provider (MetaMask/Coinbase Extension)
    let ethProvider: any = (window as any).ethereum;

    // Fallback to WalletConnect if no injected provider
    if (!ethProvider) {
        if (!WALLETCONNECT_PROJECT_ID || WALLETCONNECT_PROJECT_ID === 'YOUR_WC_PROJECT_ID') {
            throw new Error('No injected wallet found. Set VITE_WALLETCONNECT_PROJECT_ID to enable WalletConnect.');
        }
        const wc = await EthereumProvider.init({
            projectId: WALLETCONNECT_PROJECT_ID,
            showQrModal: true,
            chains: [1],
        });
        await wc.enable();
        ethProvider = wc as unknown as any;
    }

    const provider = new ethers.BrowserProvider(ethProvider);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    if (!address) {
        throw new Error('No accounts found. Please unlock your wallet and try again.');
    }
    return { address, provider, signer };
};

/**
 * Fetches the ETH balance for a given wallet address.
 * @param provider An ethers BrowserProvider instance.
 * @param address The wallet address.
 * @returns A promise that resolves to the balance in ETH.
 */
export const getWalletBalance = async (provider: ethers.BrowserProvider, address: string): Promise<number> => {
    const balance = await provider.getBalance(address);
    return parseFloat(ethers.formatEther(balance));
};

/**
 * Fetches ETH balance using a public RPC when wallet is not connected.
 */
export const getBalanceViaPublicRpc = async (address: string, rpcUrl: string = 'https://cloudflare-eth.com'): Promise<number> => {
    if (!ethers.isAddress(address)) return 0;
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const balance = await provider.getBalance(address);
    return parseFloat(ethers.formatEther(balance));
};

/**
 * Mints a new NFT on the blockchain and records it in the backend.
 * @param nftData The data for the new NFT, including the image file.
 * @param setStatus A callback to update the UI with the current minting status.
 * @param creatorAddress The address to assign as the creator (for admin use).
 * @returns A promise that resolves to the transaction receipt.
 */
export const mintNft = async (
    nftData: { name: string; description: string; imageFile: File; price: string; category: string },
    setStatus: (status: string) => void,
    creatorAddress?: string
): Promise<ethers.TransactionReceipt> => {
    try {
        setStatus('Connecting to wallet...');
        const { signer } = await connectRealWallet();
        const finalCreatorAddress = creatorAddress || await signer.getAddress();
        
        setStatus('Uploading metadata to IPFS...');
        const tokenURI = await uploadMetadataToIpfs(nftData.name, nftData.description, nftData.imageFile, { category: nftData.category, creator: finalCreatorAddress });
        
        setStatus('Preparing transaction...');
        const contract = new ethers.Contract(CONTRACT_ADDRESS, MARKETPLACE_ABI, signer);
        const priceInWei = ethers.parseUnits(nftData.price, 'ether');
        const listingPrice = await contract.getListingPrice();
        
        setStatus('Awaiting wallet confirmation...');
        const transaction = await contract.createToken(tokenURI, priceInWei, { value: listingPrice });
        
        setStatus('Minting on the blockchain...');
        const receipt = await transaction.wait();

        if (!receipt) {
            throw new Error("Transaction failed and did not return a receipt.");
        }

        // After minting, parse the event and send data to backend
        setStatus('Syncing with marketplace...');
        const iface = new ethers.Interface(MARKETPLACE_ABI);
        const createdEvent = receipt.logs
            .map(log => {
                try { 
                    if (log.address.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()) {
                        return iface.parseLog(log);
                    }
                } catch (e) { /* ignore parsing errors */ }
                return null;
            })
            .find((parsedLog): parsedLog is ethers.LogDescription => parsedLog?.name === 'MarketItemCreated');

        if (!createdEvent) {
            throw new Error("Could not find MarketItemCreated event in transaction logs.");
        }

        const { itemId, tokenId, nftContract, seller } = createdEvent.args;
        
        const backendNftData = {
            itemId: itemId.toString(), // The marketplace item ID
            tokenId: tokenId.toString(), // The ERC721 token ID
            nftContract: nftContract,
            name: nftData.name,
            description: nftData.description,
            priceEth: parseFloat(nftData.price),
            category: nftData.category,
            tokenURI: tokenURI,
            creatorAddress: finalCreatorAddress, // The off-chain creator (can be different from seller)
            ownerAddress: seller, // The on-chain owner/seller is always the minter
        };

        // Try to notify backend if available; ignore if not
        try {
            const response = await fetch('/api/nfts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
                body: JSON.stringify({ ...backendNftData, mintFeePaidEth: 0.05 }),
            });
            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.message || 'Failed to save NFT details to the marketplace backend.');
            }
        } catch (backendError) {
            throw backendError instanceof Error ? backendError : new Error('Failed to sync with backend.');
        }
        
        setStatus('Sync complete!');
        return receipt;

    } catch (error) {
        console.error("Minting failed:", error);
        if (error instanceof Error && 'code' in error && error.code === 'ACTION_REJECTED') {
            throw new Error("Transaction rejected in wallet.");
        }
        throw error;
    }
};

/**
 * Sends ETH from the user's wallet to a recipient.
 * @param amountEth The amount of ETH to send.
 * @param recipientAddress The address of the recipient.
 * @returns A promise that resolves to the transaction receipt.
 */
export const sendEth = async (amountEth: string, recipientAddress: string): Promise<ethers.TransactionReceipt> => {
    try {
        if (!ethers.isAddress(recipientAddress)) {
            throw new Error("Invalid recipient address.");
        }
        const { signer } = await connectRealWallet();
        const tx = await signer.sendTransaction({
            to: recipientAddress,
            value: ethers.parseEther(amountEth)
        });
        const receipt = await tx.wait();
        if (!receipt) {
            throw new Error("Transaction failed to confirm.");
        }
        return receipt;
    } catch (error) {
         console.error("ETH transfer failed:", error);
        if (error instanceof Error && 'code' in error && error.code === 'ACTION_REJECTED') {
            throw new Error("Transaction rejected in wallet.");
        }
        throw error;
    }
};