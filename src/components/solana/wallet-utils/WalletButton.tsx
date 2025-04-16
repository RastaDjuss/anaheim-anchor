'use client';

import { ReactNode, useMemo } from 'react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export function useCluster(): { endpoint: string } {
	const endpoint = useMemo(() => 'https://api.mainnet-beta.solana.com', []);
	if (!endpoint.startsWith('https://')) {
		throw new Error('Endpoint invalide');
	}
	return { endpoint };
}

export default function WalletConnectProvider({ children }: { children: ReactNode }) {
	const { endpoint } = useCluster();

	// Configuration des portefeuilles disponibles
	const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
}

export class WalletButton {
}