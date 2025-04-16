import { UseBaseQueryResult, useQuery } from '@tanstack/react-query';
import { Connection, PublicKey } from '@solana/web3.js';
import { Anaheim } from 'anchor/target/idl/anaheim.json';
import { z } from 'zod';
import { useAnaheimProgram } from '../../hooks/usePrograms/useAnaheimProgram';
import { AnchorWallet } from '@solana/wallet-adapter-react'; // Typage AnaheimProgram défini ailleurs

// Déclaration et typage explicite de fetchData
async function fetchData(): Promise<unknown> {
    const accountPublicKey = new PublicKey('79cjGbTK8HpMABm6fxfr27sF6mhiWxKjnKK7cozT8igf'); // Remplacez par une clé dynamique si nécessaire
    const anaheimProgram = useAnaheimProgram();
    const { program } = anaheimProgram.state === 'active' ? anaheimProgram : { program: null };

    // Vérifications pour éviter les erreurs d'exécution
    if (!program) {
        console.error('Program instance is null. Ensure that the wallet is connected and the program is properly configured.');
        throw new Error('Failed to fetch data because the program is not available.');
    }

    if (!program.account?.anaheim) {
        throw new Error('Program or Anaheim account configuration is invalid.');
    }

    try {
        // Récupération des données du compte
        const fetchedData = await program.account.anaheim.fetch(accountPublicKey);
        console.log('Fetched data successfully:', fetchedData);

        return fetchedData as unknown; // Spécifiez le type attendu au besoin
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw new Error('Failed to fetch Anaheim account data.');
    }
}

// Exécution et gestion des promesses
fetchData()
  .then((data) => {
      console.log('Data:', data);
      // Ajoutez des étapes supplémentaires pour traiter vos données
  })
  .catch((error) => {
      console.error('Error while fetching data:', error);
  });

// Déclarez un type explicite pour program et ses propriétés
interface AnaheimAccount {
    fetch: (key: PublicKey) => Promise<unknown>;
}

interface LocalProgram<T> {
    account: { anaheim: AnaheimAccount };
}

// Type pour `anaheimProgram`
interface AnaheimProgram {
    program: LocalProgram<Anaheim> | null;
}
interface AccountData {
    count: number;
    // Vous pouvez ajouter d'autres champs nécessaires ici
    fetchedAt: string; // Exemple d'ajout de métadonnées au résultat
}
interface FetchAccountData {
    accountPublicKey: PublicKey;
    additionalInfo?: string;
}
const fetchAccountData = async (params: { key: PublicKey }): Promise<void> => {
    console.log('Clé publique utilisée :', params.key.toString());
}

// Utilisation d'un type explicite
    const anaheimProgram = useAnaheimProgram();
    const fetchAnaheimData = async () => {
        try {
            if (anaheimProgram?.state !== 'active' || !anaheimProgram.program) {
                console.error('Le programme Anchor est introuvable ou non initialisé.');
                return;
            }
            const key = new PublicKey('...');
            const keyString = '<replace-with-valid-key>'; // Remplacez par une clé valide
            try {
                const key = new PublicKey(keyString);
            } catch (error) {
                console.error('Clé publique invalide :', error);
                return;
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    };

    fetchAnaheimData();

    type AnaheimProgramState =
      | { state: 'idle'; wallet: null; connection: null; program: null }
      | {
        state: 'active';
        wallet: AnchorWallet;
        connection: Connection;
        program: { account: { anaheim: AnaheimAccount } };
    }
      | { state: 'error'; error: unknown };
    export function useAnaheimProgram(
      publicKey?: PublicKey
    ): AnaheimProgramState {
        if (!publicKey) {
            return { state: 'idle', wallet: null, connection: null, program: null };
        }

        const anaheimAccount: AnaheimAccount = {
            fetch: async (key) => {
                // Logique pour récupérer les données ici
                if (!key) {
                    throw new Error('PublicKey is required');
                }
                return {}; // Placeholder pour les données
            },
        };

        return {
            state: 'active',
            wallet: {} as AnchorWallet,
            connection: new Connection('https://api.mainnet-beta.solana.com'),
            program: {
                account: { anaheim: anaheimAccount },
            },
        };
    }
let fetchedData: unknown;
const schema = z.object({
    name: z.string(),
    age: z.number().default(30),
});
expect(() => schema.parse(fetchedData)).not.toThrow();

const parsedData = schema.parse(fetchedData); // Validate les données
console.log('Parsed data:', parsedData);


export type SchemaType = z.infer<typeof schema>; // { name: string; age: number; }
    const program = anaheimProgram?.state === 'active' ? anaheimProgram.program : null;
let data;
const validData = schema.parse(data); // Valide réellement les données
if (anaheimProgram?.state === 'active' && anaheimProgram.program) {
    const accountPublicKey = new PublicKey ( 'ReplaceThisWithDynamicKeyOrConfig' );
    if (!accountPublicKey) {
        throw new Error ( 'The "accountPublicKey" is required and cannot be undefined or null.' );
    }
    const queryKey = accountPublicKey
      ? ['anaheim', 'account', accountPublicKey.toBase58 ()]
      : ['anaheim', 'account', 'no-public-key'];
    const useAnaheimAccountQuery = (): UseBaseQueryResult<AccountData, Error> => {
        return useQuery<AccountData, Error> ( {
            queryKey,
            queryFn: async (): Promise<AccountData> => {
                // Vérifiez que le programme et la clé publique sont valides
                if (!accountPublicKey || typeof accountPublicKey.toBase58 !== 'function') {
                    throw new Error ( 'The "accountPublicKey" is not a valid PublicKey instance.' );
                }
                if (!program) {
                    return Promise.reject ( new Error ( 'Solana program is not initialized.' ) );
                }
                // Récupération des données
                try {
                    const fetchedData = await program.account.anaheim.fetch ( accountPublicKey );
                    // Validation des données récupérées
                    if (!fetchedData) {
                        throw new Error ( 'No data received from the "anaheim" account.' );
                    }
                    if (typeof fetchedData.count !== 'number') {
                        throw new Error ( 'The "count" field in fetched data is invalid.' );
                    }

                    // Ajout de métadonnées et retour des données
                    return { count: 0, fetchedAt: '', ...fetchedData, fetchedAt: new Date ().toISOString () };

                } catch (error) {
                    throw new Error ( `Failed to fetch account data: ${(error as Error).message}` );
                }
            }
        } );
    };
} else {
    throw new Error ( 'The "anaheimProgram" is not initialized.' );
}
