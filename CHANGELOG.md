# Changelog [template]

Toutes les modifications notables de ce projet seront documentées ici.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)
et respecte la version [Semantic Versioning](https://semver.org/lang/fr/).

---

## [1.2.0] - 2025-05-25

### Ajouté

- Fonction `getData()` pour transformer les dates
- Support de Node.js 18

### Modifié

- Refactorisation du module `date-utils.js` pour simplifier le code

---

## [1.1.1] - 2025-05-15

### Corrigé

- Bug dans le calcul du timestamp UTC

---

## [1.1.0] - 2025-05-10

### Ajouté

- Fonction `formatDateFr()` pour le format `JJ/MM/AAAA`

---

## 📌 Modèle de messages de commit – Conventional Commits

Ce projet utilise la convention [Conventional Commits](https://www.conventionalcommits.org/fr/v1.0.0/).  
Chaque message de commit doit suivre le format :

### 🎯 Types de commit autorisés

| Type       | Utilisation prévue                                                  | Exemple                                                  |
| ---------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| `feat`     | Ajout d'une nouvelle fonctionnalité                                 | `feat: ajoute la fonction getData()`                     |
| `fix`      | Correction de bug                                                   | `fix: corrige une erreur dans formatDate()`              |
| `docs`     | Mise à jour de la documentation                                     | `docs: ajoute des exemples d’utilisation dans le README` |
| `style`    | Changement de formatage/code non fonctionnel (indentation, espaces) | `style: reformate le fichier utils.js`                   |
| `refactor` | Refactorisation du code sans modification de comportement           | `refactor: simplifie le traitement des dates`            |
| `test`     | Ajout/modification de tests unitaires ou d’intégration              | `test: ajoute un test pour isWeekend()`                  |
| `chore`    | Tâches d'entretien sans impact fonctionnel direct                   | `chore: met à jour les dépendances npm`                  |
| `perf`     | Amélioration de performance                                         | `perf: optimise le tri des résultats`                    |
| `ci`       | Changement lié à l’intégration continue / déploiement               | `ci: ajoute un workflow GitHub Actions`                  |
| `build`    | Changement du système de build ou des dépendances                   | `build: change le script de build vers vite`             |

### ✅ Bonnes pratiques

- Utiliser l’impératif : `ajoute` (et non `ajouté`)
- Être court et descriptif (~70 caractères max)
- Ajouter une section `BREAKING CHANGE:` si le commit casse une API existante

---

### 🚨 Exemple avec rupture de compatibilité

```txt
feat: remplace la méthode formatDate() par toLocaleDateString()

BREAKING CHANGE: La méthode formatDate() a été supprimée et remplacée
par toLocaleDateString() pour une meilleure compatibilité navigateur.

```
