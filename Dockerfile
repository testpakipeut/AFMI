# Dockerfile ultra-simple pour AFMI
FROM nginx:alpine

# Copier seulement les fichiers essentiels
COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY config.js /usr/share/nginx/html/
COPY utils.js /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/

# Configuration Nginx simple
RUN echo 'server { listen $PORT; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

# Script de démarrage
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'echo "🚀 AFMI démarré sur le port $PORT"' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

EXPOSE $PORT
CMD ["/start.sh"]
