// Configuration de l'application AFMI
// Modifiez ces valeurs selon vos besoins

const AFMI_CONFIG = {
    // Informations de contact
    contact: {
        phone: '+241 XX XX XX XX',          // Numéro gabonais
        whatsapp: '241XXXXXXXX',           // Numéro WhatsApp (format international sans +)
        email: 'contact@afmi-gabon.org',   // Email de contact
        address: 'Libreville, Gabon',       // Adresse physique
    },

    // Réseaux sociaux
    social: {
        facebook: 'https://facebook.com/AFMIPage',
        twitter: 'https://twitter.com/AFMIMali',
        instagram: 'https://instagram.com/afmi_mali',
        youtube: 'https://youtube.com/c/AFMIMali'
    },

    // Configuration des dons
    donations: {
        // Mobile Money
        orangeMoney: {
            shortCode: '#144*1*1#',
            number: '70 12 34 56'
        },
        moovMoney: {
            shortCode: '#155*1*1#', 
            number: '70 12 34 56'
        },
        
        // PayPal
        paypal: {
            email: 'donations@afmi-gabon.org',
            businessId: 'VOTRE_BUSINESS_ID'
        },
        
        // Coordonnées bancaires
        bank: {
            name: 'Nom de la banque',
            iban: 'ML00 XXXX XXXX XXXX XXXX XXXX XX',
            bic: 'XXXXXXXX',
            accountName: 'AFMI - Association des Femmes Maliennes'
        },

        // Montants suggérés (en euros)
        suggestedAmounts: [25, 50, 100, 200]
    },

    // Vidéos et médias
    media: {
        // IDs des vidéos Facebook (remplacez par vos vrais IDs)
        facebookVideos: {
            hero: 'https://www.facebook.com/AFMIPage/videos/1234567890/',
            testimonial1: 'https://www.facebook.com/AFMIPage/videos/1234567891/',
            testimonial2: 'https://www.facebook.com/AFMIPage/videos/1234567892/'
        },
        
        // IDs des vidéos YouTube
        youtubeVideos: {
            presentation: 'dQw4w9WgXcQ', // Remplacez par vos vrais IDs
            actions: 'dQw4w9WgXcQ'
        },

        // Facebook App ID pour l'intégration
        facebookAppId: 'VOTRE_FACEBOOK_APP_ID'
    },

    // Statistiques (si vous voulez ajouter des compteurs)
    stats: {
        famillesAidees: 150,
        enfantsSoutenus: 45,
        pelerinsAccompagnes: 8,
        projetsRealises: 25
    },

    // Messages personnalisables
    messages: {
        whatsappDefault: 'Bonjour, je souhaite en savoir plus sur les actions de l\'AFMI.',
        donationSuccess: 'Merci pour votre générosité ! Votre don fait la différence.',
        contactSuccess: 'Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.',
        
        // Messages d'erreur
        errors: {
            requiredFields: 'Veuillez remplir tous les champs obligatoires.',
            invalidEmail: 'Veuillez entrer une adresse email valide.',
            invalidPhone: 'Veuillez entrer un numéro de téléphone valide.'
        }
    },

    // Configuration des actions/services
    actions: [
        {
            id: 'colis-alimentaires',
            title: 'Distribution de colis alimentaires',
            description: 'Aide alimentaire régulière aux familles dans le besoin, particulièrement pendant le Ramadan et les périodes difficiles.',
            icon: 'fas fa-box',
            color: 'green',
            priority: 1,
            tag: 'Action prioritaire'
        },
        {
            id: 'bourses-etude',
            title: 'Octroi de bourses d\'étude',
            description: 'Soutien financier pour l\'éducation des enfants et jeunes, frais de scolarité, fournitures et uniformes.',
            icon: 'fas fa-graduation-cap',
            color: 'blue',
            priority: 2,
            tag: 'Éducation'
        },
        {
            id: 'aide-necessiteux',
            title: 'Aide aux plus nécessiteux',
            description: 'Assistance directe aux personnes en situation de précarité, aide d\'urgence et accompagnement social.',
            icon: 'fas fa-hand-holding-heart',
            color: 'purple',
            priority: 3,
            tag: 'Urgence'
        },
        {
            id: 'orphelinat',
            title: 'Soutien à l\'orphelinat',
            description: 'Prise en charge des enfants orphelins, hébergement, nourriture, éducation et suivi médical.',
            icon: 'fas fa-child',
            color: 'pink',
            priority: 4,
            tag: 'Enfance'
        },
        {
            id: 'consultations-medicales',
            title: 'Consultations médicales',
            description: 'Organisation de consultations médicales gratuites et prise en charge des frais de santé pour les plus démunis.',
            icon: 'fas fa-stethoscope',
            color: 'red',
            priority: 5,
            tag: 'Santé'
        },
        {
            id: 'forage',
            title: 'Projets de forage',
            description: 'Construction de puits et forages pour faciliter l\'accès à l\'eau potable dans les communautés rurales.',
            icon: 'fas fa-tint',
            color: 'cyan',
            priority: 6,
            tag: 'Infrastructure'
        },
        {
            id: 'pelerinage',
            title: 'Aide au pèlerinage',
            description: 'Accompagnement financier et logistique pour permettre aux femmes d\'accomplir le pèlerinage à la Mecque.',
            icon: 'fas fa-kaaba',
            color: 'emerald',
            priority: 7,
            tag: 'Spiritualité'
        },
        {
            id: 'assises-spirituelles',
            title: 'Assises spirituelles',
            description: 'Organisation de rencontres spirituelles, conférences religieuses et moments de partage communautaire.',
            icon: 'fas fa-mosque',
            color: 'indigo',
            priority: 8,
            tag: 'Spiritualité'
        },
        {
            id: 'formation',
            title: 'Formation et autonomisation',
            description: 'Programmes de formation professionnelle et d\'autonomisation économique des femmes maliennes.',
            icon: 'fas fa-users',
            color: 'orange',
            priority: 9,
            tag: 'Formation'
        }
    ],

    // Témoignages
    testimonials: [
        {
            name: 'Aminata D.',
            role: 'Bénéficiaire - Pèlerinage 2024',
            photo: 'https://via.placeholder.com/60x60/059669/FFFFFF?text=A',
            message: 'Grâce à l\'AFMI, j\'ai pu réaliser mon rêve d\'aller à la Mecque. Cette expérience a transformé ma vie spirituelle. Merci infiniment à toute l\'équipe.',
            action: 'pelerinage'
        },
        {
            name: 'Fatoumata S.',
            role: 'Mère de famille aidée',
            photo: 'https://via.placeholder.com/60x60/D97706/FFFFFF?text=F',
            message: 'Les colis alimentaires de l\'AFMI nous ont aidés pendant les moments difficiles. Mes enfants ont pu continuer à aller à l\'école grâce à votre soutien.',
            action: 'colis-alimentaires'
        },
        {
            name: 'Mariam K.',
            role: 'Étudiante boursière',
            photo: 'https://via.placeholder.com/60x60/1D4ED8/FFFFFF?text=M',
            message: 'La bourse d\'étude de l\'AFMI m\'a permis de poursuivre mes études universitaires. Aujourd\'hui, je travaille comme infirmière et j\'aide ma communauté.',
            action: 'bourses-etude'
        }
    ],

    // Configuration de l'interface
    ui: {
        // Couleurs du thème
        colors: {
            primary: '#059669',     // Vert AFMI
            secondary: '#D97706',   // Or/Orange
            accent: '#DC2626',      // Rouge
            info: '#1D4ED8'         // Bleu
        },
        
        // Animation
        animations: {
            scrollReveal: true,
            parallax: true,
            hoverEffects: true
        },

        // Responsive breakpoints (Tailwind CSS)
        breakpoints: {
            sm: '640px',
            md: '768px', 
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        }
    },

    // Configuration SEO
    seo: {
        title: 'AFMI - Association des Femmes Maliennes pour l\'Initiative',
        description: 'Association malienne dédiée à l\'entraide, la solidarité et la foi. Nous aidons les femmes et familles dans le besoin à travers diverses actions humanitaires depuis Libreville, Gabon.',
        keywords: 'AFMI, Mali, Gabon, Libreville, association, femmes maliennes, humanitaire, don, pèlerinage, éducation, santé',
        author: 'AFMI Mali',
        language: 'fr',
        region: 'GA', // Code pays Gabon
        
        // Open Graph (réseaux sociaux)
        openGraph: {
            siteName: 'AFMI Mali',
            image: 'https://votre-site.com/images/afmi-logo.jpg',
            imageAlt: 'Logo AFMI - Association des Femmes Maliennes pour l\'Initiative'
        }
    },

    // Configuration Analytics (à activer en production)
    analytics: {
        googleAnalytics: 'GA_MEASUREMENT_ID',
        facebookPixel: 'FACEBOOK_PIXEL_ID',
        hotjar: 'HOTJAR_ID'
    }
};

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AFMI_CONFIG;
}

// Fonction utilitaire pour mettre à jour la configuration
function updateConfig(newConfig) {
    Object.assign(AFMI_CONFIG, newConfig);
}

// Fonction pour obtenir une valeur de configuration
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], AFMI_CONFIG);
}

// Validation de la configuration
function validateConfig() {
    const required = [
        'contact.phone',
        'contact.email',
        'donations.paypal.email'
    ];
    
    const missing = required.filter(path => !getConfig(path) || getConfig(path).includes('XX'));
    
    if (missing.length > 0) {
        console.warn('⚠️ Configuration incomplète. Champs à remplir:', missing);
        return false;
    }
    
    console.log('✅ Configuration validée avec succès');
    return true;
}

// Auto-validation au chargement
document.addEventListener('DOMContentLoaded', function() {
    validateConfig();
});
