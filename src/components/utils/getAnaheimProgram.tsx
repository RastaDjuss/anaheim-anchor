import { AnchorProvider, Program } from '@project-serum/anchor'
import { Idl } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

export interface GetProgramParams {
    provider: AnchorProvider
    programId: PublicKey
    idl: Idl // Define IDL type or replace with your specific program IDL
}

// Function to return the program instance
export function getAnaheimProgram({ provider, programId, idl }: GetProgramParams) {
    return new Program(idl, programId, provider)
}