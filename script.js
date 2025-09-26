// Script JavaScript pour l'application AFMI

// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animation de l'icône hamburger
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // Fermer le menu mobile quand on clique sur un lien
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    if (mobileLinks) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});

// Smooth scrolling pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation d'apparition des éléments au scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.card-hover, .bg-white, .bg-gray-50');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialiser les animations au chargement
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = new FormData(this);
            const nom = formData.get('nom');
            const email = formData.get('email');
            const telephone = formData.get('telephone');
            const message = formData.get('message');
            
            // Validation simple
            if (!nom || !email || !message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Simulation d'envoi (à remplacer par votre logique d'envoi)
            alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
            this.reset();
        });
    }
});

// Gestion des boutons de don
document.addEventListener('DOMContentLoaded', function() {
    const donButtons = document.querySelectorAll('#don button');
    
    donButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Mobile Money')) {
                alert('Redirection vers Mobile Money...\nOrange Money: #144*1*1#\nMoov Money: #155*1*1#');
            } else if (buttonText.includes('bancaires')) {
                alert('Coordonnées bancaires:\nBanque: [Nom de la banque]\nIBAN: [Numéro IBAN]\nBIC: [Code BIC]');
            } else if (buttonText.includes('PayPal')) {
                alert('Redirection vers PayPal...\nEmail PayPal: donations@afmi-mali.org');
            } else if (buttonText.includes('€')) {
                const montant = buttonText.replace('€', '');
                alert(`Vous avez sélectionné un don de ${montant}€. Choisissez votre méthode de paiement ci-dessus.`);
            } else if (buttonText === 'Autre') {
                const montantPersonnalise = prompt('Entrez le montant de votre don (en €):');
                if (montantPersonnalise && !isNaN(montantPersonnalise) && parseFloat(montantPersonnalise) > 0) {
                    alert(`Merci pour votre don de ${montantPersonnalise}€. Choisissez votre méthode de paiement ci-dessus.`);
                }
            }
        });
    });
});

// Gestion de la galerie (modal simple)
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('#galerie .aspect-square');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Ici vous pouvez ajouter une modal pour afficher l'image en grand
            const icon = this.querySelector('i');
            const iconClass = icon.className;
            
            let description = '';
            if (iconClass.includes('fa-kaaba')) description = 'Photos du pèlerinage à la Mecque';
            else if (iconClass.includes('fa-box')) description = 'Distribution de colis alimentaires';
            else if (iconClass.includes('fa-graduation-cap')) description = 'Remise de bourses d\'étude';
            else if (iconClass.includes('fa-child')) description = 'Activités à l\'orphelinat';
            else if (iconClass.includes('fa-stethoscope')) description = 'Consultations médicales gratuites';
            else if (iconClass.includes('fa-tint')) description = 'Projets de forage et accès à l\'eau';
            else if (iconClass.includes('fa-users')) description = 'Sessions de formation';
            else if (iconClass.includes('fa-mosque')) description = 'Assises spirituelles';
            
            alert(`Galerie: ${description}\n\nLes photos seront bientôt disponibles dans cette section.`);
        });
    });
});

// Effet de parallaxe simple pour la section hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-gradient');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Compteur animé pour les statistiques (si vous voulez ajouter des stats)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 20);
    });
}

// Gestion des liens WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const message = encodeURIComponent('Bonjour, je souhaite en savoir plus sur les actions de l\'AFMI.');
            const phone = this.href.split('wa.me/')[1] || '223XXXXXXXX';
            this.href = `https://wa.me/${phone}?text=${message}`;
        });
    });
});

// Fonction pour intégrer les vidéos Facebook
function loadFacebookVideos() {
    // Cette fonction sera appelée quand vous aurez les vrais liens vidéo Facebook
    const fbVideoDivs = document.querySelectorAll('.fb-video');
    
    if (fbVideoDivs.length > 0) {
        // Charger le SDK Facebook si pas déjà fait
        if (!window.FB) {
            const script = document.createElement('script');
            script.src = 'https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v18.0';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            
            window.fbAsyncInit = function() {
                FB.init({
                    appId: 'YOUR_FACEBOOK_APP_ID', // À remplacer par votre App ID
                    xfbml: true,
                    version: 'v18.0'
                });
            };
        }
    }
}

// Gestion responsive des vidéos
function makeVideosResponsive() {
    const videos = document.querySelectorAll('iframe, video');
    
    videos.forEach(video => {
        const wrapper = document.createElement('div');
        wrapper.className = 'video-responsive';
        wrapper.style.position = 'relative';
        wrapper.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
        wrapper.style.height = '0';
        wrapper.style.overflow = 'hidden';
        
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        
        video.parentNode.insertBefore(wrapper, video);
        wrapper.appendChild(video);
    });
}

// Initialiser les fonctions au chargement
document.addEventListener('DOMContentLoaded', function() {
    makeVideosResponsive();
    loadFacebookVideos();
});

// Fonction utilitaire pour formater les numéros de téléphone maliens
function formatMalianPhone(phone) {
    // Supprime tous les caractères non numériques
    const cleaned = phone.replace(/\D/g, '');
    
    // Formate selon le standard malien
    if (cleaned.length === 8) {
        return `+223 ${cleaned.substring(0, 2)} ${cleaned.substring(2, 4)} ${cleaned.substring(4, 6)} ${cleaned.substring(6, 8)}`;
    }
    return phone;
}

// Validation du formulaire avec feedback visuel
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('border-red-500');
                this.classList.remove('border-gray-300');
            } else {
                this.classList.remove('border-red-500');
                this.classList.add('border-gray-300');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('border-red-500') && this.value.trim()) {
                this.classList.remove('border-red-500');
                this.classList.add('border-gray-300');
            }
        });
    });
});

console.log('🌟 Application AFMI chargée avec succès!');
