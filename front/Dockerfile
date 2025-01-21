# Étape 1 : Construction de l'application
FROM node:18-alpine AS builder

WORKDIR /front

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Étape 2 : Serveur web pour servir les fichiers
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /front/dist /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]