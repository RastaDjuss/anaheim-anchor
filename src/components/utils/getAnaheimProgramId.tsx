import { PublicKey } from '@solana/web3.js'

export function getAnaheimProgramId(network: string): PublicKey {
    switch (network) {
        case 'mainnet-beta':
            return new PublicKey('YOUR_MAINNET_PROGRAM_ID') // Replace with actual program ID
        case 'devnet':
            return new PublicKey('YOUR_DEVNET_PROGRAM_ID') // Replace with actual program ID
        default:
            throw new Error(`Unsupported network: ${network}`)
    }
}