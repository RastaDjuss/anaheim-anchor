import {Program} from '@coral-xyz/anchor';
import {Connection, PublicKey} from '@solana/web3.js'; // Ensure the package is installed: `npm install @solana/web3.js` and its types are added
import {useAnchorWallet} from "@solana/wallet-adapter-react";
import {AnchorProvider, Wallet} from "@coral-xyz/anchor";
// Add the following TypeScript-compatible IDL type definition
import { Idl } from "@coral-xyz/anchor";
import {Command} from "commander";

const initialProgramId = new PublicKey("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF"); // Correctly cast to PublicKey

// @ts-ignore
const wallet: AnchorWallet | undefined = useAnchorWallet(); // Assuming you're using wallet-adapter-react
const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL ?? "https://api.mainnet-beta.solana.com", {
    commitment: 'processed',
});
const provider = new AnchorProvider(connection, wallet!, {
    preflightCommitment: 'processed',
});

let idlFileContent;

const idl: Idl | undefined = idlFileContent as unknown as Idl;
let anaheim: Idl | undefined = idl;
const programId = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID ?? initialProgramId.toBase58());

if (!wallet) {
    throw new Error("Wallet not connected");
}

export interface AnaheimAccount {
    balance: number;
    publicKey: PublicKey;
    account: {
        count: number;
        owner: PublicKey;
    };
}

export async function fetchAnaheimAccounts(program: Command): Promise<AnaheimAccount[]> {
    if (!program) throw new Error('Program is not initialized');

    // Fetch all accounts in Anaheim program
    const accounts = await (program.account as any)['anaheim'].all();
    return accounts.map((account: { account: { balance: any; count: any; owner: PublicKey; }; publicKey: any; }) => ({
        balance: account.account.balance,
        publicKey: account.publicKey,
        account: {
            count: account.account.count,
            owner: new PublicKey((account.account.owner as PublicKey).toBase58()),
        },
    })) as AnaheimAccount[];
}