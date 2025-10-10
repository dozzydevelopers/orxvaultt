
import { NFTStorage, File } from 'nft.storage';

// Configure via environment. In production, route uploads via backend instead.
const NFT_STORAGE_TOKEN: string | undefined = (import.meta as any).env?.VITE_NFT_STORAGE_TOKEN;

let client: NFTStorage | null = null;
function getClient(): NFTStorage {
  if (!NFT_STORAGE_TOKEN) {
    throw new Error('Missing VITE_NFT_STORAGE_TOKEN. Set it in your env or proxy uploads via backend.');
  }
  if (!client) client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  return client;
}

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
        const imageCid = await getClient().storeBlob(image);
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
        const metadataCid = await getClient().storeBlob(new Blob([JSON.stringify(metadata)]));
        const metadataUrl = `ipfs://${metadataCid}`;

        return metadataUrl;
    } catch (error) {
        console.error("Error uploading to NFT.Storage:", error);
        throw new Error("Failed to upload asset to IPFS.");
    }
};