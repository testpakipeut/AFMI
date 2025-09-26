# Utiliser l'image Nginx officielle (plus léger pour les sites statiques)
FROM nginx:alpine

# Installer les dépendances nécessaires
RUN apk add --no-cache \
    curl \
    bash \
    && rm -rf /var/cache/apk/*

# Créer le répertoire de travail
WORKDIR /usr/share/nginx/html

# Copier seulement les fichiers essentiels de l'application AFMI
COPY index.html .
COPY script.js .
COPY config.js .
COPY utils.js .
COPY styles.css .

# Créer la configuration Nginx personnalisée
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen $PORT;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name localhost;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    ' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Configuration pour les fichiers statiques' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Cache-Control "public, max-age=3600";' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    ' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Configuration pour les fichiers CSS et JS' >> /etc/nginx/conf.d/default.conf && \
    echo '    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {' >> /etc/nginx/conf.d/default.conf && \
    echo '        expires 1y;' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Cache-Control "public, immutable";' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    ' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Configuration pour les fichiers de documentation' >> /etc/nginx/conf.d/default.conf && \
    echo '    location ~* \.(md)$ {' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Content-Type text/plain;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    ' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Configuration de sécurité' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header X-Frame-Options "SAMEORIGIN" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header X-Content-Type-Options "nosniff" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header X-XSS-Protection "1; mode=block" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '    add_header Referrer-Policy "strict-origin-when-cross-origin" always;' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Créer un script de démarrage pour Railway
RUN echo '#!/bin/bash' > /start.sh && \
    echo 'echo "🚀 Démarrage de l'\''application AFMI..."' >> /start.sh && \
    echo 'echo "🌐 Configuration du port $PORT..."' >> /start.sh && \
    echo 'echo "📱 Application AFMI - Association des Femmes Maliennes pour l'\''Initiative"' >> /start.sh && \
    echo 'echo "📍 Localisation: Libreville, Gabon"' >> /start.sh && \
    echo 'echo "📧 Contact: contact@afmi-gabon.org"' >> /start.sh && \
    echo 'echo "🔗 Site accessible sur le port $PORT"' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

# Exposer le port (Railway définira le port)
EXPOSE $PORT

# Démarrer avec le script personnalisé
CMD ["/start.sh"]
