import { GoogleGenAI, Type, GenerateContentResponse, Chat } from "@google/genai";
import type { Nft } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a unique, creative concept for an NFT.
 * @returns A promise that resolves to a string with the artistic concept.
 */
export const generateArtisticConcept = async (): Promise<string> => {
    try {
        const prompt = `You are a creative muse for an NFT artist. Generate a single, concise, and imaginative concept for a piece of digital art. The concept should be a short phrase or sentence. Do not add any preamble or explanation. Your style should be slightly surreal and futuristic. Example: 'A biomechanical hummingbird made of gears and flowers.'`;
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error generating artistic concept via Gemini:", error);
        throw new Error("Failed to generate AI concept with Gemini service.");
    }
};

/**
 * Generates an NFT name based on a creative concept.
 * @param concept The artistic concept for the NFT.
 * @returns A promise that resolves to a string with the NFT name.
 */
export const generateNftName = async (concept: string): Promise<string> => {
     if (!concept) {
        throw new Error("Concept cannot be empty.");
    }
    try {
        const prompt = `Based on the following artistic concept, generate a cool, single, marketable name for the NFT. Return only the name, nothing else.
        
        Concept: "${concept}"
        
        Name:`;
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim().replace(/"/g, ''); // Remove quotes if the model adds them
    } catch (error) {
        console.error("Error generating NFT name via Gemini:", error);
        throw new Error("Failed to generate AI name with Gemini service.");
    }
};


/**
 * Generates an image from a text prompt using the Gemini API.
 * @param prompt The text prompt to generate an image from.
 * @returns A base64 encoded string of the generated JPEG image.
 */
export const generateImage = async (prompt: string): Promise<string> => {
    if (!prompt) {
        throw new Error("Prompt cannot be empty.");
    }

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("Image generation failed, no images returned.");
        }
    } catch (error) {
        console.error("Error generating image via Gemini:", error);
        throw new Error("Failed to generate AI image with Gemini service.");
    }
};


/**
 * Generates a descriptive text for an NFT using the Gemini API.
 * @param name The name of the NFT.
 * @param category The category of the NFT.
 * @returns A string containing a generated description.
 */
export const generateDescription = async (name: string, category: string): Promise<string> => {
    if (!name || !category) {
        throw new Error("NFT Name and Category cannot be empty.");
    }
    try {
        const prompt = `Generate a creative, marketable, and compelling description for an NFT. The description should be around 2-3 sentences long.
        
        NFT Name: "${name}"
        Category: "${category}"
        
        Description:`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;

    } catch (error) {
        console.error("Error generating description via Gemini:", error);
        throw new Error("Failed to generate AI description with Gemini service.");
    }
};

/**
 * Generates a list of potential NFT names using the Gemini API.
 * @param description The description of the NFT.
 * @param category The category of the NFT.
 * @returns A promise that resolves to an array of strings (NFT names).
 */
export const generateNftNames = async (description: string, category: string): Promise<string[]> => {
    if (!description || !category) {
        throw new Error("A description and category are required to generate names.");
    }
    try {
        const prompt = `Based on the following NFT description and category, generate a list of 5 creative and unique names.
        
        Category: "${category}"
        Description: "${description}"
        
        Return a JSON object with a single key "names" which contains an array of 5 strings.`;

        const response = await ai.models.generateContent({
           model: "gemini-2.5-flash",
           contents: prompt,
           config: {
             responseMimeType: "application/json",
             responseSchema: {
                type: Type.OBJECT,
                properties: {
                  names: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.STRING,
                    },
                  },
                },
              },
           },
        });
        
        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);
        return result.names;

    } catch (error) {
        console.error("Error generating names via Gemini:", error);
        throw new Error("Failed to generate AI names with Gemini service.");
    }
};

/**
 * Generates a streaming analysis of a user's NFT collection.
 * @param nfts The user's owned and created NFTs.
 * @returns An async iterator that yields chunks of the analysis text.
 */
export const analyzeUserProfileStream = async (nfts: Nft[]) => {
    if (nfts.length === 0) {
        throw new Error("No NFTs to analyze.");
    }

    const nftSummary = nfts.map(nft => 
        `- Name: ${nft.name}, Category: ${nft.category}, Description: ${nft.description.substring(0, 100)}...`
    ).join('\n');

    const prompt = `You are an expert NFT collection analyst. Based on the following list of NFTs, provide a concise and insightful analysis of the user's collection. 
    
    The analysis should be easy to read and formatted with markdown-style headings (e.g., "**Collection Theme**"). Cover these aspects:
    1.  **Collection Theme & Style:** What is the dominant theme or artistic style? (e.g., futuristic, abstract, pixel art)
    2.  **Top Categories:** Which categories are most prominent in their collection?
    3.  **Collector's Profile:** What does this collection say about the collector's taste? Are they a trendsetter, a niche specialist, or a diversified investor?
    
    Here is the summary of the user's NFTs:
    ${nftSummary}
    
    Provide your analysis:`;
    
    try {
        const response = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response;
    } catch (error) {
        console.error("Error analyzing profile via Gemini:", error);
        throw new Error("Failed to generate AI profile analysis with Gemini service.");
    }
};


let supportChat: Chat | null = null;

export const startSupportChat = (): Chat => {
    if (supportChat) {
        return supportChat;
    }
    const systemInstruction = `You are "Orx," a friendly and helpful AI assistant for Orxvault, a premier NFT marketplace. Your goal is to assist users with their questions about the platform, NFTs, blockchain basics, and how to navigate the site.

    Your Persona:
    -   Friendly, approachable, and slightly futuristic.
    -   Knowledgeable about Orxvault's features (Marketplace, Collections, Auctions, Creating NFTs, Profile management).
    -   Patient and clear in your explanations.
    -   You cannot perform actions for the user (like buying or selling). You can only provide information and guidance.
    -   You do not have access to real-time user data, account balances, or transaction history. Politely decline any requests for this information.

    Conversation Guidelines:
    -   Keep your answers concise and easy to understand. Use bullet points or numbered lists for clarity when explaining steps.
    -   When asked about something you don't know, be honest and say you don't have that information.
    -   Start the conversation with a warm welcome: "Welcome to Orxvault! I'm Orx, your AI assistant. How can I help you explore the world of digital assets today?"
    `;
    
    supportChat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
      },
    });

    return supportChat;
};