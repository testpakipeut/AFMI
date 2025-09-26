# AFMI - Association des Femmes Maliennes pour l'Initiative

Site web complet avec système de gestion des messages PostgreSQL.

## 🚀 Installation et Configuration

### Prérequis
- Node.js 14+ 
- PostgreSQL (ou accès à une base PostgreSQL)
- npm ou yarn

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration de la base de données
La chaîne de connexion PostgreSQL est déjà configurée dans `database/config.js` :
```
postgresql://postgres:BliobFePjYilkHPJwWwUNAoERJznYWPN@shortline.proxy.rlwy.net:22154/railway
```

### 3. Initialisation de la base de données
```bash
# Créer les tables et fonctions
npm run db:init

# Ou manuellement avec psql
psql "postgresql://postgres:BliobFePjYilkHPJwWwUNAoERJznYWPN@shortline.proxy.rlwy.net:22154/railway" -f database/schema.sql
```

### 4. Démarrage du serveur
```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start

# Frontend seulement
npm run frontend
```

## 📊 Structure de la Base de Données

### Tables créées :
- **`users`** : Utilisateurs et administrateurs
- **`messages`** : Messages reçus via le formulaire de contact
- **`message_replies`** : Réponses aux messages
- **`stats`** : Statistiques quotidiennes

### Fonctionnalités automatiques :
- ✅ Triggers pour `updated_at`
- ✅ Statistiques automatiques
- ✅ Index pour les performances
- ✅ Vue des statistiques

## 🔧 API Endpoints

### Messages
- `POST /api/messages` - Envoyer un message
- `GET /api/messages` - Récupérer les messages (admin)
- `PATCH /api/messages/:id/read` - Marquer comme lu

### Système
- `GET /api/health` - Statut de l'API et base de données
- `GET /api/stats` - Statistiques des messages

## 📱 Fonctionnalités Frontend

### Formulaire de Contact Amélioré
- ✅ Validation côté client
- ✅ Messages de statut (succès/erreur)
- ✅ Indicateur de chargement
- ✅ Sujets prédéfinis
- ✅ Envoi asynchrone vers l'API

### Responsive Design
- ✅ Menu hamburger mobile
- ✅ PDF optimisé pour mobile
- ✅ Interface adaptative

## 🛡️ Sécurité

- **Rate Limiting** : 5 messages par IP toutes les 15 minutes
- **Validation** : Côté client et serveur
- **CORS** : Configuré pour le frontend
- **Helmet** : Headers de sécurité
- **SSL** : Support pour Railway

## 📈 Monitoring

### Logs automatiques :
- Connexions à la base de données
- Messages reçus
- Erreurs système
- Statistiques

### Console du navigateur :
- Statut de l'API
- Messages envoyés
- Erreurs de connexion

## 🔄 Workflow de Déploiement

### 1. Développement local
```bash
npm run dev  # Backend sur port 3000
npm run frontend  # Frontend sur port 8000
```

### 2. Test de l'API
```bash
curl http://localhost:3000/api/health
```

### 3. Test du formulaire
- Ouvrir `http://localhost:8000`
- Aller à la section Contact
- Remplir et envoyer un message
- Vérifier les logs du serveur

## 📋 Scripts Disponibles

```bash
npm start          # Démarrage production
npm run dev        # Démarrage développement
npm run frontend   # Frontend seulement
npm run db:init    # Initialisation BDD
npm run db:migrate # Migration BDD
```

## 🐛 Dépannage

### Problème de connexion BDD
```bash
# Tester la connexion
psql "postgresql://postgres:BliobFePjYilkHPJwWwUNAoERJznYWPN@shortline.proxy.rlwy.net:22154/railway" -c "SELECT NOW();"
```

### Problème CORS
- Vérifier `FRONTEND_URL` dans les variables d'environnement
- Ajuster la configuration CORS dans `server.js`

### Problème de rate limiting
- Augmenter les limites dans `server.js`
- Ou attendre 15 minutes

## 📞 Support

Pour toute question technique :
- Email : contact@afmi-gabon.org
- Logs : Vérifier la console du serveur
- Base de données : Vérifier les logs PostgreSQL

---

**AFMI** - Association des Femmes Maliennes pour l'Initiative  
📍 Libreville, Gabon  
🌐 https://afmi-gabon.org
