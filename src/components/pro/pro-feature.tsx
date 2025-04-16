'use client';

import { ReactNode } from 'react';

export default function AccountLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<header>
				{/* Barre de navigation */}
				<nav>
					<a href="/account" className="link">Account</a>
					<a href="/account/pro" className="link">Pro</a>
				</nav>
			</header>
			<main>{children}</main>
		</div>
	);
}