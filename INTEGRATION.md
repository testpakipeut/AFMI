# Guide d'Intégration AFMI

## 🎯 Intégrations Prioritaires

### 1. 📹 Intégration Vidéos Facebook

#### Étape 1 : Obtenir l'App ID Facebook
1. Allez sur [Facebook for Developers](https://developers.facebook.com/)
2. Créez une nouvelle app ou utilisez une existante
3. Copiez votre App ID

#### Étape 2 : Configurer l'App ID
Dans `config.js`, remplacez :
```javascript
facebookAppId: 'VOTRE_FACEBOOK_APP_ID'
```

#### Étape 3 : Intégrer une vidéo
1. Trouvez l'URL de votre vidéo Facebook
2. Dans `index.html`, remplacez les placeholders par :
```html
<div class="fb-video" 
     data-href="https://www.facebook.com/AFMIPage/videos/VOTRE_VIDEO_ID/"
     data-width="500" 
     data-show-text="false">
</div>
```

### 2. 💳 Configuration Mobile Money

#### Orange Money
1. Dans `config.js`, mettez à jour :
```javascript
orangeMoney: {
    shortCode: '#144*1*1#',
    number: 'VOTRE_NUMERO_ORANGE'
}
```

#### Moov Money
```javascript
moovMoney: {
    shortCode: '#155*1*1#',
    number: 'VOTRE_NUMERO_MOOV'
}
```

### 3. 📞 Configuration WhatsApp

Dans `config.js`, remplacez :
```javascript
whatsapp: '223XXXXXXXX'  // Format : code pays + numéro sans le +
```

Exemple : `whatsapp: '22370123456'`

### 4. 💰 Configuration PayPal

#### Étape 1 : Créer un compte PayPal Business
1. Créez un compte sur [PayPal Business](https://www.paypal.com/business)
2. Obtenez votre email PayPal

#### Étape 2 : Configurer dans l'app
Dans `config.js` :
```javascript
paypal: {
    email: 'donations@afmi-mali.org',
    businessId: 'VOTRE_BUSINESS_ID'
}
```

#### Étape 3 : Intégrer les boutons PayPal (optionnel)
Ajoutez le SDK PayPal dans `index.html` :
```html
<script src="https://www.paypal.com/sdk/js?client-id=VOTRE_CLIENT_ID&currency=EUR"></script>
```

### 5. 🏦 Coordonnées Bancaires

Dans `config.js`, mettez à jour :
```javascript
bank: {
    name: 'Banque de l\'Habitat du Mali',
    iban: 'ML00 1234 5678 9012 3456 7890 12',
    bic: 'BHMAMIBA',
    accountName: 'AFMI - Association des Femmes Maliennes'
}
```

### 6. 📧 Configuration Email

#### Option 1 : Formulaire simple (recommandé)
Le formulaire actuel affiche juste un message de confirmation. Pour l'envoyer par email :

1. Créez un compte sur [Formspree](https://formspree.io/) (gratuit)
2. Dans `index.html`, modifiez le formulaire :
```html
<form action="https://formspree.io/f/VOTRE_FORM_ID" method="POST" class="space-y-6">
```

#### Option 2 : Backend PHP (avancé)
Créez un fichier `contact.php` :
```php
<?php
if ($_POST) {
    $to = "contact@afmi-mali.org";
    $subject = "Nouveau message depuis le site AFMI";
    $message = "Nom: " . $_POST['nom'] . "\n";
    $message .= "Email: " . $_POST['email'] . "\n";
    $message .= "Message: " . $_POST['message'];
    
    mail($to, $subject, $message);
    echo json_encode(['success' => true]);
}
?>
```

### 7. 📊 Configuration Analytics

#### Google Analytics 4
1. Créez un compte sur [Google Analytics](https://analytics.google.com/)
2. Obtenez votre Measurement ID
3. Dans `config.js` :
```javascript
analytics: {
    googleAnalytics: 'G-XXXXXXXXXX'
}
```

4. Ajoutez dans `index.html` (avant `</head>`) :
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 8. 🖼️ Ajout de Vraies Photos

#### Structure recommandée :
```
/images/
  /actions/
    - colis-alimentaires-1.jpg
    - bourses-etude-1.jpg
    - pelerinage-1.jpg
  /temoignages/
    - aminata.jpg
    - fatoumata.jpg
  /galerie/
    - event-1.jpg
    - event-2.jpg
  - logo-afmi.png
  - hero-background.jpg
```

#### Optimisation des images :
- Format : JPG pour les photos, PNG pour les logos
- Taille max : 1920x1080 pour les grandes images
- Poids max : 500KB par image
- Utilisez [TinyPNG](https://tinypng.com/) pour optimiser

### 9. 🌐 Hébergement et Déploiement

#### Option 1 : GitHub Pages (Gratuit)
1. Créez un compte GitHub
2. Créez un repository "afmi-website"
3. Uploadez tous vos fichiers
4. Activez GitHub Pages dans les settings
5. Votre site sera accessible à : `https://votre-username.github.io/afmi-website`

#### Option 2 : Netlify (Gratuit)
1. Créez un compte sur [Netlify](https://netlify.com)
2. Glissez-déposez votre dossier de fichiers
3. Votre site sera en ligne immédiatement

#### Option 3 : Hébergement payant
- **OVH** : ~3€/mois
- **Hostinger** : ~2€/mois
- **SiteGround** : ~5€/mois

### 10. 🔒 Configuration HTTPS

#### Avec Netlify/GitHub Pages
HTTPS est automatique et gratuit.

#### Avec hébergement payant
1. Obtenez un certificat SSL (souvent gratuit avec Let's Encrypt)
2. Activez HTTPS dans votre panneau d'administration
3. Redirigez HTTP vers HTTPS

### 11. 📱 Test sur Mobile

#### Outils de test :
1. **Chrome DevTools** : F12 > Toggle device toolbar
2. **BrowserStack** : Test sur vrais appareils
3. **Google Mobile-Friendly Test** : Test SEO mobile

#### Points à vérifier :
- [ ] Navigation mobile fonctionne
- [ ] Boutons assez grands (44px minimum)
- [ ] Texte lisible (16px minimum)
- [ ] Formulaires utilisables
- [ ] WhatsApp fonctionne

### 12. 🎨 Personnalisation des Couleurs

Dans `config.js`, modifiez :
```javascript
ui: {
    colors: {
        primary: '#059669',     // Vert principal
        secondary: '#D97706',   // Orange/Or
        accent: '#DC2626',      // Rouge
        info: '#1D4ED8'         // Bleu
    }
}
```

Ces couleurs sont utilisées partout dans l'application.

### 13. 🔍 Configuration SEO

#### Meta tags personnalisés
Dans `config.js` :
```javascript
seo: {
    title: 'AFMI - Votre titre personnalisé',
    description: 'Votre description personnalisée (max 160 caractères)',
    keywords: 'afmi, mali, association, femmes, humanitaire'
}
```

#### Sitemap XML
Créez un fichier `sitemap.xml` :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://votre-site.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 14. 📋 Checklist de Mise en Production

#### Configuration :
- [ ] App ID Facebook configuré
- [ ] Numéros Mobile Money ajoutés
- [ ] WhatsApp configuré
- [ ] Email PayPal ajouté
- [ ] Coordonnées bancaires mises à jour
- [ ] Vraies photos ajoutées
- [ ] Google Analytics configuré

#### Tests :
- [ ] Formulaire de contact testé
- [ ] Boutons WhatsApp testés
- [ ] Navigation mobile testée
- [ ] Toutes les pages testées
- [ ] Performance vérifiée (PageSpeed Insights)

#### SEO :
- [ ] Titre et description optimisés
- [ ] Images avec alt text
- [ ] Sitemap créé
- [ ] Google Search Console configuré

#### Sécurité :
- [ ] HTTPS activé
- [ ] Certificat SSL valide
- [ ] Formulaires protégés contre le spam

### 15. 🚀 Améliorations Futures

#### Phase 2 :
- Système de newsletter
- Blog/actualités
- Espace membres
- Paiements en ligne automatisés

#### Phase 3 :
- Application mobile
- Système de gestion des dons
- Tableau de bord administrateur
- API pour partenaires

---

## 🆘 Support Technique

### Problèmes Courants :

**Les vidéos Facebook ne s'affichent pas :**
- Vérifiez l'App ID Facebook
- Assurez-vous que les vidéos sont publiques
- Testez avec un autre navigateur

**Mobile Money ne fonctionne pas :**
- Vérifiez les codes USSD
- Testez sur un téléphone malien
- Contactez votre opérateur

**Le formulaire ne s'envoie pas :**
- Vérifiez la configuration Formspree
- Testez avec différents emails
- Regardez la console pour les erreurs

### Contacts :
- **Email technique** : [votre-email@exemple.com]
- **Documentation** : Consultez ce fichier
- **Mises à jour** : Vérifiez régulièrement les CDN

---

**✨ Bonne chance avec votre site AFMI ! ✨**
