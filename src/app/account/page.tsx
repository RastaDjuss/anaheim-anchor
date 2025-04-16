'use client';

import AccountListFeature from '../../components/account/account-list-feature'
import React from 'react';

function Outlet() {
  return null;
}

export function AccountLayout() {
  return (
    <div>
      <header>
        {/* Barre de navigation avec liens */}
        <nav>
          <a href="/account">Account</a>
          <a href="/account/pro">Pro</a>
        </nav>
      </header>
      <main>
        <Outlet /> {/* Contient la sous-page */}
      </main>
    </div>
  );
}

export default function Page() {
  return <AccountListFeature />
}
