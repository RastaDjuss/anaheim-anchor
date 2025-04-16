'use client';

import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletError } from '@solana/wallet-adapter-base';
import { ReactNode, useCallback, useMemo } from 'react';
import { WalletProvider } from '@solana/wallet-adapter-react';
import {
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
export function useCluster(): { endpoint: string } {
  const endpoint = useMemo(() => 'https://api.mainnet-beta.solana.com', []);
  if (!endpoint.startsWith('https://')) {
    throw new Error('Endpoint invalide');
  }
  return { endpoint };
}

export function SolanaProvider({ children }: { children: ReactNode }) {
  if (!children) {
    return null;
  }
  const cluster = useCluster();
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  const onError = useCallback((error: WalletError) => {
    console.error('Wallet error:', error);
    // Possibilité d'ajouter une notification utilisateur ou un monitoring
  }, []);

  return (
    <ConnectionProvider endpoint={cluster.endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
export function WalletButton() {
  return <button>Connect Wallet</button>;
}