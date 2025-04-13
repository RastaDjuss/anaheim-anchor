import { useQuery } from '@tanstack/react-query'
import { PublicKey } from '@solana/web3.js'
import { useAnaheimProgram } from './useAnaheimProgram'

// Define types for the account data
interface AccountData {
    count: number // Replace count/type depending on your actual program account state
}

export const useAccountQuery = (accountPublicKey?: PublicKey | null) => {
    const { program } = useAnaheimProgram()

    return useQuery<AccountData, Error>({
        queryKey: ['anaheim', 'account', accountPublicKey?.toBase58()],
        queryFn: async () => {
            if (!program || !accountPublicKey) {
                throw new Error('Program or account public key not initialized')
            }
            const fetchedData = await program.account.anaheim.fetch(accountPublicKey);
            return {
                count: fetchedData.count, // Map or transform properties from fetchedData to match AccountData
            } as AccountData;
        },
        enabled: !!accountPublicKey,

    })
}