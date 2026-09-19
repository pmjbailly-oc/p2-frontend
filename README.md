# EtudiantFrontend

Frontend Angular 19 de l'application de gestion des étudiants de la bibliothèque.

## Pré-requis

- Node.js et npm
- Le backend doit tourner sur `http://localhost:8080` (voir README du back-end)

## Development server

Pour démarrer le serveur de développement :

```bash
ng serve
```

Ouvrir ensuite `http://localhost:4200/`. Les appels à `/api/**` sont proxifiés vers le backend sur le port 8080 via `proxy.conf.json`.

## Authentification

- L'utilisateur non connecté est redirigé vers la route `/login` s'il tente d'accéder aux pages protégées (`AuthGuard`).
- Une fois connecté, les routes `/login` et `/register` ne sont plus accessibles : l'utilisateur est redirigé vers `/students`.
- Le token JWT est stocké dans le `localStorage` sous la clé `token` et envoyé automatiquement par l'intercepteur HTTP.
- L'état de connexion est exposé par `UserService.isLoggedIn$`.

## Building

```bash
ng build
```

Les artefacts sont générés dans le dossier `dist/`.

## Running unit tests

Les tests unitaires utilisent [Jest](https://jestjs.io/) (pas la commande `ng test`, qui n'est pas configurée) :

```bash
npm test
```

Pour lancer les tests en mode watch :

```bash
npm run test:watch
```

## Running end-to-end tests

Les tests E2E utilisent [Cypress](https://www.cypress.io/). Il faut d'abord que le serveur de développement tourne, car Cypress attend `http://localhost:4200` comme baseUrl :

```bash
# Terminal 1
ng serve

# Terminal 2 (une fois ng serve démarré)
npx cypress run --headless    # exécution headless
npx cypress open              # mode interactif
```

Les scénarios couverts : login, protection des routes, liste des étudiants, formulaire étudiant.

## Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
