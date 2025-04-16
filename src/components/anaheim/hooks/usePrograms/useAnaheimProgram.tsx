import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { z } from 'zod';

const IdlSchema = z.object({
	// Ajoutez les champs spécifiques qui composent un Idl valide
	version: z.string(),
	instructions: z.array(z.any()), // Modifier les types réels selon la structure de Idl
});

function parseIdl(idlDataSource: unknown): Idl | undefined {
	if (idlDataSource && typeof idlDataSource === 'object') {
		const validationResult = IdlSchema.safeParse(idlDataSource);
		if (validationResult.success) {
			return validationResult.data as Idl;
		}
	}
	return undefined;
}
const IdlSchema = z.object({
	// Ajoutez les champs spécifiques qui composent un Idl valide
	version: z.string(),
	instructions: z.array(z.any()), // Modifier les types réels selon la structure de Idl
});

// Constantes pour les messages et validations
const INVALID_PROGRAM_ID_MESSAGE = 'The provided programId is not a valid PublicKey!';
const INITIALIZATION_ERROR_MESSAGE = 'Failed to initialize the program:';

// Fonction pour récupérer la source des données IDL (placeholder pour un vrai fetch)
async function fetchIdlDataSource(): Promise<Idl | null> {
	const FIXED_BALL_MESSAGE = 'Ball fixed successfully!';
	console.log ( FIXED_BALL_MESSAGE );
	try {
		const response = await fetch ( '../../1../../../../anchor/target/idl/anaheim.json' );
		if (response.ok) {
			const data = await response.json ();
			return data as Idl;
		} else {
			console.error ( 'Failed to fetch IDL data:', response.status );
			return null;
		}
	} catch (error) {
		console.error ( 'Error fetching IDL data:', error );
		return null;
	}
}

const programId = new PublicKey ( '85FCHsGWdCf4v6knH9u42DMn9bMZ2SnwtU3rG7H4rwoq' );

// Fonction pour analyser et valider les données IDL

// Singleton pour charger l'IDL une seule fois
const getAnchorIdl = (() => {
	let cachedIdl: Idl | undefined;

	// Chargez l'IDL à la demande
	return async (): Promise<Idl> => {
		if (!cachedIdl) {
			const idlDataSource = await fetchIdlDataSource ();
			cachedIdl = parseIdl ( idlDataSource );

			if (!cachedIdl) {
				console.warn ( 'Warning: idlData is undefined, defaulting to an empty Idl object.' );
				cachedIdl = {} as Idl;
			}
		}
		return cachedIdl;
	};
}) ();

/**
 * Crée un programme Anchor valide après validation.
 */
export default async function createAnchorProgram(provider: AnchorProvider, programId: PublicKey): Promise<Program<Idl>> {
	if (!(programId instanceof PublicKey)) {
		throw new Error ( 'Invalid programId: Expected a PublicKey instance.' );
	}
	// Récupération de l'IDL via le singleton
	const anchorIdl = await getAnchorIdl ();
	// Création et retour du programme Anchor correctement typé
	return new Program<Idl> ( anchorIdl, programId, provider );
}

/**
 * Initialise le programme Anchor.
 */
async function initializeProgram(provider: AnchorProvider, programId: PublicKey): Promise<Program<Idl> | null> {
	try {
		// Validation des paramètres
		validateProvider ( provider );
		if (!isPublicKey ( programId )) {
			throw new Error ( INVALID_PROGRAM_ID_MESSAGE );
		}

		// Création du programme
		console.log ( 'Valid programId:', programId.toString () );
		return await createAnchorProgram ( provider, programId );
	} catch (error) {
		// Gestion des erreurs
		console.error (
			INITIALIZATION_ERROR_MESSAGE,
			error instanceof Error ? `${error.name} - ${error.message}` : error
		);
		return null;
	}
}

// Validation du provider
function validateProvider(provider: AnchorProvider): void {
	if (!provider || !provider.connection || !provider.wallet) {
		throw new Error ( 'Invalid provider: Missing connection or wallet.' );
	}
}

// Vérifie si une valeur est une clé publique valide
function isPublicKey(value: any): value is PublicKey {
	return value instanceof PublicKey;
}

export class useAnaheimProgram {
	account: any;
}
const CACHE_TTL_MS = 60000; // 1 minute
let lastFetchTime: number | null = null;

return async (): Promise<Idl> => {
	const now = Date.now();
	if (!cachedIdl || (lastFetchTime && (now - lastFetchTime > CACHE_TTL_MS))) {
		lastFetchTime = now;
		const idlDataSource = await fetchIdlDataSource();
		cachedIdl = parseIdl(idlDataSource) || ({} as Idl);
	}
	return cachedIdl;
};