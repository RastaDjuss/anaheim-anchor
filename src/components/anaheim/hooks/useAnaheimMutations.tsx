import { useMutation } from '@tanstack/react-query'
import { PublicKey } from '@solana/web3.js'
import { toast } from 'react-hot-toast'
import { transactionToast } from '@/components/ui/ui-toast'
import { useAnaheimProgram } from './useAnaheimProgram'

// Mutations for interacting with individual accounts
export function useAnaheimMutations(accountPubkey?: PublicKey | null) {
    const { program } = useAnaheimProgram()

    if (!program) throw new Error('Anaheim Program is not initialized')

    // Mutation: Increment account value
    const incrementMutation = useMutation({
        mutationFn: async () => {
            if (!accountPubkey) throw new Error('Account PublicKey is required')
            return await program.methods.increment().accounts({ anaheim: accountPubkey }).rpc()
        },
        onSuccess: (tx) => transactionToast(tx),
        onError: (error: any) => toast.error(`Increment failed: ${error.message || 'Unknown error'}`),
    })

    // Mutation: Decrement account value
    const decrementMutation = useMutation({
        mutationFn: async () => {
            if (!accountPubkey) throw new Error('Account PublicKey is required')
            return await program.methods.decrement().accounts({ anaheim: accountPubkey }).rpc()
        },
        onSuccess: (tx) => transactionToast(tx),
        onError: (error: any) => toast.error(`Decrement failed: ${error.message || 'Unknown error'}`),
    })

    // Mutation: Set custom value
    const setMutation = useMutation({
        mutationFn: async (newCount: number) => {
            if (!accountPubkey) throw new Error('Account PublicKey is required')
            return await program.methods.setCount(newCount).accounts({ anaheim: accountPubkey }).rpc()
        },
        onSuccess: (tx) => transactionToast(tx),
        onError: (error: any) => toast.error(`Set count failed: ${error.message || 'Unknown error'}`),
    })

    // Mutation: Close the account
    const closeMutation = useMutation({
        mutationFn: async () => {
            if (!accountPubkey) throw new Error('Account PublicKey is required')
            return await program.methods.close().accounts({ anaheim: accountPubkey }).rpc()
        },
        onSuccess: (tx) => transactionToast(tx),
        onError: (error: any) => toast.error(`Account closing failed: ${error.message || 'Unknown error'}`),
    })

    return {
        incrementMutation,
        decrementMutation,
        setMutation,
        closeMutation,
    }
}