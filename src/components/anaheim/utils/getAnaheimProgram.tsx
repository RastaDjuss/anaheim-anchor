import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl, PublicKey, Cluster, Commitment } from '@solana/web3.js';
import { AnchorProvider, Program, Idl } from '@coral-xyz/anchor';
import { z } from 'zod';
import idl from '../../../../anchor/target/idl/anaheim.json';
import React from 'react';

const IdlSchema = z.object({
  version: z.string(),
  name: z.string(),
  instructions: z.array(
    z.object({
      name: z.string(),
      accounts: z.array(
        z.object({
          name: z.string(),
          isMut: z.boolean(),
          isSigner: z.boolean(),
        })
      ),
      args: z.array(
        z.object({
          name: z.string(),
          type: z.string(),
        })
      ),
    })
  ),
  address: z.string(),
  metadata: z.record(z.string(), z.any()).nullable().optional(),
});

const PROGRAM_ID = new PublicKey('85FCHsGWdCf4v6knH9u42DMn9bMZ2SnwtU3rG7H4rwoq');

export function useAnaheimProgram(cluster: string | Cluster = 'devnet') {
  const wallet = useAnchorWallet();
    const isCustomUrl = cluster.startsWith('http://') || cluster.startsWith('https://');
    let connectionUrl: string;
  if (isCustomUrl) {
    connectionUrl = cluster;
  } else {
    connectionUrl = clusterApiUrl(cluster as Cluster);
  }

    if (!wallet) {
        console.warn('[useAnaheimProgram] Aucun portefeuille disponible.');
        const connection = React.useMemo(() => new Connection(connectionUrl), [connectionUrl]);
        return Object.freeze({ wallet: null, connection, program: null });
    }
  const connection = React.useMemo(() => new Connection(connectionUrl), [connectionUrl]);
  try {
    // Validation stricte de l'IDL avec Zod
    const validatedIdl = IdlSchema.parse(idl);

    // Initialisation du fournisseur Anchor
        const options = AnchorProvider.defaultOptions
          ? AnchorProvider.defaultOptions()
          : { preflightCommitment: 'processed' as Commitment, commitment: 'finalized' as Commitment };

    const provider = wallet ? new AnchorProvider(connection, wallet, options) : null;

    // Initialisation SÛRE sans cast
    const program = provider ? new Program(validatedIdl as unknown as Idl, PROGRAM_ID, provider) : null;

    return { wallet, connection, program };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error('[useAnaheimProgram] Échec de validation de l’IDL :', error.errors);
    } else {
      console.error('[useAnaheimProgram] Une erreur est survenue :', error);
    }
    return Object.freeze({ wallet: null, connection: null, program: null });
  }
}