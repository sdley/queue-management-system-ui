# 🚀 Démo Semantic Versioning – Étapes pratiques

Ce fichier montre une démo de création manuelle de versions SemVer : `alpha`, `beta`, `rc` et `stable`.

---

## 🔨 Étape 1 – Version alpha

```bash
npm version prerelease --preid=alpha -m "chore(release): alpha version %s"
# Résultat attendu : "version": "1.0.0-alpha.0"
git push origin main --follow-tags
```

Utilisation : version expérimentale, en phase initiale de développement.

---

## 🧪 Étape 2 – Version beta

```bash
npm version prerelease --preid=beta -m "chore(release): beta version %s"
# Résultat attendu : "version": "1.0.0-beta.0"
git push origin main --follow-tags
```

Utilisation : version fonctionnelle mais encore sujette à tests.

---

## ✅ Étape 3 – Release Candidate (RC)

```bash
npm version prerelease --preid=rc -m "chore(release): rc version %s"
# Résultat attendu : "version": "1.0.0-rc.0"
git push origin main --follow-tags
```

Utilisation : version prête à être validée avant publication stable.

---

## 🏁 Étape 4 – Version stable finale

```bash
npm version 1.0.0 -m "chore(release): stable release %s"
# Résultat attendu : "version": "1.0.0"
git push origin main --follow-tags
```

Utilisation : première version stable et prête pour production.

---

## 📌 Rappel : commandes associées

```bash
git tag                 # Lister les versions
git show <tag>          # Voir les détails d'une version
npm version patch/minor/major -m "..."  # Autres increments
```

---

🎯 **But de la démo :** Montrer l'évolution d'un package depuis une phase expérimentale jusqu'à sa première version stable en respectant les conventions de Semantic Versioning.