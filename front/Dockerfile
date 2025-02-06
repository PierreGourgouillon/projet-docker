# Étape 1 : Construction de l'application
FROM node:18-alpine AS builder

WORKDIR /front

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Étape 2 : Serveur web pour servir les fichiers
FROM nginx:alpine

# Supprime la configuration Nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Installe envsubst (inclus dans le package gettext)
RUN apk add --no-cache gettext

# Copie les fichiers statiques et la configuration
COPY --from=builder /front/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.template

# Injecte la variable d'environnement PORT dans la configuration avant de lancer Nginx
CMD ["sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
