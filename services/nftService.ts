
import { ethers } from "ethers";
import type { Nft } from "../types";
import { connectRealWallet } from './walletService';
import { CONTRACT_ADDRESS, MARKETPLACE_ABI } from '../constants';


/**
 * Fetches all NFTs from the backend API.
 * @returns A promise that resolves to an array of Nft objects.
 */
export const getNfts = async (): Promise<Nft[]> => {
    try {
        const response = await fetch('/api/nfts');
        if (!response.ok) {
            throw new Error(`Failed to fetch NFTs: ${response.statusText}`);
        }
        const nfts: Nft[] = await response.json();
        return nfts;
    } catch (error) {
        console.error("Could not fetch NFTs:", error);
        throw new Error(`Could not fetch NFTs:\n${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

/**
 * Purchases an NFT by executing a transaction on the smart contract
 * and notifying the backend to update ownership.
 * @param nft The NFT object to purchase.
 * @returns A promise that resolves to the transaction receipt.
 */
export const buyNft = async (nft: Nft): Promise<ethers.TransactionReceipt> => {
    try {
        const { signer, address: buyerAddress } = await connectRealWallet();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, MARKETPLACE_ABI, signer);
        const priceInWei = ethers.parseUnits(nft.priceEth.toString(), 'ether');

        const transaction = await contract.createMarketSale(nft.nftContract, nft.id, {
            value: priceInWei
        });

        const receipt = await transaction.wait();
        if (!receipt) {
            throw new Error("Purchase transaction failed to confirm.");
        }

        // Notify backend of the sale to update the database
        try {
            const response = await fetch(`/api/nfts/purchase`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
                body: JSON.stringify({ 
                    itemId: nft.id, 
                    buyerAddress: buyerAddress 
                }),
            });
            if (!response.ok) {
                 console.warn("On-chain purchase succeeded, but failed to update marketplace backend.");
            }
        } catch (backendError) {
            console.warn("On-chain purchase succeeded, but failed to contact marketplace backend.", backendError);
        }

        return receipt;
    } catch(error) {
        console.error("NFT Purchase failed:", error);
        if (error instanceof Error && 'code' in error && error.code === 'ACTION_REJECTED') {
            throw new Error("Transaction rejected in wallet.");
        }
        throw new Error("Failed to purchase NFT.");
    }
};