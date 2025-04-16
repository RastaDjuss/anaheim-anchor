// components/ClusterUiSelect.tsx
import React from 'react';

export let ClusterSelector: () => React.JSX.Element;
ClusterSelector = () => (
	<select className="select select-bordered">
		<option value="mainnet">Mainnet</option>
		<option value="devnet">Devnet</option>
		<option value="local">Local Cluster</option>
	</select>
);

