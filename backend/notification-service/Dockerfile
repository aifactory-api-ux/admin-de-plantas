FROM node:20.10.0-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY notification-service/package*.json ./
COPY notification-service/tsconfig.json ./
RUN npm install

COPY notification-service/src ./src
COPY shared ./shared

RUN npm run build

EXPOSE 23003

CMD ["node", "dist/src/main.js"]