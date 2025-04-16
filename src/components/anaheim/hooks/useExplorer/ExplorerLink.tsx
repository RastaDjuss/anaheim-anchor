// components/ExplorerLink.tsx
import React from 'react';
import { useCluster } from '@/components/anaheim/hooks/useClusters/useCluster';

export let getExplorerUrl: (path: string) => string, explorerUrl: string;
({ getExplorerUrl } = useCluster ());
explorerUrl = path?.startsWith ( '/' ) ? `${getExplorerUrl ( '' )}${path}` : getExplorerUrl ( path || '' );
export type ExplorerLinkProps = {
	path?: string;
	label?: string;
	className?: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
	rel?: 'noopener' | 'noreferrer' | 'noopener noreferrer';
};

export function ExplorerLink({
															 path,
															 label,
															 className = '',
															 target = '_blank',
															 rel = 'noopener noreferrer'
														 }: ExplorerLinkProps): JSX.Element {
	const { getExplorerUrl } = useCluster();
	const explorerUrl = path ? getExplorerUrl(path) : '#';

	if (!path) {
		console.warn('Missing path for ExplorerLink');
	}

	return (
		<a href={explorerUrl} className={className} target={target} rel={rel}>
			{label}
		</a>
	);
}
ExplorerLink.defaultProps = { target: '_blank', rel: 'noopener noreferrer' };