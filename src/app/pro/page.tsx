'use client';

import React, { useState } from 'react';
import { WalletConnectProvider } from '@/components/solana/wallet-utils/WalletConnect';
import ProFeature from '../../components/pro/pro-feature';

const WalletConnector: React.FC = () => {
	const [error, setError] = useState<string | null>(null);

	const handleConnectWallet = async () => {
		try {
			// Exemple de logique pour connecter un portefeuille
			console.log('Connexion en cours...');
			// connect(); (Appeler la librairie de connexion, exemple Solana wallet adapter)
			setError(null); // Réinitialiser les erreurs après réussite
		} catch (err) {
			setError('Erreur lors de la connexion au portefeuille.');
		}
	};

	return (
		<WalletConnectProvider.Provider value={{ /* valeurs nécessaires au contexte */ }}>
			<ProFeature>
				<button
					className="btn btn-primary"
					onClick={handleConnectWallet}
				>
					Connect Wallet
				</button>
				{error && (
					<p className="text-red-500">
						{error.replace(/</g, '&lt;')}
					</p>
				)}
			</ProFeature>
		</WalletConnectProvider.Provider>
	);
};

export default WalletConnector;
