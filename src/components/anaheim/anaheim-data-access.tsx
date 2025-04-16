'use client';

import { useConnection } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor';
import { useCluster } from '../cluster/is-authenticated';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';
import idlData from '../../../anchor/target/idl/anaheim.json';
import * as z from 'zod';

const idlSchema = z.object({
  version: z.string(),
  name: z.string(),
  instructions: z.array(z.object({
    name: z.string(),
    accounts: z.array(z.object({
      name: z.string(),
      isMut: z.boolean().optional(),
      isSigner: z.boolean().optional(),
    })),
    args: z.array(z.object({
      name: z.string(),
      type: z.any(),
    })),
  })),
  accounts: z.optional(z.array(z.any())),  // Remplacez selon vos besoins
});

const idlValidated = idlSchema.safeParse(idlData);

if (!idlValidated.success) {
  console.error('IDL data validation failed:', idlValidated.error);
  throw new Error('Invalid IDL data');
}

return new Program(idlValidated.data, programId, provider);
// Fonction pour récupérer l'ID du programme basé sur le réseau
function getAnaheimProgramId(network: string): PublicKey {
  const programIds: Record<string, string> = {
    'mainnet-beta': 'YourMainnetProgramIdString',
    devnet: 'YourDevnetProgramIdString',
    testnet: 'YourTestnetProgramIdString',
  };

  if (!programIds[network]) {
    console.warn(`Unknown network: '${network}'. Using default program ID.`);
  }

  return new PublicKey(programIds[network] || 'coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF');
}

export function useAnaheimProgram() {
  // Récupération des dépendances via des hooks existants
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const provider = useAnchorProvider();
  const transactionToast = useTransactionToast();

  // Programme ID basé sur le réseau actuel
  const programId = useMemo(() => {
    if (!cluster?.network) {
      console.error('Cluster network is undefined. Default programId will be used.');
      return getAnaheimProgramId('default');
    }
    return getAnaheimProgramId(cluster.network);
  }, [cluster?.network]);

  // Initialisation du programme Anchor
  const program = useMemo(() => {
      if (!provider?.connection || !provider?.wallet) {
        console.error('Provider is invalid: missing connection or wallet');
        return null;
      }

      try {
        return new Program(idlData as unknown as Idl, programId, provider ?? useAnchorProvider());
        if (!provider?.connection || !provider?.wallet) {
          console.error('Invalid provider instance. Falling back to default.');
          return new Program(idlData as unknown as Idl, programId, useAnchorProvider());
        }
      } catch (error) {
        console.error('Failed to initialize Anaheim program:', error);
        return null;
      }
    },
    [provider, programId]);

  if (!program) {
    console.warn('Program is not initialized yet. Dependent hooks may fail.');
  }

  // Utilisation d'une requête React Query pour accéder aux comptes
  const accountsQuery: UseQueryResult<unknown, Error> = useQuery({
    queryKey: ['program-accounts', programId.toString()],
    queryFn: async () => {
      if (!program) {
        throw new Error('Program is not initialized. Cannot fetch accounts.');
      }

      const accountName = 'YourActualAccountName'; // Assurez-vous de remplacer par le nom correct du compte dans l'IDL
      if (!(program.account as Record<string, any>)[accountName]) {
        throw new Error(`Account '${accountName}' does not exist in the program.`);
      }

      try {
        let accountsData: any;
        accountsData = await (program.account as Record<string, any>)[accountName].all();
        return accountsData;
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
        throw new Error('Error fetching accounts data.');
      }
    },
    enabled: !!program, // Désactive la requête si le programme n'est pas encore prêt
  });

  // Mutation pour l'initialisation des comptes
  const initialize = useMutation({
    mutationFn: async (keypair: Keypair) => {
      if (!program || !provider) {
        throw new Error('Program or Provider is unavailable');
      }

      try {
        const tx = await program.methods
          .initialize()
          .accounts({
            keypair: keypair.publicKey, // Remplacez ou mappez les comptes nécessaires à votre IDL
          })
          .signers([keypair])
          .rpc();

        return tx;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Initialization failed:', error);
          throw new Error(`Initialization failed: ${error.message}`);
        } else {
          console.error('Initialization failed with an unknown error:', error);
          throw new Error('Initialization failed with an unknown error');
        }
      }
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      toast.success('Initialized successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Initialization failed: ${error.message}`);
    },
  });

  return {
    connection,
    cluster,
    programId,
    program,
    accounts: accountsQuery,
    initialize,
  };
}