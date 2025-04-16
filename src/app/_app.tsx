import type { AppProps } from 'next/app';
import WalletConnectProvider from '@/components/solana/wallet-utils/WalletButton';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WalletConnectProvider>
			<Component {...pageProps} />
		</WalletConnectProvider>
	);
}