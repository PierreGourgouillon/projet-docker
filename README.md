## 1. Structure du Projet
```
projet-docker/
├── api/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   └── ...
├── front/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   └── ...
├── docker-compose.yml
└── mongo-init.js
```


- **api/** : Contient le code source du backend développé avec Express.js.
- **front/** : Contient le code source du frontend développé avec React.js et Vite.
- **docker-compose.yml** : Fichier de configuration pour orchestrer les services Docker.
- **mongo-init.js** : Script d'initialisation pour la base de données MongoDB.

---

## 2. Instructions de Déploiement

Pour déployer l'application localement :

Cloner le dépôt :
```bash
git clone https://github.com/PierreGourgouillon/projet-docker.git
cd projet-docker
```

Construire et démarrer les services :
```bash
docker-compose up --build
```

### Accéder aux services :
- **Frontend** : http://localhost:4000
- **Backend API** : http://localhost:3000

---

## 3. Description des Services

### a) Backend (API)

- **Technologie** : Node.js avec le framework Express.js.
- **Fonctionnalité** : Fournit des endpoints RESTful pour les opérations côté serveur.
- **Dockerfile** :
    ```dockerfile
  # Utilise l'image Node.js officielle comme image de base
  FROM node:18-alpine

  # Définit le répertoire de travail dans le conteneur
  WORKDIR /app

  # Copie les fichiers package.json et package-lock.json
  COPY package*.json ./

  # Installe les dépendances
  RUN npm install

  # Copie le reste du code de l'application
  COPY . .

  # Compile le code TypeScript
  RUN npm run build

  # Expose le port 3000
  EXPOSE 3000

  # Définit la commande par défaut pour lancer l'application
  CMD ["node", "dist/main"]

### b) Frontend

- **Technologie** : React.js avec Vite pour le bundling.
- **Fonctionnalité** : Interface utilisateur de l'application.
- **Dockerfile** :
```dockerfile
# Étape 1 : Construction de l'application
FROM node:18-alpine AS builder

# Définit le répertoire de travail dans le conteneur
WORKDIR /front

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code de l'application
COPY . .

# Compile l'application pour la production
RUN npm run build

# Étape 2 : Serveur web pour servir les fichiers
FROM nginx:alpine

# Supprime la configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copie les fichiers construits depuis l'étape de build
COPY --from=builder /front/dist /usr/share/nginx/html

# Définit les permissions appropriées
RUN chmod -R 755 /usr/share/nginx/html

# Copie la configuration personnalisée de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### c) Base de Données (MongoDB)

- **Technologie** : MongoDB version 6.0.
- **Fonctionnalité** : Stockage des données de l'application.
- **Configuration** : Définie dans le fichier docker-compose.yml avec des variables d'environnement pour l'initialisation.

---

## 4. Orchestration avec Docker Compose

Le fichier docker-compose.yml orchestre les trois services : frontend, backend et MongoDB.

```yaml
version: '3.8'

services:
  front-app:
    build:
      context: ./front
      dockerfile: Dockerfile
    ports:
      - "4000:80"
    restart: always
    networks:
      - front-network

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    depends_on:
      - mongodb
    env_file:
      - api/.env
    networks:
      - back-network
    command: npm run start:dev

  mongodb:
    image: mongo:6.0
    container_name: mongodb
    ports:
      - '27017:27017'
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: nestjsdb
    networks:
      - back-network

volumes:
  mongodb_data:

networks:
  front-network:
    driver: bridge
  back-network:
    driver: bridge
```

### Réseaux :
- **front-network** : Relie le frontend aux autres services nécessaires.
- **back-network** : Relie le backend à la base de données MongoDB.

### Volumes :

- **mongodb_data** : Stocke les données persistantes de MongoDB.
