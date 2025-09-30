# Dockerfile ultra-simple pour AFMI
FROM nginx:alpine

# Copier seulement les fichiers essentiels
COPY index.html /usr/share/nginx/html/
COPY historique-actualites.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY config.js /usr/share/nginx/html/
COPY utils.js /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY hajj-2026.jpg /usr/share/nginx/html/
COPY logo.jpg /usr/share/nginx/html/
COPY scolaires/ /usr/share/nginx/html/scolaires/
COPY Congres/ /usr/share/nginx/html/Congres/

# Script de démarrage qui substitue la variable PORT
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'echo "🚀 AFMI démarré sur le port $PORT"' >> /start.sh && \
    echo 'echo "📱 Application AFMI - Association des Femmes Maliennes pour l'\''Initiative"' >> /start.sh && \
    echo 'echo "📍 Localisation: Libreville, Gabon"' >> /start.sh && \
    echo 'echo "📧 Contact: contact@afmi-gabon.org"' >> /start.sh && \
    echo 'echo "🔗 Configuration du port $PORT..."' >> /start.sh && \
    echo 'sed "s/PORT_PLACEHOLDER/$PORT/g" /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf' >> /start.sh && \
    echo 'echo "✅ Configuration Nginx mise à jour avec le port $PORT"' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

# Configuration Nginx template avec placeholder
RUN echo 'server { listen PORT_PLACEHOLDER; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf.template

EXPOSE $PORT
CMD ["/start.sh"]
