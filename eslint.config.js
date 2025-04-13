/* eslint.config.js */
import { configs as nextConfigs } from '@next/eslint-plugin-next';

const pkg = require('@next/eslint-plugin-next');
const { configs: nextConfigs } = pkg;port default [
  ...nextConfigs.recommended, // Règles Next.js recommandées
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      react: require('eslint-plugin-react'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      // Ajoutez vos règles personnalisées ici
      'react/react-in-jsx-scope': 'off', // React 17+ n'en a pas besoin
      '@typescript-eslint/no-unused-vars': 'warn', // Avertissement pour les variables inutilisées
    },
  },
];