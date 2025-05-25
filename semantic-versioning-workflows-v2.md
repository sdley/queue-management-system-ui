# 📦 Semantic Versioning – Résumé des commandes

## ✅ 1. Workflow **manuel** (avec Git/GitHub uniquement)

### 🛠️ Étapes

| Étape                         | Commande ou action                                                                                                         | Explication                             |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| 1️⃣ Commit du code             | `git add .`<br>`git commit -m "feat: ajoute fonction X"`                                                                   | Enregistre tes modifications            |
| 2️⃣ Modifier la version        | Modifier `"version"` dans `package.json` **ou** utiliser `npm version`                                                     | Par exemple : `npm version patch`       |
| 3️⃣ Mettre à jour le changelog | Éditer `CHANGELOG.md` manuellement                                                                                         | Liste les ajouts, corrections, etc.     |
| 4️⃣ Commit du bump de version  | Auto-généré par `npm version` **ou** `git add package.json CHANGELOG.md`<br>`git commit -m "chore: bump version to 1.2.0"` | Valide la nouvelle version              |
| 5️⃣ Créer un tag Git           | Automatique avec `npm version` **ou** `git tag v1.2.0`                                                                     | Marque la version dans l’historique Git |
| 6️⃣ Pousser vers GitHub        | `git push origin main`<br>`git push origin v1.2.0`                                                                         | Synchronise avec GitHub                 |

### 🎯 Commandes utiles `npm version`

```bash
npm version patch      # 1.2.3 → 1.2.4
npm version minor      # 1.2.3 → 1.3.0
npm version major      # 1.2.3 → 2.0.0
npm version prerelease --preid=beta  # 1.3.0 → 1.3.1-beta.0
```

```bash
# Exemple :
npm version patch -m "chore(release): bump version to %s"
# Si version précédente = 1.2.3 → commit message : "chore(release): bump version to 1.2.4"
```

---

## ⚙️ 2. Workflow **automatisé** (avec `standard-version`, Git et CI/CD)

> ⚠️ Ce workflow génère automatiquement : version + changelog + commit + tag.

### 📦 Installation

```bash
npm install --save-dev standard-version
```

### 🔧 Configuration (dans `package.json`)

```json
"scripts": {
  "release": "standard-version"
}
```

### ⚙️ Étapes automatisées

| Étape                           | Commande                                   | Action                                                             |
| ------------------------------- | ------------------------------------------ | ------------------------------------------------------------------ |
| 1️⃣ Commit avec convention       | `git commit -m "feat: support de Node 21"` | Utilise Conventional Commits                                       |
| 2️⃣ Lancer le bump automatique   | `npm run release`                          | Met à jour `package.json`, `CHANGELOG.md`, crée un commit & un tag |
| 3️⃣ Pousser le tag et la branche | `git push origin main --follow-tags`       | Envoie la version sur GitHub                                       |
| 4️⃣ (Optionnel) Publier sur npm  | `npm publish`                              | Si publication souhaitée                                           |

---

## 🧠 Résumé rapide

```bash
# 🚀 Manuel
git commit -m "feat: ajout"
npm version minor
# Modifier CHANGELOG.md manuellement
git push origin main --follow-tags

# 🤖 Automatisé
git commit -m "feat: ajout"
npm run release
git push origin main --follow-tags
```

---
