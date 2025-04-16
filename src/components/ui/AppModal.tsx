import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function AppModal(props: {
	title: string,
	show: boolean,
	hide: () => void,
	submit: () => void,
	submitLabel: string,
	children: ReactNode,
	submitOptions?: { action: () => void; label: string }
}) {
	return null;
}

function ModalExample() {
	const [showModal, setShowModal] = useState(false); // Variable d'état
	let submitLabel = 'Save Changes'; // Pas besoin de réaffecter
	let props: {
		submitOptions?: { action?: () => void; label?: string; disabled?: boolean };
		hide: () => void;
	} = {
		submitOptions: { action: undefined, label: '', disabled: false }, // Valeurs par défaut robustes
		hide: () => setShowModal(false), // Exemple d'intégration d'une logique utile
	};

	return showModal ? (
		<div>
			<dialog className="modal">
				<div className="modal-box space-y-5">
					<h3 className="font-bold text-lg">{submitLabel}</h3>
					<div> {/* Suppression de l'appel inutile à AppModal */}
						{/* Si nécessaire, on pourrait afficher un contenu conditionnel ici */}
					</div>
					<div className="modal-action">
						<div className="join space-x-2">
							{props.submitOptions?.action ? (
								<button
									className="btn btn-xs lg:btn-md btn-primary"
									onClick={props.submitOptions.action}
									disabled={props.submitOptions.disabled}
								>
									{props.submitOptions.label || 'Save'}
								</button>
							) : (
								/* Bouton désactivé par défaut */
								<button className="btn btn-xs lg:btn-md btn-primary" disabled>
									Action non disponible
								</button>
							)}
							{/* Bouton Close */}
							<button onClick={props.hide} className="btn">
								Close
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</div>
	) : null;
}