import { usePathname } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import React, { ReactNode } from 'react';


/**
 * Hook permettant d'afficher une alerte de transaction avec un toast.
 */
export let useTransactionToast: () => (signature: string, links: { label: string; path: string }[]) => void;
useTransactionToast = () => {
	const pathname = usePathname (); // Obtenir le chemin actuel

	return (signature: string, links: { label: string; path: string }[]) => {
		toast.success (
			<div className="text-center">
				<div className="font-bold">Transaction sent!</div>
				<div>
					<a
						href={`https://explorer.solana.com/tx/${signature}?cluster=${pathname}`}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-primary mt-2"
					>
						View Transaction
					</a>
				</div>
				<div className="mt-4">
					<nav>
						<ul className="flex flex-col items-start gap-2">
							{links.map ( ({ label, path }, index) => (
								<li key={index}>
									<Link href={path} className="text-sky-500 hover:underline">
										{label}
									</Link>
								</li>
							) )}
						</ul>
					</nav>
				</div>
			</div>,
			{
				duration: 4000 // Le toast reste 4 secondes
			}
		);
	};
};