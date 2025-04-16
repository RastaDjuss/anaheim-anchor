import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export function WalletConnectButton() {
	const { connect, disconnect, connected } = useWallet();
	const [error, setError] = useState<string | null>(null);

	const handleClick = async () => {
		try {
			setError(null);
			if (connected) {
				await disconnect();
			} else {
				await connect();
			}
		} catch (err) {
			console.error('Wallet connection failed:', err);
			setError('Failed to connect/disconnect wallet.');
		}
	};

	return (
		<div>
			<button
				type="button"
				onClick={handleClick}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				aria-label={connected ? 'Disconnect wallet' : 'Connect to wallet'}
			>
				{connected ? 'Disconnect Wallet' : 'Connect Wallet'}
			</button>
			{error && <p className="text-red-500 mt-2">{error}</p>}
		</div>
	);
}

export class WalletConnectProvider {
    static Provider: any;
}