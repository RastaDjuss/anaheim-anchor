# Anaheim dApp - R=3.57 Putsch Token

Bienvenue dans le dépôt officiel de la dApp **Anaheim** !

Ce projet est une application ouverte et décentralisée construite pour fonctionner sur la blockchain **Solana**, intégrant le token **R=3.57** (Chaotic Fractal AttraKThor Putsch Token). Il vise à révolutionner l'écosystème DeFi et DAO avec des solutions rapides, scalables, et régies par la communauté.

![R=3.57 Token](https://raw.githubusercontent.com/RastaDjuss/anarcoin-2.0/bc0cab788f42d164215c6fcbd78b24ae1cb47f26/anarcoin-dextools-banner.gif)

---

## Caractéristiques principales

- **Blockchain Solana :** Transactions rapides et peu coûteuses, idéales pour les systèmes DeFi.
- **Gouvernance DAO :** Régie par une communauté grâce à des votes basés sur les tokens.
- **Staking et récompenses :** Motiver une détention longue durée en redistribuant les frais de transaction.
- **Interopérabilité :** Plans d'intégration multi-chaînes pour l'avenir, combinant DeFi, NFTs, DAO et bien plus.

---

## Tech Stack

Cet écosystème repose sur :

### Frontend :
- **Next.js** : Framework de production React avec rendu côté serveur.
- **TypeScript** : Développement robuste et typé pour une meilleure maintenabilité.

### Backend & Blockchain :
- **Solana** : Une blockchain rapide et incroyablement efficace.
- **Anchor Framework** : Développement de smart contracts pour SPL Tokens et DAO sur Solana.

---

## Installation et Configuration

1. **Clonez le dépôt :**
   ```bash
   git clone <repo-url>
   cd anaheim
   ```

2. **Installez les dépendances avec pnpm :**
   ```bash
   pnpm install
   ```

3. **Créez un fichier `.env` :**
   Configurez vos variables d'environnement pour Solana :
   ```env
   SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"
   SOLANA_PRIVATE_KEY="<votre_clé_privée_en_base58>"
   ```

4. **Démarrez le projet :**
   ```bash
   pnpm dev
   ```

---

## Scripts Utiles

- **Démarrage local :** `pnpm dev`
- **Build production :** `pnpm build`
- **Tests locaux Anchor :** `pnpm anchor-test`

---

## Documentation complémentaire

- **Whitepaper du Token :** [R=3.57 Whitepaper](./whitepaper.md)
- **Contribution à la DAO :** [Discord officiel](https://discord.gg/Dt7zvuFPGf)
- **Référence complète :** [Structure Projet](cleaned-tree.json)

© 2023 **Anaheim - R=3.57**