# 🎨 Exemples de Personnalisation AFMI

## 📹 Exemples d'Intégration Vidéo Facebook

### Vidéo dans la section Hero
```html
<!-- Remplacez le placeholder par : -->
<div class="fb-video" 
     data-href="https://www.facebook.com/AFMIPage/videos/987654321/"
     data-width="500" 
     data-allowfullscreen="true"
     data-show-text="false">
</div>
```

### Vidéo de témoignage
```html
<div class="aspect-video bg-gray-200 rounded-lg overflow-hidden">
    <div class="fb-video" 
         data-href="https://www.facebook.com/AFMIPage/videos/123456789/"
         data-width="100%" 
         data-show-text="true">
    </div>
</div>
```

## 📱 Exemples de Configuration Mobile Money

### Configuration Orange Money
```javascript
// Dans config.js
orangeMoney: {
    shortCode: '#144*1*1#',
    number: '70 12 34 56',
    displayName: 'AFMI Orange Money'
}
```

### Bouton Orange Money personnalisé
```html
<button onclick="openOrangeMoney()" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg">
    <i class="fas fa-mobile-alt mr-2"></i>
    Donner via Orange Money
</button>

<script>
function openOrangeMoney() {
    const message = `Composez ${AFMI_CONFIG.donations.orangeMoney.shortCode} pour faire un don à l'AFMI`;
    alert(message);
    // Optionnel : ouvrir l'application de téléphone
    window.location.href = `tel:${AFMI_CONFIG.donations.orangeMoney.shortCode}`;
}
</script>
```

## 💳 Exemples d'Intégration PayPal

### Bouton PayPal Simple
```html
<!-- Ajoutez dans la section don -->
<div id="paypal-button-container" class="mt-4"></div>

<script>
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: document.getElementById('donation-amount').value || '25'
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Don effectué avec succès ! Merci ' + details.payer.name.given_name);
        });
    }
}).render('#paypal-button-container');
</script>
```

### Montants prédéfinis PayPal
```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <button onclick="setDonationAmount(25)" class="paypal-amount-btn" data-amount="25">25€</button>
    <button onclick="setDonationAmount(50)" class="paypal-amount-btn" data-amount="50">50€</button>
    <button onclick="setDonationAmount(100)" class="paypal-amount-btn" data-amount="100">100€</button>
    <button onclick="setDonationAmount('custom')" class="paypal-amount-btn">Autre</button>
</div>

<script>
let selectedAmount = 25;

