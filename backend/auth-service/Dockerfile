FROM node:20.10.0-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY auth-service/package*.json ./
COPY auth-service/tsconfig.json ./
RUN npm install

COPY auth-service/src ./src
COPY shared ./shared

RUN npm run build

EXPOSE 23001

CMD ["node", "dist/src/main.js"]