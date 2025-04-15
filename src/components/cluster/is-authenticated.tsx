'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { clusterApiUrl, Version } from '@solana/web3.js';
import { Atom, atom, SetStateAction, useAtomValue,  WritableAtom } from 'jotai';
import {
	QueryObserverLoadingErrorResult, QueryObserverLoadingResult,
	QueryObserverPendingResult,
	QueryObserverPlaceholderResult,
	QueryObserverRefetchErrorResult,
	QueryObserverSuccessResult,
	Register,
	useQuery
} from '@tanstack/react-query';
import { useConnection } from '@solana/wallet-adapter-react';
import type { JSX } from 'react';
import Context from '@sinclair/typebox';

export function IsAuthenticated() {
	const { connection } = useConnection();

	return (
		<div>
			{/* Utilisez "connection" ici */}
		</div>
	);
}
export enum ClusterNetwork {
	Mainnet = 'mainnet-beta',
	Testnet = 'testnet',
	Devnet = 'devnet',
    Custom = 'custom'
}
const { connection } = useConnection();

let cluster: typeof import('module');
// Ensure no global–local conflicts for clusterAtom

export let retrievedClusters: ClusterType[];

retrievedClusters = useAtomValue(atom<ClusterType[]>([])); // Placeholder for defaultClusters
type UserContextType = {
	user: string | undefined;
	isAuthenticated: boolean;
	cluster?: ClusterType; // Updated to use a consistent, conflict-free type
	addCluster?: (cluster: ClusterType) => void;
	getExplorerUrl?: (path: string) => string;
};

export const UserContext = createContext<UserContextType | null>(null);
// Variable correctement définie// Liste des clusters
let contextValue = useContext(UserContext);

if (!contextValue) {
	throw new Error('UserContext is not provided');
}
export let user: string | undefined, isAuthenticated: boolean;
({ user, isAuthenticated } = contextValue ?? { user: undefined, isAuthenticated: false });

const read = (get: (atom: Atom<ClusterType[]>) => ClusterType[]) => {
    const clustersList = get(clustersAtom) || [];
    return clustersList.find((item) => item.active) || clustersList[0];
};

const activeClusterAtom = atom<ClusterType>((get) => read(get));
contextValue = {
	user: undefined, // Provide default value or fetch the user dynamically
	isAuthenticated: false, // Default to false; update once authentication logic is implemented
	cluster: useAtomValue(activeClusterAtom) as ClusterType | undefined, // Correct type casting to ensure compatibility
	getExplorerUrl: (path: string) => {
		const cluster = contextValue?.cluster as ClusterType | undefined;
		if (!cluster || !Object.values(ClusterNetwork).includes(cluster.network as ClusterNetwork)) {
			throw new Error('Invalid cluster type for URL generation');
		}
		return `https://explorer.solana.com/${path}${getClusterUrlParam(cluster?.network as ClusterNetwork ?? ClusterNetwork.Mainnet)}`;
	}
};
export type Cluster = 'devnet' | 'testnet' | 'mainnet-beta'

// Duplicate definition of 'read' was removed to fix the error
// Removed the redundant duplicate implementation of 'deleteCluster'
		// Provide a default value or handle missing network
export interface ClusterType { // Renamed to resolve declaration conflict
	name: string
	endpoint: string
	network?: ClusterNetwork
	active?: boolean
	key: string
	value: string
}

export const [clusters, setClusters] = useState<Cluster[]>(() => []); // Modified to use a functional initialize
let newCluster: ClusterType = { name: '', endpoint: '', network: undefined, active: false, key: '', value: '' };
setClusters((prevClusters: Cluster[]) => [
    ...prevClusters,
    newCluster.network && Object.values(ClusterNetwork).includes(newCluster.network)
        ? (newCluster.network as Cluster)
        : ClusterNetwork.Devnet,
]);
const { connection: walletConnection } = useConnection();
const clusterQuery = useQuery({
    initialData: undefined,
    queryKey: ['version', { cluster: contextValue?.cluster, endpoint: walletConnection.rpcEndpoint }],
    queryFn: async (): Promise<import('@solana/web3.js').Version> => {
        return walletConnection.getVersion();
    },
    retry: 1 as const
});

if (clusterQuery.isError) {
    console.error('Cluster query failed:', clusterQuery.error);
    // Ajoutez ici une gestion d’erreur personnalisée si nécessaire
}

try {
	// Vérification simple pour voir si l'endpoint répond via un ping (par ex. getVersion)
	walletConnection.getVersion().then(r => { /* handle response */
	});
} catch (err) {
	throw new Error('Impossible de se connecter à l\'endpoint : ' + (err instanceof Error ? err.message : String(err)));
}
export const defaultClusters: ClusterType[] = [
	{
		name: 'devnet',
		endpoint: clusterApiUrl('devnet'),
		network: ClusterNetwork.Devnet,
		key: 'devnet', // Example value
		value: 'devnet' // Example value
	},
	{
		name: 'local',
		endpoint: 'http://localhost:8899',
		network: ClusterNetwork.Custom,
		key: 'local',
		value: 'local'
	},
	{
		name: 'testnet',
		endpoint: clusterApiUrl('testnet'),
		network: ClusterNetwork.Testnet,
		key: 'testnet',
		value: 'testnet'
	}
];

