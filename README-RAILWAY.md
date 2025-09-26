# AFMI - Déploiement Railway

## 🚀 Déploiement simple sur Railway

### 1. Préparation
- ✅ Code prêt dans ce repository
- ✅ Base de données PostgreSQL configurée
- ✅ Serveur Node.js simple

### 2. Déploiement Railway
1. Allez sur [railway.app](https://railway.app)
2. Connectez votre compte GitHub
3. Sélectionnez ce repository AFMI
4. Railway détectera automatiquement le `package.json`
5. Les tables PostgreSQL seront créées automatiquement

### 3. Configuration automatique
- ✅ **Port** : Géré automatiquement par Railway
- ✅ **Base de données** : PostgreSQL déjà configurée
- ✅ **Tables** : Créées au premier démarrage
- ✅ **API** : Disponible sur l'URL Railway

### 4. URL après déploiement
- **Site complet** : `https://votre-app.railway.app` (frontend + API)
- **API** : `https://votre-app.railway.app/api/messages`
- **Health check** : `https://votre-app.railway.app/api/health`

### 5. Test
1. Ouvrez l'URL Railway (ex: `https://votre-app.railway.app`)
2. Allez à la section Contact
3. Envoyez un message de test
4. Vérifiez les logs Railway pour confirmer l'envoi

## 📊 Fonctionnalités
- ✅ Messages stockés en PostgreSQL
- ✅ Confirmation d'envoi (desktop + mobile)
- ✅ Interface responsive
- ✅ API REST simple

## 🔧 Structure
```
├── server.js          # Serveur Node.js
├── package.json       # Dépendances
├── index.html         # Frontend
├── styles.css         # Styles
└── railway.json       # Config Railway
```

## 📱 Mobile
- ✅ Messages de confirmation visibles
- ✅ Position fixe sur mobile
- ✅ Auto-masquage après 5 secondes

---

**C'est tout !** Railway s'occupe du reste automatiquement.
