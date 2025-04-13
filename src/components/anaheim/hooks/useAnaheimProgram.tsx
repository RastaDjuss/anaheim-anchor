'use client';

// Path: src/components/anaheim/hooks/useAnaheimProgram.tsx
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Command } from 'commander';
import 'commander/types';
import { fetchAnaheimAccounts as fetchAnaheimAccountsUtil } from '../utils/fetchAnaheimAccounts';
import { IdlErrorCode, IdlEvent, IdlField, IdlTypeDef } from '@coral-xyz/anchor/dist/cjs/idl';
import { IdlAccountItem, IdlTypeDefStruct } from '@project-serum/anchor/dist/cjs/idl';
import { Connection, clusterApiUrl } from '@solana/web3.js';

export function useAnaheimProgram() {
    const wallet = useAnchorWallet(); // Utilisation de Wallet Adapter
    const connection = new Connection(clusterApiUrl('devnet')); // Remplacez 'devnet' par votre cluster

    // Ajoutez une logique pour initialiser le programme Solana si nécessaire

    console.log('Initialisation du programme :', { wallet, connection, program });

    return { wallet, connection, program }; // Retournez connection ici
}

const program = new Command(); // Initialize Commander.js' Command object

// Utility function to cast raw accounts data to proper AnaheimAccount type
function castToAnaheimAccount(accounts: any[]): AnaheimAccount[] {
    return accounts.map((account) => ({
        publicKey: account.publicKey,
        balance: account.balance ?? 0,
        isActive: account.isActive ?? false,
    }));
}

// Query options for accounts
const queryOptions: UseQueryOptions<AnaheimAccount[], Error> & {
    onSuccess?: (data: AnaheimAccount[]) => void;
    onError?: (error: Error) => void;
} = {
    queryKey: ['anaheim', 'accounts'],
    queryFn: async (): Promise<AnaheimAccount[]> => {
        if (!program) throw new Error('Program is not initialized');
        return await fetchAnaheimAccountsUtil(program).then((accounts: any[]) =>
            castToAnaheimAccount(accounts)
        );
    },
    enabled: !!program, // Enable only if program exists
    onSuccess: (data: AnaheimAccount[]) => {
        console.log('Successfully fetched accounts:', data);
    },
    onError: (error: Error) => {
        toast.error(`Error fetching accounts: ${error.message}`);
    },
};

// Execute query to fetch accounts
const accountsQuery = useQuery(queryOptions);

// Fetch Anaheim accounts function
export async function fetchAnaheimAccounts(program: any): Promise<AnaheimAccount[]> {
    const accounts = await program.account.anaheimAccount.all();
    // Map accounts to the proper type
    return accounts.map((account: any) => ({
        publicKey: account.publicKey.toBase58(),
        balance: account.data.balance ?? 0, // Ensure balance is defined
        isActive: account.data.isActive ?? false, // Ensure isActive is defined
    }));
}

// Define the AnaheimAccount type
export interface AnaheimAccount {
    publicKey: string;
    balance: number;
    isActive: boolean;
}

// Define the Idl type and others
export interface Idl {
    version: string; // Program version
    name: string; // Program name
    metadata?: { [key: string]: string }; // Custom metadata
    instructions: IdlInstruction[]; // Instructions
    accounts?: IdlAccount[]; // Accounts
    types?: IdlTypeDef[]; // Optional custom types
    events?: IdlEvent[]; // Optional program events
    errors?: IdlErrorCode[]; // Optional custom errors
}

export interface IdlAccount {
    name: string;
    type: IdlTypeDefStruct;
}

export interface IdlInstruction {
    name: string;
    accounts: IdlAccountItem[];
    args: IdlField[];
}

export interface IdlMetadata {
    [key: string]: string;
}

// useAnaheimProgram hook
export function useAnaheimProgram() {
    // Wallet from Anchor Wallet Adapter
    const wallet = useAnchorWallet();

    // Add logic for initializing the program (if necessary)
    console.log('Wallet:', wallet);
    console.log('Program:', program);

    // Return wallet and program safely
    return { wallet, program };
} // <-- Ensure this closing brace ends your function properly