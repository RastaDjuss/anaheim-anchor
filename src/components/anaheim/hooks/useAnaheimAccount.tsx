import { PublicKey } from "@solana/web3.js";
import { useAnaheimProgram } from "./useAnaheimProgram";
import {useTransactionToast} from "@/components/ui/ui-layout";
import {useMutation, useQuery} from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAnaheimAccount(account: { account: PublicKey }) {
    const { program } = useAnaheimProgram();
    const cluster = process.env.NEXT_PUBLIC_CLUSTER || 'default-cluster';
    const transactionToast = useTransactionToast()

    const accountQuery = useQuery({
        queryKey: ['anaheim', 'fetch', {cluster, account}],
        queryFn: () => {
            if (!program) {
                throw new Error('Program is not initialized');
            }
            return program.account.anaheim.fetch(account);
        },
    })

    const increment = useMutation({
        mutationKey: ['anaheim', 'increment', {cluster, account}],
        mutationFn: () => {
            if (!program) {
                throw new Error('Program is not initialized');
            }
            return program.methods.increment().accounts({anaheim: account}).rpc();
        },
        onSuccess: (tx) => {
            transactionToast(tx as string)
            return accountQuery.refetch()
        },
        onError: () => toast.error('Failed to increment count'),
    })

    const decrement = useMutation({
        mutationKey: ['anaheim', 'decrement', {cluster, account}],
        mutationFn: () => {
            if (!program) {
                throw new Error('Program is not initialized');
            }
            return program.methods.decrement().accounts({anaheim: account}).rpc();
        },
        onSuccess: (tx) => {
            transactionToast(tx as string)
            return accountQuery.refetch()
        },
        onError: () => toast.error('Failed to decrement count'),
    })

    return {
        accountQuery,
        increment,
        decrement,
    }
}