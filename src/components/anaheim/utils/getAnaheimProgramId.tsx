import { PublicKey } from '@solana/web3.js'

export function getAnaheimProgramId(network: string): PublicKey {
    switch (network) {
        case 'mainnet-beta':
            return new PublicKey('85FCHsGWdCf4v6knH9u42DMn9bMZ2SnwtU3rG7H4rwoq') // Replace with actual program ID
        case 'devnet':
            return new PublicKey('85FCHsGWdCf4v6knH9u42DMn9bMZ2SnwtU3rG7H4rwoq') // Replace with actual program ID
        default:
            throw new Error(`Unsupported network: ${network}`)
    }
}