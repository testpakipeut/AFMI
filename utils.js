// Fonctions utilitaires pour l'application AFMI

/**
 * Utilitaires de validation
 */
const Validator = {
    // Validation email
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validation téléphone malien
    isValidMalianPhone: (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        // Format malien: 8 chiffres ou avec indicatif +223
        return cleaned.length === 8 || (cleaned.length === 11 && cleaned.startsWith('223'));
    },

    // Validation nom (au moins 2 caractères, pas de chiffres)
    isValidName: (name) => {
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
        return nameRegex.test(name.trim());
    },

    // Validation message (au moins 10 caractères)
    isValidMessage: (message) => {
        return message.trim().length >= 10;
    }
};

/**
 * Utilitaires de formatage
 */
const Formatter = {
    // Formater numéro de téléphone malien
    formatMalianPhone: (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 8) {
            return `+223 ${cleaned.substring(0, 2)} ${cleaned.substring(2, 4)} ${cleaned.substring(4, 6)} ${cleaned.substring(6, 8)}`;
        } else if (cleaned.length === 11 && cleaned.startsWith('223')) {
            const number = cleaned.substring(3);
            return `+223 ${number.substring(0, 2)} ${number.substring(2, 4)} ${number.substring(4, 6)} ${number.substring(6, 8)}`;
        }
        return phone;
    },

    // Formater montant en euros
    formatEuro: (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    },

    // Formater montant en francs CFA
    formatCFA: (amount) => {
        return new Intl.NumberFormat('fr-ML', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0
        }).format(amount);
    },

    // Formater date en français
    formatDate: (date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    // Capitaliser première lettre
    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    // Tronquer texte
    truncate: (str, length = 100) => {
        if (str.length <= length) return str;
        return str.substring(0, length) + '...';
    }
};

/**
 * Utilitaires DOM
 */
const DOMUtils = {
    // Sélecteur sécurisé
    $(selector) {
        return document.querySelector(selector);
    },

    // Sélecteur multiple sécurisé
    $$(selector) {
        return document.querySelectorAll(selector);
    },

    // Créer élément avec attributs
    createElement: (tag, attributes = {}, content = '') => {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        if (content) {
            element.textContent = content;
        }
        return element;
    },

    // Ajouter classe avec animation
    addClass: (element, className, delay = 0) => {
        setTimeout(() => {
            element.classList.add(className);
        }, delay);
    },

    // Supprimer classe avec animation
    removeClass: (element, className, delay = 0) => {
        setTimeout(() => {
            element.classList.remove(className);
        }, delay);
    },

    // Toggle classe
    toggleClass: (element, className) => {
        element.classList.toggle(className);
    },

    // Vérifier si élément est visible
    isVisible: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Scroll fluide vers élément
    scrollTo: (element, offset = 0) => {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

/**
 * Utilitaires de stockage local
 */
const Storage = {
    // Sauvegarder données
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Erreur de sauvegarde:', error);
            return false;
        }
    },

    // Récupérer données
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Erreur de récupération:', error);
            return defaultValue;
        }
    },

    // Supprimer données
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Erreur de suppression:', error);
            return false;
        }
    },

    // Vider le stockage
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Erreur de vidage:', error);
            return false;
        }
    }
};

/**
 * Utilitaires de notification
 */