class WithInitialValue<T> {
}

// Ensure clusterAtom is not redeclared
const clustersAtom: WritableAtom<ClusterType[], [SetStateAction<ClusterType[]>], void> & WithInitialValue<ClusterType[]> = atom<ClusterType[]>(defaultClusters);
export let activeClustersAtom: Atom<ClusterType[]>;
activeClustersAtom = atom<ClusterType[]>((get) => {
	let clusters: ClusterType[], cluster: ClusterType;
	clusters = get(clustersAtom);
	cluster = get(activeClusterAtom);
	return clusters.map((item) => ({
		...item
	}));
});
export let activeCluster: ClusterType; // Updated to use the renamed interface
activeCluster = { name: '', endpoint: '', network: undefined, active: false, key: '', value: '' };
export interface ClusterProviderContext {
	network: readonly unknown[];
	cluster: ClusterType;
	clusters: ClusterType[];
	addCluster: (cluster: ClusterType) => void;
	deleteCluster: (cluster: ClusterType) => void;
	setCluster: (cluster: ClusterType) => void;
	getExplorerUrl(path: string): string;
}

export default class SetStateActionWithReset<T> {
}
function getClusterUrlParam(clusterNetwork: ClusterNetwork): string {
	let suffix = '';
	switch (clusterNetwork) {
		case ClusterNetwork.Devnet:
			suffix = 'devnet';
			break;
		case ClusterNetwork.Mainnet:
			suffix = 'mainnet-beta';
			break;
		case ClusterNetwork.Testnet:
			suffix = 'testnet';
			break;
		default:
            suffix = `custom&customUrl=${encodeURIComponent((cluster as unknown as ClusterType).endpoint)}`;
			break;
	}

	return suffix.length ? `?cluster=${suffix}` : '';
}

function ClusterStatus() {
	return null;
}

export let ClusterComponent: () => React.JSX.Element,
	clusterQueryResult: QueryObserverRefetchErrorResult<Version, Register extends {
		defaultError: infer TError
	} ? TError : Error> | QueryObserverSuccessResult<Version, Register extends {
		defaultError: infer TError
	} ? TError : Error> | QueryObserverLoadingErrorResult<Version, Register extends {
		defaultError: infer TError
	} ? TError : Error> | QueryObserverLoadingResult<Version, Register extends {
		defaultError: infer TError
	} ? TError : Error> | QueryObserverPendingResult<Version, Register extends {
		defaultError: infer TError
	} ? TError : Error> | QueryObserverPlaceholderResult<Version, Register extends {
		defaultError: infer TError
	} ? TError : Error>;
ClusterComponent = () => {
	return <ClusterStatus />;
};
clusterQueryResult = useQuery({
	queryKey: ['version', { cluster: contextValue?.cluster, endpoint: connection.rpcEndpoint }],
	queryFn: async () => {
		try {
			return await connection.getVersion();
		} catch (error) {
			console.error('Error fetching cluster version:', error);
			throw error;
		}
	},
	retry: 1,
	refetchOnWindowFocus: false // Prevent refetching data unnecessarily when the browser window regains focus
});

export let isClusterProviderContext: (value: unknown) => boolean;
isClusterProviderContext = (value: unknown): boolean => (
	value !== null &&
	typeof value === 'object' &&
	'cluster' in value &&
	'clusters' in value &&
	'addCluster' in value &&
	'deleteCluster' in value &&
	'setCluster' in value &&
	'getExplorerUrl' in value
);

export function useCluster() {
	let clusterContext;
	if (!clusterContext) {
		throw new Error('useCluster must be used within a ClusterProvider.');
	}
	return clusterContext;
}

export const ClusterChecker = ({ children }: { children: ReactNode }): JSX.Element => {
	const { cluster } = useCluster() as unknown as ClusterProviderContext;

	if (!cluster || !cluster.name || !cluster.endpoint) {
		console.warn('Invalid cluster configuration:', cluster);
		return <div>Error: Invalid cluster configuration.</div>;
	}

	return (
		<>
			{clusterQueryResult.isError && <p>Error fetching cluster data: {String(clusterQueryResult.error)}</p>}
			{clusterQueryResult.isLoading && <p>Loading cluster...</p>}
			{!clusterQueryResult.isLoading && !clusterQueryResult.isError && clusterQueryResult.data && (
				<p>Cluster connected successfully!</p>
			)}
			{children}
		</>
	);
};

