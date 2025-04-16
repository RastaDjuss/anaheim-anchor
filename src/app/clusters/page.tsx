const clusters = [
	{ name: 'Devnet', value: 'devnet' },
	{ name: 'Testnet', value: 'testnet' },
	{ name: 'Mainnet Beta', value: 'mainnet-beta' } // Ajout de mainnet-beta
];

// Rendu du sélecteur de clusters
<select>
	<option value="" disabled selected>
		Select a cluster
	</option>
	{clusters.map ( (cluster) => (
		<option key={cluster.value} value={cluster.value}>
			{cluster.name}
		</option>
	) )}
</select>;