const Toast = {
    // Afficher notification
    show: (message, type = 'info', duration = 5000) => {
        const toast = DOMUtils.createElement('div', {
            class: `toast toast-${type}`,
            role: 'alert'
        });

        const icon = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        }[type] || 'ℹ️';

        toast.innerHTML = `
            <div class="flex items-center">
                <span class="text-2xl mr-3">${icon}</span>
                <div class="flex-1">
                    <p class="font-medium">${message}</p>
                </div>
                <button class="ml-4 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(toast);
        
        // Animation d'entrée
        setTimeout(() => toast.classList.add('show'), 100);

        // Suppression automatique
        if (duration > 0) {
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }

        return toast;
    },

    success: (message, duration) => Toast.show(message, 'success', duration),
    error: (message, duration) => Toast.show(message, 'error', duration),
    warning: (message, duration) => Toast.show(message, 'warning', duration),
    info: (message, duration) => Toast.show(message, 'info', duration)
};

/**
 * Utilitaires de performance
 */
const Performance = {
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Lazy loading images
    lazyLoadImages: () => {
        const images = DOMUtils.$$('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
};

/**
 * Utilitaires de géolocalisation (pour les projets futurs)
 */
const GeoUtils = {
    // Obtenir position actuelle
    getCurrentPosition: () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Géolocalisation non supportée'));
                return;
            }

            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 600000
            });
        });
    },

    // Calculer distance entre deux points
    calculateDistance: (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Rayon de la Terre en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
};

/**
 * Utilitaires de partage social
 */
const SocialShare = {
    // Partager sur Facebook
    facebook: (url, text) => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        window.open(shareUrl, 'facebook-share', 'width=580,height=296');
    },

    // Partager sur Twitter
    twitter: (url, text) => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        window.open(shareUrl, 'twitter-share', 'width=580,height=296');
    },

    // Partager sur WhatsApp
    whatsapp: (text, phone = null) => {
        const message = encodeURIComponent(text);
        const shareUrl = phone 
            ? `https://wa.me/${phone}?text=${message}`
            : `https://wa.me/?text=${message}`;
        window.open(shareUrl, 'whatsapp-share');
    },

    // Copier lien
    copyLink: (url) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                Toast.success('Lien copié dans le presse-papiers');
            });
        } else {
            // Fallback pour les navigateurs plus anciens
            const textArea = DOMUtils.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            Toast.success('Lien copié dans le presse-papiers');
        }
    }
};

/**
 * Utilitaires de conversion de devises (approximatif)
 */
const Currency = {
    // Taux de change approximatifs (à mettre à jour régulièrement)
    rates: {
        EUR_TO_CFA: 656, // 1 EUR ≈ 656 CFA
        USD_TO_CFA: 600, // 1 USD ≈ 600 CFA
        CFA_TO_EUR: 0.0015, // 1 CFA ≈ 0.0015 EUR
    },

    // Convertir EUR vers CFA
    eurToCfa: (amount) => Math.round(amount * Currency.rates.EUR_TO_CFA),

    // Convertir CFA vers EUR
    cfaToEur: (amount) => Math.round(amount * Currency.rates.CFA_TO_EUR * 100) / 100,

    // Obtenir taux de change en temps réel (nécessite une API)
    fetchRates: async () => {
        try {
            // Exemple avec une API gratuite (remplacez par votre API préférée)
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
            const data = await response.json();
            if (data.rates && data.rates.XOF) {
                Currency.rates.EUR_TO_CFA = data.rates.XOF;
                Currency.rates.CFA_TO_EUR = 1 / data.rates.XOF;
            }
            return data.rates;
        } catch (error) {
            console.error('Erreur lors de la récupération des taux:', error);
            return null;
        }
    }
};

/**
 * Utilitaires d'analytics (pour le suivi)
 */
const Analytics = {
    // Suivre événement
    track: (eventName, properties = {}) => {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, properties);
        }

        // Console pour debug
        console.log('Analytics:', eventName, properties);
    },

    // Suivre page vue
    pageView: (pageName) => {
        Analytics.track('page_view', { page_title: pageName });
    },

    // Suivre clic sur bouton
    buttonClick: (buttonName) => {
        Analytics.track('button_click', { button_name: buttonName });
    },

    // Suivre don
    donation: (amount, method) => {
        Analytics.track('donation', { 
            amount: amount, 
            method: method,
            currency: 'EUR'
        });
    },

    // Suivre contact
    contact: (method) => {
        Analytics.track('contact', { method: method });
    }
};

// Export des utilitaires pour utilisation globale
window.AFMI_Utils = {
    Validator,
    Formatter,
    DOMUtils,
    Storage,
    Toast,
    Performance,
    GeoUtils,
    SocialShare,
    Currency,
    Analytics
};

console.log('🛠️ Utilitaires AFMI chargés avec succès!');
