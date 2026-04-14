/**
 * Inco Encryption Utility
 * Handles client-side encryption of credit scores using Inco Lightning SDK
 */

import { Lightning } from '@inco/js/lite';
import { supportedChains, handleTypes } from '@inco/js';

/**
 * Encrypt a credit score for confidential on-chain storage
 * @param score - The credit score to encrypt (0-1000)
 * @param contractAddress - The target contract address
 * @param userAddress - The user's wallet address
 * @returns Promise<`0x${string}`> - Hex-encoded encrypted ciphertext
 */
export async function encryptScore(
    score: number,
    contractAddress: string,
    userAddress: string
): Promise<`0x${string}`> {
    try {
        console.log('🔐 Initializing Inco Lightning for Base Sepolia...');

        // Initialize Lightning SDK for Base Sepolia testnet
        const chainId = supportedChains.baseSepolia;
        // IMPORTANT: Lightning.latest() returns a Promise, must await it!
        const zap = await Lightning.latest('testnet', chainId);

        console.log(`🔐 Encrypting score ${score} for user ${userAddress.slice(0, 6)}...`);

        // Encrypt the score using Inco Lightning SDK
        const ciphertext = await zap.encrypt(score, {
            accountAddress: userAddress as `0x${string}`,
            dappAddress: contractAddress as `0x${string}`,
            handleType: handleTypes.euint256,
        });

        console.log('✅ Score encrypted successfully');

        return ciphertext as `0x${string}`;
    } catch (error: any) {
        console.error('❌ Encryption failed:', error);

        // Provide user-friendly error messages
        if (error.message?.includes('gateway') || error.message?.includes('network')) {
            throw new Error('Inco Lightning gateway is currently unreachable. Please try again later.');
        } else if (error.message?.includes('account') || error.message?.includes('address')) {
            throw new Error('Invalid wallet address. Please ensure your wallet is connected.');
        } else {
            throw new Error(`Encryption failed: ${error.message || error.toString() || 'Unknown error'}`);
        }
    }
}
