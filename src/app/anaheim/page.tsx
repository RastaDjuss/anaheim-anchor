import React from 'react';
import { value } from '@trezor/utxo-lib/lib/payments/lazy';

type AnaheimFeatureProps = {
  someProp: string;
};

function AnaheimFeature({ someProp }: AnaheimFeatureProps) {
  return <div>{someProp}</div>;
}

function Page() {
  if (!value) {
    console.error('Value is undefined or null.');
    return null; // Vous pouvez afficher un message d'erreur ou une alternative ici
  }

  return <AnaheimFeature someProp={String(value)} />;
}