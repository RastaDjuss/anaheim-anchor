'use client';

import React, { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { Adapter } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

// SolanaProvider : Fournit le contexte Solana et les fonctionnalités wallet
export const SolanaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Endpoint Solana
  const endpoint = useMemo(() => process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('devnet'), []);

  // Portefeuilles
  const wallets: Adapter[] = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  // Gestion des erreurs
  const handleError = (error: Error) => {
    console.error('Erreur de connexion à Solana:', error);
    toast.error('Impossible de se connecter au réseau ou au portefeuille.');
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect onError={handleError}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export class AnaheimFeature {
}