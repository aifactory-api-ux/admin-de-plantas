FROM node:20.10.0-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY plant-service/package*.json ./
COPY plant-service/tsconfig.json ./
RUN npm install

COPY plant-service/src ./src
COPY shared ./shared

RUN npm run build

EXPOSE 23002

CMD ["node", "dist/main.js"]