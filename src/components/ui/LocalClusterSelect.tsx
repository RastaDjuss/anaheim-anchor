// components/ui/LocalClusterUiSelect.tsx
import React, { useState, useEffect } from 'react';

/**
 * Composant avec un menu déroulant simple
 */
export function LocalClusterUiSelect(props: { exampleProp?: string }): React.JSX.Element {
	// Déclaration de l'état pour la valeur sélectionnée
	const [selectedValue, setSelectedValue] = useState<string>("");

	// Effet pour définir une valeur par défaut à partir des props (si applicable)
	useEffect(() => {
		if (typeof props.exampleProp === "string" && props.exampleProp.trim()) {
			setSelectedValue(props.exampleProp.trim());
		}
	}, [props.exampleProp]);

	// Retour du JSX
	return (
		<div>
			<label htmlFor="exampleSelect">Sélectionnez une valeur</label>
			<select
				id="exampleSelect"
				name="exampleSelect"
				value={selectedValue}
				onChange={(e) => setSelectedValue(e.target.value)}
			>
				{/* Option par défaut */}
				<option value="">Sélectionnez une option</option>
				{/* Option calculée depuis les props */}
				{typeof props.exampleProp === "string" && props.exampleProp.trim() && (
					<option key="exampleProp">{props.exampleProp.trim()}</option>
				)}
			</select>
		</div>
	);
}