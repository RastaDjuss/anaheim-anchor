import { useConnection } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey } from '@solana/web3.js';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { useAnchorProvider } from '../solana/solana-provider;
import { useCluster } from '../cluster/cluster-data-access'
import { AnchorProvider, Program } from '@coral-xyz/anchor';

// Mapping des Program IDs par réseau
const programIds: Record<string, string> = {
  'mainnet-beta': 'MAINNET_PROGRAM_ID_PLACEHOLDER',
  devnet: 'DEVNET_PROGRAM_ID_PLACEHOLDER',
  testnet: 'TESTNET_PROGRAM_ID_PLACEHOLDER',
};

// Utilitaire pour récupérer un PublicKey en fonction du réseau
function getAnaheimProgramId(network: string): PublicKey {
  if (!programIds[network]) {
    console.error(`Unsupported network: ${network}.`);
    throw new Error(`No program ID defined for network: ${network}`);
  }
  return new PublicKey(programIds[network]);
}

// Hook pour initialiser et utiliser le programme Anaheim
export function useAnaheimProgram() {
  const { connection } = useConnection(); // Connexion Solana
	const clusterContext = useCluster(); // Cluster utilisé
	const cluster = clusterContext?.cluster; // Access cluster property safely
  const provider = useAnchorProvider(); // Fournisseur Anchor

  // ID du programme basé sur le réseau
  const programId = useMemo(() => {
    try {
      const network = cluster?.network ?? 'unknown';
      if (network === 'unknown') {
        console.warn('Cluster network is undefined. Using the default program ID.');
      }
      return getAnaheimProgramId(network);
    } catch (error) {
      console.error('Failed to get program ID:', error);
      console.error ( 'Failed to get program ID:', error );
      throw new Error('Error determining program ID.');
    }
  }, [cluster]);

  // Importation et mémorisation du programme Anaheim
  return useMemo(() => {
    const idlPromise = import('../../../anchor/target/idl/anaheim.json');
    return idlPromise.then((idl) => new Program(idl as any, programId, provider as AnchorProvider));
  }, [programId, provider]);
}

// Hook pour exécuter une mutation d'initialisation
const useInitializeMutation = () => {
  const provider = useAnchorProvider();
  const programPromise = useAnaheimProgram();

  return useMutation({
    mutationFn: async (keypair: Keypair) => {
      try {
        if (!provider) {
          throw new Error('Provider is unavailable.');
        }

        const anaheimProgram = await programPromise;

        if (!anaheimProgram) {
          throw new Error('Anaheim program not defined.');
        }

        const tx = await anaheimProgram.rpc.initialize({
          accounts: {
            myAccount: keypair.publicKey, // Remplacez "myAccount" par le nom correct du compte dans votre IDL
          },
          signers: [keypair],
        });

        return tx;
      } catch (error) {
        console.error('Initialization error:', error);
        if (error instanceof Error) {
          throw new Error(`Failed to initialize: ${error.message}`);
        } else {
          throw new Error('Failed to initialize: An unknown error occurred.');
        }
      }
    },
  });
};

// Hook pour récupérer des comptes via React Query
const useFetchAccounts = () => {
  const programPromise = useAnaheimProgram();

  return useQuery({
    queryKey: ['accounts-data'],
    queryFn: async () => {
      try {
        const anaheimProgram = await programPromise;

        if (!anaheimProgram || !anaheimProgram.account) {
          throw new Error('Program account API is unavailable.');
        }
        return await anaheimProgram.account['myAccount'].fetchAll(); // Replace "myAccount" with the actual account name as defined in your program's IDL
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
        throw error;
      }
    },
  });
};

// Exemple d'utilisation dans un composant React
const AnaheimComponent = () => {
  const { data: accounts, error: fetchError } = useFetchAccounts();
  const initializeMutation = useInitializeMutation();

  const handleInitialize = useCallback((keypair: Keypair) => {
    initializeMutation.mutate(keypair, {
      onSuccess: (tx) => {
        console.log('Transaction successful:', tx);
      },
      onError: (error) => {
        console.error('Transaction failed:', error);
      },
    });
  }, [initializeMutation]);

  if (fetchError) {
    return <div>Error loading accounts: {fetchError.message}</div>;
  }

  return (
    <div>
      <h1>Accounts Data</h1>
      {accounts ? (
        <ul>
          {accounts.map((account: any, index: number) => (
            <li key={index}>{JSON.stringify(account)}</li>
          ))}
        </ul>
      ) : (
        <p>Loading accounts...</p>
      )}
      <button onClick={() => handleInitialize(Keypair.generate())}>
        Initialize
      </button>
    </div>
  );
};

export default AnaheimComponent;