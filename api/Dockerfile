# Utilise l'image Node.js officielle comme image de base
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Définit la commande par défaut pour lancer l'application
CMD ["node", "dist/main"]