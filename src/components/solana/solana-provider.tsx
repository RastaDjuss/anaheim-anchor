'use client';

import dynamic from 'next/dynamic';
import { AnchorProvider, AnchorProviderOptions } from '@coral-xyz/anchor';
import { WalletError } from '@solana/wallet-adapter-base';
import {
  AnchorWallet,
  useConnection,
  useWallet,
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ReactNode, useCallback, useMemo } from 'react';
import { useCluster } from '../cluster/is-authenticated';

require ( '@solana/wallet-adapter-react-ui/styles.css' );

export const WalletButton = dynamic ( async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton, {
  ssr: false
} );

export function SolanaProvider({ children }: { children: ReactNode }) {
  if (!children) {
    return null; // Or return some fallback UI
  }
  const { cluster }: { cluster: { endpoint: string } } = useCluster ();
  const endpoint = useMemo ( () => cluster.endpoint, [cluster] );
  const onError = useCallback ( (error: WalletError) => {
    console.error ( 'Wallet error:', error );
  }, [] );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function useAnchorProvider() {
  const { connection } = useConnection ();
  const wallet = useWallet ();

  const options: AnchorProviderOptions = useMemo ( () => ({ commitment: 'confirmed' }), [] );

  if (!connection) {
    console.error ( 'Connection is not available for AnchorProvider.' );
    throw new Error ( 'Connection is required to initialize AnchorProvider.' );
  }

  if (!wallet) {
    console.error ( 'Wallet is not available for AnchorProvider.' );
    throw new Error ( 'Wallet is required to initialize AnchorProvider.' );
  }

  return useMemo ( () => {
    return new AnchorProvider ( connection, wallet as AnchorWallet, options );
  }, [connection, wallet, options] );
}
