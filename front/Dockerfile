# Étape 1 : Construction de l'application
FROM node:18-alpine AS builder

# Définir le dossier de travail dans le conteneur
WORKDIR /front

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Serveur web pour servir les fichiers
FROM nginx:alpine

# Supprimer la config par défaut de NGINX
RUN rm /etc/nginx/conf.d/default.conf

# Copier les fichiers construits vers le dossier Nginx par défaut
COPY --from=builder /front/dist /usr/share/nginx/html

# Assurer les bonnes permissions
RUN chmod -R 755 /usr/share/nginx/html

# Copier votre fichier de configuration NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]