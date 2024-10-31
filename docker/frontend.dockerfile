# Étape 1 : Build
FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Étape 2 : Serveur Nginx pour servir l'application
FROM nginx:alpine AS production-stage

COPY --from=build /usr/src/app/build /usr/share/nginx/html

# port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
