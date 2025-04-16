// hooks/useCluster.ts
export let useCluster: () => { getExplorerUrl: (path: string) => string };
useCluster = () => {
	const getExplorerUrl = (path: string): string => {
		if (!path) {
			console.warn ( 'Path is required to generate the explorer URL' );
			return '#'; // Retourne une URL vide ou par défaut.
		}
		return `https://explorer.example.com/${path}`;
	};

	return { getExplorerUrl };
};