function setDonationAmount(amount) {
    if (amount === 'custom') {
        const customAmount = prompt('Entrez le montant de votre don (en €):');
        if (customAmount && !isNaN(customAmount) && parseFloat(customAmount) > 0) {
            selectedAmount = parseFloat(customAmount);
        }
    } else {
        selectedAmount = amount;
    }
    
    // Mettre à jour l'affichage
    document.querySelectorAll('.paypal-amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}
</script>
```

## 📞 Exemples WhatsApp

### Bouton WhatsApp avec message personnalisé
```html
<a href="#" onclick="openWhatsApp('don')" class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg inline-flex items-center">
    <i class="fab fa-whatsapp mr-2"></i>
    Contacter pour un don
</a>

<script>
function openWhatsApp(type) {
    const messages = {
        don: 'Bonjour, je souhaite faire un don à l\'AFMI. Pouvez-vous me guider ?',
        info: 'Bonjour, j\'aimerais en savoir plus sur les actions de l\'AFMI.',
        benevolat: 'Bonjour, je souhaite devenir bénévole pour l\'AFMI.'
    };
    
    const message = encodeURIComponent(messages[type] || messages.info);
    const phone = AFMI_CONFIG.contact.whatsapp;
    const url = `https://wa.me/${phone}?text=${message}`;
    
    window.open(url, '_blank');
}
</script>
```

### Widget WhatsApp flottant
```html
<!-- Ajoutez avant </body> -->
<div class="fixed bottom-4 right-4 z-50">
    <button onclick="openWhatsApp('info')" class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse">
        <i class="fab fa-whatsapp text-2xl"></i>
    </button>
</div>
```

## 🖼️ Exemples de Galerie Avancée

### Galerie avec modal
```html
<!-- Galerie -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div class="gallery-item" onclick="openModal('images/colis-alimentaires-1.jpg', 'Distribution de colis alimentaires')">
        <img src="images/colis-alimentaires-1.jpg" alt="Colis alimentaires" class="w-full h-full object-cover">
    </div>
    <!-- Plus d'images... -->
</div>

<!-- Modal -->
<div id="imageModal" class="fixed inset-0 bg-black bg-opacity-75 hidden z-50 flex items-center justify-center">
    <div class="max-w-4xl max-h-full p-4">
        <img id="modalImage" src="" alt="" class="max-w-full max-h-full rounded-lg">
        <p id="modalCaption" class="text-white text-center mt-4"></p>
        <button onclick="closeModal()" class="absolute top-4 right-4 text-white text-3xl">&times;</button>
    </div>
</div>

<script>
function openModal(imageSrc, caption) {
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalCaption').textContent = caption;
    document.getElementById('imageModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('imageModal').classList.add('hidden');
}
</script>
```

## 📊 Exemples de Statistiques Animées

### Compteurs animés
```html
<div class="grid md:grid-cols-4 gap-8 text-center">
    <div>
        <div class="counter text-4xl font-bold text-green-600" data-target="150">0</div>
        <p class="text-gray-600">Familles aidées</p>
    </div>
    <div>
        <div class="counter text-4xl font-bold text-blue-600" data-target="45">0</div>
        <p class="text-gray-600">Enfants soutenus</p>
    </div>
    <div>
        <div class="counter text-4xl font-bold text-purple-600" data-target="8">0</div>
        <p class="text-gray-600">Pèlerins accompagnés</p>
    </div>
    <div>
        <div class="counter text-4xl font-bold text-orange-600" data-target="25">0</div>
        <p class="text-gray-600">Projets réalisés</p>
    </div>
</div>

<script>
// Animation des compteurs au scroll
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 40);
                
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', animateCounters);
</script>
```

## 📧 Exemples de Formulaire Avancé

### Formulaire avec validation en temps réel
```html
<form id="contactForm" class="space-y-6">
    <div>
        <label for="nom" class="form-label">Nom complet *</label>
        <input type="text" id="nom" name="nom" class="form-input" required>
        <div class="error-message hidden text-red-500 text-sm mt-1">Le nom est requis</div>
    </div>
    
    <div>
        <label for="email" class="form-label">Email *</label>
        <input type="email" id="email" name="email" class="form-input" required>
        <div class="error-message hidden text-red-500 text-sm mt-1">Email invalide</div>
    </div>
    
    <div>
        <label for="telephone" class="form-label">Téléphone</label>
        <input type="tel" id="telephone" name="telephone" class="form-input" placeholder="+223 XX XX XX XX">
        <div class="error-message hidden text-red-500 text-sm mt-1">Numéro invalide</div>
    </div>
    
    <div>
        <label for="message" class="form-label">Message *</label>
        <textarea id="message" name="message" rows="5" class="form-input" required></textarea>
        <div class="error-message hidden text-red-500 text-sm mt-1">Message trop court (minimum 10 caractères)</div>
    </div>
    
    <button type="submit" class="btn-afmi-primary w-full">
        <span class="btn-text">Envoyer le message</span>
        <span class="btn-loading hidden">Envoi en cours...</span>
    </button>
</form>

<script>
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validation
    let isValid = true;
    const formData = new FormData(this);
    
    // Validation nom
    const nom = formData.get('nom');
    if (!AFMI_Utils.Validator.isValidName(nom)) {
        showError('nom', 'Le nom est requis et ne doit contenir que des lettres');
        isValid = false;
    } else {
        hideError('nom');
    }
    
    // Validation email
    const email = formData.get('email');
    if (!AFMI_Utils.Validator.isValidEmail(email)) {
        showError('email', 'Veuillez entrer un email valide');
        isValid = false;
    } else {
        hideError('email');
    }
    
    // Validation téléphone (optionnel)
    const telephone = formData.get('telephone');
    if (telephone && !AFMI_Utils.Validator.isValidMalianPhone(telephone)) {
        showError('telephone', 'Numéro de téléphone malien invalide');
        isValid = false;
    } else {
        hideError('telephone');
    }
    
    // Validation message
    const message = formData.get('message');
    if (!AFMI_Utils.Validator.isValidMessage(message)) {
        showError('message', 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    } else {
        hideError('message');
    }
    
    if (!isValid) return;
    
    // Afficher loading
    const btn = this.querySelector('button[type="submit"]');
    btn.classList.add('btn-loading');
    btn.querySelector('.btn-text').classList.add('hidden');
    btn.querySelector('.btn-loading').classList.remove('hidden');
    
    try {
        // Simuler envoi (remplacez par votre logique)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Succès
        AFMI_Utils.Toast.success('Message envoyé avec succès !');
        this.reset();
        
        // Analytics
        AFMI_Utils.Analytics.contact('form');
        
    } catch (error) {
        AFMI_Utils.Toast.error('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
        // Masquer loading
        btn.classList.remove('btn-loading');
        btn.querySelector('.btn-text').classList.remove('hidden');
        btn.querySelector('.btn-loading').classList.add('hidden');
    }
});

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorDiv = field.parentNode.querySelector('.error-message');
    field.classList.add('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function hideError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorDiv = field.parentNode.querySelector('.error-message');
    field.classList.remove('error');
    errorDiv.classList.add('hidden');
}
</script>
```

## 🎨 Exemples de Thèmes Personnalisés

### Thème sombre (optionnel)
```css
/* Ajoutez dans styles.css */
.theme-dark {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
}

.theme-dark body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
}

.theme-dark .card-hover {
    background-color: var(--bg-secondary);
}

.theme-dark .form-input {
    background-color: var(--bg-secondary);
    border-color: #4a4a4a;
    color: var(--text-primary);
}
```

### Bouton de changement de thème
```html
<button onclick="toggleTheme()" class="fixed top-20 right-4 bg-gray-800 text-white p-3 rounded-full z-40">
    <i class="fas fa-moon" id="themeIcon"></i>
</button>

<script>
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    
    if (body.classList.contains('theme-dark')) {
        body.classList.remove('theme-dark');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('theme-dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// Charger le thème sauvegardé
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('theme-dark');
        document.getElementById('themeIcon').classList.remove('fa-moon');
        document.getElementById('themeIcon').classList.add('fa-sun');
    }
});
</script>
```

## 📈 Exemples d'Analytics Personnalisés

### Suivi des clics sur les boutons de don
```javascript
// Ajoutez aux boutons de don
document.querySelectorAll('[data-donation-method]').forEach(button => {
    button.addEventListener('click', function() {
        const method = this.getAttribute('data-donation-method');
        AFMI_Utils.Analytics.track('donation_click', {
            method: method,
            page: 'home'
        });
    });
});
```

### Suivi du temps passé sur la page
```javascript
let startTime = Date.now();

