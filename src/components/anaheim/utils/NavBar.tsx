"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

type NavbarProps = {
	links: { label: string; path: string }[];
};

export default function Navbar({ links }: NavbarProps) {
	const pathname = usePathname();

	return (
		<div className="navbar bg-base-300 dark:text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0">
			<div className="flex-1">
				<Link className="btn btn-ghost normal-case text-xl" href="/">
					Anaheim
				</Link>
				{links.length > 0 && (
					<ul className="menu menu-horizontal px-1 space-x-2">
						{links.map(({ label, path }) => (
							<li key={path}>
								<Link
									className={pathname?.startsWith(path) ? 'active' : ''}
									href={path}
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}