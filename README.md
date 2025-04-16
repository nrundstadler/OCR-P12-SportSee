# Projet 12 : SportSee - Dashboard Analytics

12ème projet de la formation "Développeur d'application JavaScript React" d'OpenClassrooms.

## Description

SportSee est une application de dashboard analytics permettant aux utilisateurs de visualiser leurs données sportives. L'application communique avec une API pour récupérer les données des utilisateurs et les affiche notamment sous forme de différents graphiques grâce à la librairie Recharts.

## Prérequis

- [Node.js](https://nodejs.org/en/)
- [Backend API SportSee](https://github.com/OpenClassrooms-Student-Center/SportSee)

## Installation

1. **Cloner le projet**

```bash
git clone https://github.com/nrundstadler/OCR-P12-SportSee
cd projet-12/frontend
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer l'application**

```bash
npm run dev
```

L’application sera accessible à l’adresse http://localhost:5173/ (ou autre port indiqué par Vite).

## Fonctionnalités

- Visualisation de l'activité quotidienne (poids, calories)
- Durée moyenne des sessions par jour
- Performance
- Score d'accomplissement des objectifs
- Métriques clés (calories, protéines, glucides, lipides)

## Architecture

- `/src/components` : Composants React réutilisables
- `/src/services` : Services pour l'API et le formatage des données
- `/src/hooks` : Custom hooks React
- `/src/pages` : Pages de l'application
- `/src/data` : Données mockées pour le développement

## Technologies utilisées

- React 19 : Bibliothèque JavaScript pour créer l'interface utilisateur
- React Router : Navigation entre les différentes pages
- Recharts : Bibliothèque de graphiques basée sur React et D3.js pour la visualisation des données
- TailwindCSS : Framework CSS utilitaire pour le style
- Vite : Build tool rapide pour le développement

## Mode de données

L'application propose deux modes de données :

- Données mockées : `/profile-mocked/:userId`
- Données API : `/profile/:userId` (nécessite le lancement du [Backend](https://github.com/OpenClassrooms-Student-Center/SportSee))

## Utilisateurs disponibles

- ID: 12 (Karl Dovineau)
- ID: 18 (Cecilia Ratorez)

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run lint` : Vérifie le code avec ESLint
- `npm run preview` : Prévisualise la version de production