window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    AFMI_Utils.Analytics.track('time_on_page', {
        seconds: timeSpent,
        page: document.title
    });
});
```

## 🌍 Exemples de Localisation

### Support multilingue (Français/Bambara)
```javascript
const translations = {
    fr: {
        welcome: 'Bienvenue à l\'AFMI',
        donate: 'Faire un don',
        contact: 'Contact'
    },
    bm: {
        welcome: 'Bisimila AFMI la',
        donate: 'Dɛmɛ di',
        contact: 'Kumaɲɔgɔnya'
    }
};

function setLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    localStorage.setItem('language', lang);
}
```

---

## 🎯 Conseils d'Utilisation

### 1. Commencez Simple
- Utilisez d'abord les exemples de base
- Testez chaque fonctionnalité individuellement
- Ajoutez les fonctionnalités avancées progressivement

### 2. Testez Régulièrement
- Testez sur mobile après chaque modification
- Vérifiez que tous les liens fonctionnent
- Testez les formulaires avec de vraies données

### 3. Sauvegardez Souvent
- Faites des copies de sauvegarde avant les modifications importantes
- Utilisez Git pour suivre vos changements
- Testez en local avant de mettre en ligne

### 4. Optimisez les Performances
- Compressez les images avant de les uploader
- Minifiez le CSS et JavaScript en production
- Utilisez un CDN pour les ressources statiques

---

**🎨 Ces exemples vous donnent une base solide pour personnaliser votre site AFMI !**
