'use client';

import { useConnection } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Program, Idl, AnchorProvider } from '@coral-xyz/anchor';
import { useAnchorProvider } from '../solana/solana-provider';
import { query } from '../../../lib/db';

// Utilisation d'une connection `mainnet-beta` Solana
export const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Fonction pour récupérer le solde d'une adresse publique
export const getBalance = async (publicKey: PublicKey): Promise<number> => {
	try {
		const balance = await connection.getBalance(publicKey); // Solde en lamports
		console.log('Balance:', balance);
		return balance;
	} catch (error) {
		console.error('Error retrieving balance:', error);
		throw new Error(`Unable to retrieve balance for ${publicKey.toString()}: ${error.message}`);
	}
};

// Fonction utilitaire pour récupérer l'ID du programme basé sur le réseau
function getAnaheimProgramId(network: string): PublicKey {
	const programIds: Record<string, string> = {
		'mainnet-beta': 'YourMainnetProgramIdString',
		devnet: 'YourDevnetProgramIdString',
		testnet: 'YourTestnetProgramIdString'
	};

	if (!programIds[network]) {
		console.warn(`Warning: Network "${network}" not recognized. Falling back to default Program ID.`);
	}

	return new PublicKey(programIds[network] || 'YourDefaultProgramIdString');
}

// Initialisation du programme Anchor
let resolvedProgramId: PublicKey | null = null;
const provider = useAnchorProvider();

if (!provider) {
	throw new Error('Provider is not initialized');
}

resolvedProgramId = getAnaheimProgramId('mainnet-beta'); // Initialisation selon le réseau actif
const anaheimProgram = new Program<Idl>(
	resolvedProgramId,
	provider as AnchorProvider
) as unknown as {
	account: Record<string, { fetchAll: () => Promise<any[]> }>;
};

// Classe pour représenter un type d'objet de compte spécifique
class YourAccountType {
	id: string;
	name: string;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
}

// Initialisation propre de variables globales
const accountsArray: YourAccountType[] = [];
let initializedValues: {
	connection: Connection;
	programId: PublicKey | null;
	accounts: any[];
	anaheimProgram: any;
} | null = null;

// Fonction pour initialiser la configuration globale
const initialize = async () => {
	return {
		connection,
		programId: resolvedProgramId,
		accounts: await query({ text: '<your-sql-query>', params: [] }), // Assurez-vous que `query` fonctionne correctement
		anaheimProgram
	};
};

// Exécution immédiate pour initialiser les valeurs
(async () => {
	initializedValues = await initialize();
})();

// Déclaration typée pour les paramètres d'une requête de base de données
type ParamsType = Record<string, string | number | boolean>;

interface QueryParams {
	text: string; // Texte ou requête SQL
	params: ParamsType; // Paramètres de la requête
}

// Fonction paramétrable pour exécuter des requêtes (exemple d'utilisation de TypeScript pour la base de données)
export async function query({ text, params }: QueryParams): Promise<any[]> {
	// Exemple fictif de logique métier `query`
	console.log('Executing query:', text, 'with params:', params);
	return Promise.resolve([]);
}