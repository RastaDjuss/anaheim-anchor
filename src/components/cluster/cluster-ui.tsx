import React from 'react';
import { WalletButton } from '@/components/solana/solana-provider';

export interface ExplorerLinkProps {
	path?: string;
	label: string;
	className?: string;
	target?: string;
	rel?: string;
}

function ImportedClusterUiSelect() {
	return null;
}

export class ParentComponent extends React.Component {
	render(): React.JSX.Element {
		return (
			<div className="flex-none space-x-2">
				<WalletButton />
				<ImportedClusterUiSelect /> {/* Utilisation d'un composant React valide */}
			</div>
		);
	}
}

export default class ParentComponentImpl extends ParentComponent {
}

export function useCluster(): {
	getExplorerUrl: (path: string) => string;
} {
	return {
		getExplorerUrl: (path: string) => {
			if (!path) {
				throw new Error ( 'Path is required to generate the explorer URL' );
			}
			return `https://explorer.example.com/${path}`;
		}
	};
}

let exampleInstance: ExplorerLinkPropsImpl | null = null;

export class ExplorerLinkPropsImpl implements ExplorerLinkProps {
	className?: string;
	label: string;
	path?: string;
	rel?: string;
	target?: string;

	constructor(props?: Partial<ExplorerLinkProps>) {
		this.className = props?.className || '';
		this.label = props?.label || 'Default Label';
		this.path = props?.path;
		this.rel = props?.rel || 'noopener noreferrer';
		this.target = props?.target || '_blank';

		if (!exampleInstance) {
			exampleInstance = this;
		}
	}
}

export function ExplorerLink({
															 path,
															 label,
															 className,
															 target = '_blank',
															 rel = 'noopener noreferrer'
														 }: ExplorerLinkProps): JSX.Element {
	const clusterData = useCluster ();

	try {
		const explorerUrl = clusterData.getExplorerUrl ( path ?? '' );
		return (
			<a
				href={explorerUrl}
				className={className}
				target={target}
				rel={rel}
			>
				{label}
			</a>
		);
	} catch (error) {
		console.error ( 'Failed to generate explorer URL:', error );
		return <span>Error creating link</span>;
	}
}

export class ClusterUiSelect {
}
