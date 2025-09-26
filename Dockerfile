# Dockerfile pour AFMI avec Node.js + API
FROM node:18-alpine

# Copier package.json et installer les dépendances
COPY package.json ./
RUN npm install

# Copier tous les fichiers
COPY . .

# Exposer le port
EXPOSE 8080

# Démarrer le serveur Node.js
CMD ["node", "server.js"]
