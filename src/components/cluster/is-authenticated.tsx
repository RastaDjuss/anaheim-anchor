import { clusterApiUrl } from '@solana/web3.js';
import { atom, WritableAtom } from 'jotai';
import { SetStateAction } from 'react';

export const ClusterNetworkEnum = {
	Devnet: 'devnet',
	Testnet: 'testnet',
	MainnetBeta: 'mainnet-beta',
	Custom: 'custom',
	Mainnet: 'mainnet' // Correction : en minuscule pour harmonisation
} as const;
export type ClusterNetworkEnum = typeof ClusterNetworkEnum[keyof typeof ClusterNetworkEnum];

export class ClusterNetwork {
	static Mainnet: 'mainnet' = 'mainnet';
	static Devnet: 'devnet' = 'devnet';
	static Testnet: 'testnet' = 'testnet';
	static Custom: 'custom' = 'custom';
}

export interface ClusterType {
	name: string;
	endpoint: string;
	network: string; // Utilise ClusterNetworkEnum pour restreindre si nécessaire
	key: string;
	value: string;
}

const defaultClusters: ClusterType[] = [
	{
		name: 'devnet',
		endpoint: clusterApiUrl ( 'devnet' ),
		network: ClusterNetwork.Devnet,
		key: 'devnet',
		value: 'devnet'
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
		endpoint: clusterApiUrl ( 'testnet' ),
		network: ClusterNetwork.Testnet,
		key: 'testnet',
		value: 'testnet'
	}
];

const clustersAtom: WritableAtom<ClusterType[], [SetStateAction<ClusterType[]>], void> = Object.assign (
	atom<ClusterType[]> ( defaultClusters ),
	{ initialValue: defaultClusters }
);

export function useCluster() {
}