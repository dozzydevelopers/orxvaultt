
import { NFTStorage, File } from 'nft.storage';

// !!! SECURITY WARNING !!!
// ========================
// Exposing API keys on the client-side is a significant security risk.
// Anyone can view your key and use it, leading to unexpected charges or service suspension.
// In a production environment, this key MUST be moved to a secure backend or a serverless function.
// The frontend should call your backend, which then securely communicates with NFT.Storage.
// This key is included here ONLY for the purpose of making this frontend-only demo functional.
// DO NOT DEPLOY an application with this key exposed.
const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDEzMmMyQjRCZjM4YjE4ZkY3Njk4NEI4OThBN2U5QTYzRWU0RThlMkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODgyNDUzMzM0MiwibmFtZSI6Ik9yeHZhdWx0IERlbW8ifQ.nIn0F5h3_a_F4p2h_La2j3A_C2s3B2i-2F_N5xY4M-A';

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

/**
 * Uploads NFT metadata to IPFS using the NFT.Storage client.
 * @param name The name of the NFT.
 * @param description The description of the NFT.
 * @param imageFile The image file to be included in the metadata.
 * @param otherProperties Additional properties to include in the metadata.
 * @returns The IPFS URI for the metadata JSON.
 */
export const uploadMetadataToIpfs = async (
    name: string,
    description: string,
    imageFile: File,
    otherProperties: Record<string, any> = {}
): Promise<string> => {
    try {
        // Upload the image and get the IPFS URI
        const image = new File([await imageFile.arrayBuffer()], imageFile.name, { type: imageFile.type });
        const imageCid = await client.storeBlob(image);
        const imageUrl = `ipfs://${imageCid}`;

        // Construct the metadata object
        const metadata = {
            name,
            description,
            image: imageUrl,
            attributes: Object.entries(otherProperties).map(([trait_type, value]) => ({
                trait_type,
                value,
            })),
        };

        // Upload the metadata JSON
        const metadataCid = await client.storeBlob(new Blob([JSON.stringify(metadata)]));
        const metadataUrl = `ipfs://${metadataCid}`;

        return metadataUrl;
    } catch (error) {
        console.error("Error uploading to NFT.Storage:", error);
        throw new Error("Failed to upload asset to IPFS.");
    }
};